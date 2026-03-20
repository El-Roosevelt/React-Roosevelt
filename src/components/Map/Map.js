import React, { useRef, useEffect, useState, use, useEffectEvent } from "react";
import mapboxgl from "mapbox-gl";
import { useContext } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.scss";
import customMarkerPng from "../../assets/custom-marker.png";
import interestPointData from "../../assets/providence-interestPoint.json";
import ContextMenuLocation from "../contextMenuLocation/contextMenuLocation";
import LayerCheckboxes from "../LayerCheckboxes/LayerCheckboxes";
import Popup from "../Popup/Popup";
import SelectorRutes from "../SelectorRutes/SelectorRutes";
import InfoPanel from "../../components/InfoPanel/InfoPanel";
import { AuthContext } from "../../context/AuthContext";
import { useZonas } from "../../hooks/useZonas";
import { useRutas } from "../../hooks/useRutas";
import { useLineasObjetos } from "../../hooks/useLineasObjetos";
import { useObjetos } from "../../hooks/useObjetos";


const INITIAL_CENTER = [-0.4794138193936135, 38.35239601734659];
const INITIAL_ZOOM = 16.5;

export default function Map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const { user } = useContext(AuthContext);

  // VARIABLES DE MAPA
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [centerMouse, setCenterMouse] = useState(INITIAL_CENTER);

  // marcadores punto a punto
  const markersRef = useRef([]);

  const [dataRuteSelected, setDataRuteSelected] = useState({
    id: null,
    name: "",
    coordpol: [[]]
  })

  const dangerTranslate = Object.freeze({
    rojo: "red",
    amarillo: "yellow",
    verde: "green",
  });

  const dangerColor = Object.freeze({
    rojo: " bg-danger",
    amarillo: " bg-warning",
    verde: " bg-success",
  });
  const translateToMap = {
    "Escalera": "stairs",
    "Ascensor": "elevator",
    "Rampa": "ramp",
    "Construcción": "rebuild"
  };
  //CONVERTIDORES DE DATOS

  const stringToJsonArray = (s) => {
    if (!s || s === "") return [];

    try {
      // 2. Si ya es un objeto/array (porque la API lo pre-procesó), lo devolvemos
      if (typeof s !== 'string') return s;

      // 3. Intentamos parsear
      const resultado = JSON.parse(s);

      // 4. Verificación de estructura: ¿Es realmente un array?
      if (!Array.isArray(resultado)) return [];

      return resultado;
    } catch (e) {
      // 5. Si el JSON está mal formado, capturamos el error aquí
      console.warn("Dato corrupto saltado:", s);
      return [];
    }
  }

  //DATOS DE API


  //Zonas
  const { zonas: zones, loading: loadingZones } = useZonas();
  const [zonesRef, setZonesRef] = useState([]);

  //Cargar datos zonas
  useEffect(() => {
    if (zones.length > 0) {
      const zonasCargadas = zones.map(z => ({
        id: z.id,
        name: z.nombre_zona,
        color: dangerTranslate[(z.peligrosidad || "").toLowerCase()] || "gray",
        coordpol: stringToJsonArray(z.mapbox_json)
      }))
      setZonesRef(zonasCargadas);
    }
  }, [zones])

  //Rutas
  const { rutas: rutes, loading: loadingRutes } = useRutas();
  const [rutesRef, setRutesRef] = useState([]);
  //Cargar datos rutas
  useEffect(() => {
    if (rutes.length > 0) {

      const rutasCargadas = rutes.map(r => ({
        id: r.id,
        name: r.nombreRuta,
        coordpol: stringToJsonArray(r.mapboxJSON),
        description: r.descripcion,
        date_update: r.fecha_pub,
        likes_count: r.likesCount,
        id_zone: { id: r.zona.id, nameZone: r.zona.nombre_zona },
        id_user_author: { id: r.usuario_autor.id, nameUser: r.usuario_autor.username }
      }))
      setRutesRef(rutasCargadas);
    }
  }, [rutes])
  //Relaciones punto interes y ruta
  const [linesObjectsRef, setLinesObjectsRef] = useState([]);
  const { lineasObjetos: linesObjects, loading: loadingLinesObjects } = useLineasObjetos();

  useEffect(() => {
    if (linesObjects && linesObjects.length > 0) {
      const lineasObjetosCargados = linesObjects.map(l => ({
        idRuta: l.lineaObjetosId.ruta.id,
        objeto: {
          id: l.lineaObjetosId.objeto.id,
          coordpol: stringToJsonArray(l.lineaObjetosId.objeto.mapBoxJSON),
          name: l.lineaObjetosId.objeto.nombre_objeto,
          descripcion: l.lineaObjetosId.objeto.descripcion,
          img: l.lineaObjetosId.objeto.imagen,
          danger: l.lineaObjetosId.objeto.peligrosidad,
          idZona: l.lineaObjetosId.objeto.zona.id,
          typeObject: l.lineaObjetosId.objeto.tipoObjeto.nombre_tipo
        }
      }))
      setLinesObjectsRef(lineasObjetosCargados)
    }

  }, [linesObjects])


  //Objectos ruta (puntos de interes)
  /*const [objectRute, setObjectRute] = useState([
    {
      id: 0,
      name: "Elevador del castillo",
      img: "",
      coordpol: stringToJsonArray("[-0.4773503018700467, 38.34712845540338]"),
      description: "Te subira directamente hasta la suma del castillo",
      peligrosidad: "AMARILLO".toLowerCase(),
      id_zone: 0,
      id_type_object: 0,
    },
  ]);*/



  //Tipos Objecto (tipos de punto interes)

  const [objectsRef, setObjectsRef] = useState();
  const { objetos: objects, loading: loadingObjects } = useObjetos()
  useEffect(() => {
    if (objects && objects.length > 0) {
      const objetosCargados = objects.map(o => {
        // Usamos el traductor o el nombre original si no existe en el mapa
        const tipoOriginal = o.tipoObjeto?.nombre_tipo;
        const tipoFiltrado = translateToMap[tipoOriginal] || tipoOriginal;

        return {
          id: o.id,
          type: "Feature",
          properties: {
            name: o.nombre_objeto,
            cuisine: tipoFiltrado // Ahora esto coincidirá con "stairs"
          },
          geometry: {
            coordinates: stringToJsonArray(o.mapBoxJSON),
            type: "Point"
          }
        };
      });

      setObjectsRef({
        type: "FeatureCollection",
        features: objetosCargados
      });
    }
  }, [objects]);

  useEffect(() => {
    // 1. Verifica que la referencia al mapa exista
    // 2. Verifica que el objeto interno de Mapbox esté creado
    // 3. Verifica que el estilo esté cargado (importantísimo para getSource)
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

    const source = mapRef.current.getSource("interestPoint");

    // 4. Verifica que el source realmente exista en el mapa
    if (source && objectsRef) {
      source.setData(objectsRef);
    }
  }, [objectsRef]);

  useEffect(() => {
    // 1. Validaciones de seguridad (Mapa listo y datos presentes)
    if (!mapRef.current || !mapRef.current.isStyleLoaded() || !dataRuteSelected.coordpol) return;

    const updateSelectedRoute = async () => {
      // 2. Extraer puntos (A y B)
      // Asumimos que coordpol es un array de coordenadas [[lng, lat], [lng, lat]]
      const coords = dataRuteSelected.coordpol.map(p => p.join(",")).join(";");

      // 3. Pedir la geometría exacta a la API de Directions (Caminando)
      const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${coords}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.code !== "Ok") return;

        const routeGeometry = data.routes[0].geometry;
        const source = mapRef.current.getSource("selected-route-source");

        if (source) {
          // Si la fuente ya existe, solo actualizamos los datos
          source.setData({
            type: "Feature",
            properties: {
              id: dataRuteSelected.id,
              name: dataRuteSelected.name
            },
            geometry: routeGeometry
          });

          // Opcional: Hacer que el mapa vuele hasta la ruta
          const coordinates = routeGeometry.coordinates;
          const bounds = coordinates.reduce((acc, coord) => {
            return acc.extend(coord);
          }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

          mapRef.current.fitBounds(bounds, { padding: 50 });
        }
      } catch (error) {
        console.error("Error al obtener la ruta seleccionada:", error);
      }
    };

    updateSelectedRoute();
  }, [dataRuteSelected]); // Se dispara cada vez que eliges una ruta en el panel


  const [dataNewZone, setDataNewZone] = useState({
    id: null,
    name: "",
    color: "",
    coordpol: [[]]
  });


  // Zona a mostrar al ser seleccionada por el usuario 
  const [dataZoneSelected, setDataZoneSelected] = useState({
    id: null,
    name: "",
    color: "",
    coordpol: [[]]
  })
  // Ruta a mostrar al ser seleccionada por el usuario 
  

  useEffect(() => {
    console.log("datos de ruta seleccionada", dataRuteSelected)
  }, [dataRuteSelected])


  // Datos de zonas que se convertiran en poligonos para crear zonas
  const [dataZones, setDataZones] = useState({
    type: "FeatureCollection",
    features: []
  });

  useEffect(() => {
    // 1. Si no hay mapa o el estilo no ha cargado, no hacemos nada
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

    // 2. Transformamos zonesRef al formato GeoJSON
    const newData = {
      type: "FeatureCollection",
      features: zonesRef.map((zone) => ({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [zone.coordpol],
        },
        properties: {
          id: zone.id,
          name: zone.name,
          color: zone.color, // zone.color ya viene traducido del useEffect anterior
        },
      })),
    };

    // 3. Si la fuente ya existe, actualizamos los datos
    const source = mapRef.current.getSource("zones");
    if (source) {
      source.setData(newData);
    }
    console.log("Cargados")
  }, [zonesRef]); // Se activa cada vez que zonesRef cambia  

  // MIS VARIABLES

  const [popupData, setPopupData] = useState(null);

  const [coords, setCoords] = useState([])

  const [init, setInit] = useState(false);
  const [goal, setGoal] = useState(false);

  const [amountPointZone, setAmountPointZone] = useState(0);

  const [positionCreateElement, setPositionCreateElement] = useState({
    lng: 0,
    lat: 0,
  });

  const [routePoints, setRoutePoints] = useState([]);



  const [layerState, setLayerState] = useState([
    {
      name: "elevator",
      color: "#33a02c",
      isChecked: true,
    },
    {
      name: "ramp",
      color: "#ffff99",
      isChecked: true,
    },
    {
      name: "stairs",
      color: "#ffff99",
      isChecked: true,
    },
    {
      name: "rebuild",
      color: "#f80404",
      isChecked: true,
    },
  ]);

  // State para controlar la visibilidad y posicion del menu contextual
  const [menu, setMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  // Funcion para desaparecer el menu al hacer click en el mapa
  const handleCloseContextMenuMap = () => {
    setMenu({ ...menu, visible: false });
    clearMarkers();
    setInit(false)
    setGoal(false)
  };

  // Funcion para mostrar el menu al hacer click derecho en el mapa
  const handleContentMenu = (e) => {
    setMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
    setPositionCreateElement({ lng: centerMouse[0], lat: centerMouse[1] });
  };

  const handleButtonClick = () => {
    mapRef.current.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });
    clearMarkers();
  };

  // Iniciar la creacion de la zona con un punto inicial
  const handleOpenZone = (dataZone) => {
    setAmountPointZone(1);
    const newZone = {
      id: Date.now(),
      name: dataZone.name,
      color: dataZone.color,
      coordpol: [[positionCreateElement.lng, positionCreateElement.lat]],
    };
    setZonesRef((prev) => [...prev, newZone]);
  };
  // Creando la arista de la zona en creacion
  const handleCreatEdgeZone = () => {
    setAmountPointZone(amountPointZone + 1);
    const coords = [positionCreateElement.lng, positionCreateElement.lat];

    if (!mapRef.current) return;

    setZonesRef((prev) => {
      const newZones = [...prev];
      newZones[newZones.length - 1].coordpol.push(coords);
      return newZones;
    });
  };

  const handleCreateRute=()=>{
    alert("guardada ruta")
  }
  // Terminar de cerrar la zona en creacion y cierra el contextmenu
  const handleCloseZone = () => {
    setAmountPointZone(0);
    handleCloseContextMenuMap();
    setZonesRef((prev) => {
      const newZones = [...prev];
      newZones[newZones.length - 1].coordpol.push(
        newZones[newZones.length - 1].coordpol[0],
      );
      return newZones;
    });
    setDataNewZone({
      id: zonesRef.length,
      name: "",
      color: "",
    });
  };
  // Cancelar la creacion de la zona
  const handleRemoveZoneInCreation = () => {
    setAmountPointZone(0);
    handleCloseContextMenuMap();
    setZonesRef((prev) => prev.slice(0, -1));

    setDataNewZone({
      id: zonesRef.length,
      name: "",
      color: "",
    });
  };

  // Eliminar zona

  function handleRemoveZone(id) {
    setZonesRef((prev) => prev.filter((e) => e.id != id));
  }

  function handleEditZone(zone) {
    setZonesRef((prev) =>
      prev.map((z) =>
        z.id == zone.id
          ? {
            id: zone.id,
            name: zone.name,
            color: zone.color,
            coordpol: zone.coordpol,
          }
          : z,
      ),
    );
  }
  const handleMouseMoveMap = (e) => {
    setCenterMouse([e.lngLat.lng, e.lngLat.lat]);
  };

  const handleMarkerClick = (e) => {
    setPopupData({
      lngLat: e.feature.geometry.coordinates,
      properties: e.feature.properties,
    });
  };

  const handleCreateMark = () => {
    const coords = [positionCreateElement.lng, positionCreateElement.lat];

    if (!mapRef.current) return;

    // Limpia todos los marcadores si ve que son mas de dos
    if(routePoints.length ===1) setInit(true)
    if (routePoints.length === 2) {
      clearMarkers();
      setGoal(false);
    } else setGoal(true);

    //Crea el marcador
    const marker = new mapboxgl.Marker()
      .setLngLat(coords)
      .addTo(mapRef.current);

    markersRef.current.push(marker);

    //mete coordenadas para luego formar la ruta, al tener dos pares de coordenadas, se dibuja la ruta
    setRoutePoints((prev) => {
      if (prev.length === 2) {
      }
      if (prev.length === 2) return [coords];
      return [...prev, coords];
    });
  };

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
    setRoutePoints([]);
    if (mapRef.current.getLayer("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }
  };

  const handleCreateInteresPoint = (e) => {
    const newPoint = {
      id: 999,
      type: "Feature",
      properties: {
        name: e.name,
        cuisine: e.cuisine,
      },
      geometry: {
        coordinates: [positionCreateElement.lng, positionCreateElement.lat],
        type: "Point",
      },
    };
    setObjectsRef((prev) => ({
      ...prev,
      features: [...prev.features, newPoint],
    }));
  };

  //Para crear o inicializar el mapa
  useEffect(() => {
    mapboxgl.accessToken = `${process.env.REACT_APP_MY_KEY}`;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
    });




    // Al cargar, se comenzaran a crear los puntos de interes
    mapRef.current.on("load", () => {
      // load image to use as a custom marker
      mapRef.current.loadImage(customMarkerPng, (error, image) => {
        if (error) throw error;
        mapRef.current.addImage("custom-marker", image, { sdf: true });
      });

      // add a single source for all interestPoint
      mapRef.current.addSource("interestPoint", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      // add a layer for each cuisine type
      for (const layer of layerState) {
        const { name, color } = layer;

        const layerId = `interestPoint-${name}-symbol`;

        // Comprueba que no exita un punto de interes ya existente
        if (!mapRef.current.getLayer(layerId)) {
          //Creando el cuerpo del layer (punto de interes)
          mapRef.current.addLayer({
            id: layerId,
            type: "symbol",
            source: "interestPoint",
            // Coger la imagen de assets y el color de la propiedad del Layer para darsela al nuevo punto de interes
            layout: {
              "icon-image": "custom-marker",
              "icon-size": 1,
              "icon-allow-overlap": true,
            },
            paint: {
              "icon-color": color,
              "icon-opacity": 0.8,
              "icon-halo-color": "#ffffff",
              "icon-halo-width": 2.5,
              "icon-halo-blur": 1,
            },
            filter: ["in", ["get", "cuisine"], ["literal", [name]]],
          });
        }
        // add a click interaction for each of the layers to be used to render the popup
        mapRef.current.addInteraction(`${layerId}-click`, {
          type: "click",
          target: { layerId },
          handler: handleMarkerClick,
        });
        // change the cursor to a pointer when hovering over a marker
        mapRef.current.addInteraction(`${layerId}-mouse-enter`, {
          type: "mouseenter",
          target: { layerId },
          handler: () => {
            mapRef.current.getCanvas().style.cursor = "pointer";
          },
        });
        // reset the cursor to default image when cursor leaves a marker
        mapRef.current.addInteraction(`${layerId}-mouse-leave`, {
          type: "mouseleave",
          target: { layerId },
          handler: () => {
            mapRef.current.getCanvas().style.cursor = "";
          },
        });
      }
      // Dentro del on("load")
      mapRef.current.addSource("selected-route-source", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] }
      });

      mapRef.current.addLayer({
        id: "selected-route-layer",
        type: "line",
        source: "selected-route-source",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#3bb2d0", // Un color que resalte
          "line-width": 6,          // Más gruesa que las demás
          "line-opacity": 0.9
        }
      });

      mapRef.current.addSource("all-routes", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] }
      });

      mapRef.current.addLayer({
        id: "all-routes-layer",
        type: "line",
        source: "all-routes",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#d9251e", // Un azul bonito para las rutas guardadas
          "line-width": 4,
          "line-opacity": 0.6
        }
      });



      mapRef.current.addSource("zones", {
        type: "geojson",
        data: dataZones,
      });

      mapRef.current.addLayer({
        id: "zones",
        type: "fill",
        source: "zones",
        paint: {
          "fill-color": ["get", "color"],
          "fill-opacity": 0.3,
        },
      });

      mapRef.current.addLayer({
        id: "outline",
        type: "line",
        source: "zones",
        paint: {
          "line-color": "#000",
          "line-width": 3,
        },
      });
    });

    mapRef.current.on("move", () => {
      // get the current center coordinates and zoom level from the map
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();

      // update state
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    mapRef.current.on("mousemove", handleMouseMoveMap);

    return () => {
      mapRef.current.remove();
    };
  }, []);
  // Cuando se añada un nuevo punto de interes
  useEffect(() => {
    if (mapRef.current?.getSource("interestPoint")) {
      mapRef.current.getSource("interestPoint").setData(objectsRef);
    }
  }, [objectsRef]);

  // Cuando le de a un checkbox de la caja de checkboxs
  useEffect(() => {
    if (!mapRef.current) return;

    layerState.forEach((layer) => {
      const layerId = `interestPoint-${layer.name}-symbol`;

      if (mapRef.current.getLayer(layerId)) {
        mapRef.current.setLayoutProperty(
          layerId,
          "visibility",
          layer.isChecked ? "visible" : "none",
        );
      }
    });
  }, [layerState]);
  // Cuando hayan suficientes puntos para crear una ruta
  useEffect(() => {
    const fetchRoute = async () => {
      if (routePoints.length < 2) return;

      const coords = routePoints.map((p) => p.join(",")).join(";");
      const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${coords}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

      const res = await fetch(url);
      const data = await res.json();
      const route = data.routes[0].geometry;

      if (mapRef.current.getSource("route")) {
        mapRef.current.getSource("route").setData(route);
      } else {
        mapRef.current.addSource("route", { type: "geojson", data: route });
        mapRef.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#ff0000", "line-width": 4 },
        });
      }
    };
    fetchRoute();
  }, [routePoints]);
  // creador de zonas nuevas
  useEffect(() => {
    const updateMapSources = () => {
      if (!mapRef.current) return;

      if (!mapRef.current.isStyleLoaded()) {
        setTimeout(updateMapSources, 200);
        return;
      }

      const source = mapRef.current.getSource("zones");
      if (source) {
        const newData = {
          type: "FeatureCollection",
          features: zonesRef.map((zone) => ({
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: Array.isArray(zone.coordpol[0]) ? [zone.coordpol] : [zone.coordpol],
            },
            properties: {
              id: zone.id,
              name: zone.name,
              color: zone.color, // Ya viene traducido como 'red', 'green', etc.
            },
          })),
        };
        source.setData(newData);
      }
    };

    if (zonesRef.length > 0) {
      updateMapSources();
    }
  }, [zonesRef]);

  return (
    <>
      {user?.username === "admin" && (menu.visible && (
        <ContextMenuLocation
          positionState={positionCreateElement}
          positionContextMenu={menu}
          onClose={handleCloseContextMenuMap}
          onCreateInterestPoint={handleCreateInteresPoint}
          onCreateMark={handleCreateMark}
          types={layerState}
          init={init}
          goal={goal}
          amountPointZone={amountPointZone}
          onOpenZone={handleOpenZone}
          onCreateEdge={handleCreatEdgeZone}
          onCloseZone={handleCloseZone}
          onCancelZone={handleRemoveZoneInCreation}
          typeZones={dangerTranslate}
          dataNewZone={dataNewZone}
          onChangeDataZone={setDataNewZone}
          onSaveRute={handleCreateRute}
        />
      ))}
      <div>
        <p>
          {positionCreateElement.lng} {positionCreateElement.lat}
        </p>
        <p>Zona Seleccionada: {dataZoneSelected.id}</p>
        <p>Ruta Seleccionada: {dataRuteSelected.id}</p>
      </div>

      <div
        id="map-container"
        ref={mapContainerRef}
        onContextMenu={handleContentMenu}
        onClick={handleCloseContextMenuMap}
      >
        {user?.username === "admin" &&
          <Popup popupData={popupData} mapRef={mapRef} />
        }
        <div className="sidebar">
          Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} |
          Zoom: {zoom.toFixed(2)}
        </div>
        <button className="reset-button" onClick={handleButtonClick}>
          Reset
        </button>
        {user?.username === "admin" &&
          <LayerCheckboxes
            layerState={layerState}
            setLayerState={setLayerState}
          />
        }
        {user?.username === "admin" &&
          <div className="infoSide d-flex flex-row">
            <div className="d-flex flex-column align-items-start mx-3">
              <i
                className="bi bi-chevron-left"
                style={{ fontSize: "1.5rem", cursor: "pointer" }}
              ></i>
            </div>
            <InfoPanel
              zones={zonesRef}
              rutes={rutesRef}
              onRemoveZone={handleRemoveZone}
              onEditZone={handleEditZone}
              dangerColor={dangerColor}
              typesDanger={dangerTranslate}
              zoneSelected={dataZoneSelected}
              onZoneSelected={setDataZoneSelected}
              onRuteSelected={setDataRuteSelected}
            />
          </div>}
      </div>
      <SelectorRutes rutesList={rutesRef} lineasObjetosList={linesObjectsRef} onSelectRute={setDataRuteSelected} />
    </>
  );
}
