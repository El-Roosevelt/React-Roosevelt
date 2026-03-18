import React, { useRef, useEffect, useState, use } from "react";
import mapboxgl from "mapbox-gl";
import { useContext } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.scss";
import customMarkerPng from "../../assets/custom-marker.png";
import interestPointData from "../../assets/providence-interestPoint.json";
import ContextMenuLocation from "../contextMenuLocation/contextMenuLocation";
import LayerCheckboxes from "../LayerCheckboxes/LayerCheckboxes";
import Popup from "../Popup/Popup";
import InfoPanel from "../../components/InfoPanel/InfoPanel";
import { AuthContext } from "../../context/AuthContext";


const INITIAL_CENTER = [-0.4785025754158312, 38.34963385315302];
const INITIAL_ZOOM = 16.5;

export default function Map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const { credentials, setCredentials, setUser } = useContext(AuthContext);
  
  // VARIABLES DE MAPA
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [centerMouse, setCenterMouse] = useState(INITIAL_CENTER);

  // marcadores punto a punto
  const markersRef = useRef([]);

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
  //CONVERTIDORES DE DATOS

  const stringToJsonArray = (s) => {
    return JSON.parse(s);
  }
  // Datos que vendran de la api

  //Tipo peligrosidad
  const idToDanger = Object.freeze({
    0: "verde",
    1: "amarillo",
    2: "rojo",
  });

  //Zonas
  const [zonesRef, setZonesRef] = useState([
    {
      id: 0,
      name: "Castillo San Fernando",
      color: "rojo",
      coordpol: stringToJsonArray("[[-0.49053749327177343, 38.357542351070265],[-0.4892823587223063, 38.35519423939252],[-0.48906662626768593, 38.35347156925499],[-0.4900417687209426, 38.350738188429716],[-0.49259854688597215, 38.3495294122186],[-0.49474245216632085, 38.35089461624432],[-0.49515075878613857, 38.35288183092004],[-0.49053749327177343, 38.357542351070265]]")
    },
    {
      id: 1,
      name: "Castillo Santa Barbara",
      color: "amarillo",
      coordpol: stringToJsonArray("[[-0.4839169233197822, 38.348417685652805],[-0.4815677123779949, 38.351167830649786],[-0.47943497326687634, 38.352399496274614],[-0.4764586191535898, 38.352214305703114],[-0.4744590379772262, 38.3513590435428],[-0.4738797240611916, 38.350433588899364],[-0.4756391534831437, 38.34807779066267],[-0.47731673286693876, 38.34687253370336],[-0.4807042435479332, 38.346724526574945],[-0.48359247420486895, 38.347785773621325],[-0.4839169233197822, 38.348417685652805]]")
    },
  ]);
  //Rutas
  const [rutesRef, setRutesRef] = useState([
    {
      id: Date.now(),
      name: "Camino confortante",
      coordpol: stringToJsonArray("[[-0.4823535037734814, 38.34775791453754],[-0.47852430655979106, 38.34935405748996]]"),
      description: "Un facil acceso a la planta alta del castillo",
      date_upload: "10/12/2022",
      likes_count: 2,
      id_zone: 0,
      id_user_author: 0,
    },
  ]);
  //Relaciones punto interes y ruta
  const [LinesObjects, setLinesObjects] = useState([
    {
      id_object: 0,
      id_rute: 0,
    },
    {
      id_object: 1,
      id_rute: 0,
    },
  ]);
  //Objectos ruta (puntos de interes)
  const [objectRute, setObjectRute] = useState([
    {
      id: 0,
      name: "Elevador del castillo",
      img: "",
      coordpol: stringToJsonArray("[-0.4773503018700467, 38.34712845540338]"),
      description: "Te subira directamente hasta la suma del castillo",
      peligrosidad: idToDanger[0],
      id_zone: 0,
      id_type_object: 0,
    },
  ]);



  //Tipos Objecto (tipos de punto interes)
  const [typeObject, setTypeObject] = useState([
    {
      id: 0,
      name: "elevator",
      icono: "",
    },
    {
      id: 1,
      name: "stairs",
      icono: "",
    },
    {
      id: 3,
      name: "ramp",
      icono: "",
    },
    {
      id: 4,
      name: "rebuilds",
      icono: "",
    },
  ]);

  const [dataNewZone, setDataNewZone] = useState({
    id: zonesRef.length,
    name: "",
    color: "",
  });

  const [dataZoneSelected, setDataZoneSelected] = useState({
    id: null,
    name: "",
    color: "",
    coordpol: [[]]
  })

  // Datos de zonas que se convertiran en poligonos para crear zonas
  const datazones = {
    type: dataZoneSelected.id == null ? "FeatureCollection" : "Feature",
    features: dataZoneSelected.id != null ? {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [dataZoneSelected.coordpol],
      },
      properties: {
        id: dataZoneSelected.id,
        name: dataZoneSelected.name,
        color: dangerTranslate[dataZoneSelected.color],
      },
    } : zonesRef.map((zone) => ({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [zone.coordpol],
      },
      properties: {
        id: zone.id,
        name: zone.name,
        color: dangerTranslate[zone.color],
      },
    })),
  };

  const [popupData, setPopupData] = useState(null);

  // MIS VARIABLES

  const [coords, setCoords] = useState([])

  const [goal, setGoal] = useState(false);

  const [amountPointZone, setAmountPointZone] = useState(0);

  const [positionCreateElement, setPositionCreateElement] = useState({
    lng: 0,
    lat: 0,
  });

  const [routePoints, setRoutePoints] = useState([]);

  const [geoData, setGeoData] = useState(interestPointData);

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
      color: "#6a3d9a",
      isChecked: true,
    },
    {
      name: "rebuild",
      color: "#a6cee3",
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
    console.log("DATA ZONA:", dataZone);
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
    setGeoData((prev) => ({
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
        data: geoData,
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
      mapRef.current.addSource("zones", {
        type: "geojson",
        data: datazones,
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
      mapRef.current.getSource("interestPoint").setData(geoData);
    }
  }, [geoData]);

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

      // agregar o actualizar layer "route"
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
    if (!mapRef.current?.isStyleLoaded()) return;
    //
    if (
      !mapRef ||
      !mapRef.current.isStyleLoaded() ||
      !mapRef.current.getSource("zones")
    )
      return;

    const newData = {
      type: dataZoneSelected == null ? "FeatureCollection" : "Feature",
      features: dataZoneSelected != null ? {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [dataZoneSelected.coordpol],
        },
        properties: {
          id: dataZoneSelected.id,
          name: dataZoneSelected.name,
          color: dangerTranslate[dataZoneSelected.color],
        },
      } : zonesRef.map((zone) => ({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [zone.coordpol],
        },
        properties: {
          id: zone.id,
          name: zone.name,
          color: dangerTranslate[zone.color],
        },
      })),
    };
    mapRef.current.getSource("zones").setData(newData);
  }, [zonesRef]);

  console.log("hola "+credentials.username)

  return (
    <>
      {credentials.username==="admin" && ( menu.visible && (
        <ContextMenuLocation
          positionState={positionCreateElement}
          positionContextMenu={menu}
          onClose={handleCloseContextMenuMap}
          onCreateInterestPoint={handleCreateInteresPoint}
          onCreateMark={handleCreateMark}
          types={layerState}
          goal={goal}
          amountPointZone={amountPointZone}
          onOpenZone={handleOpenZone}
          onCreateEdge={handleCreatEdgeZone}
          onCloseZone={handleCloseZone}
          onCancelZone={handleRemoveZoneInCreation}
          typeZones={dangerTranslate}
          dataNewZone={dataNewZone}
          onChangeDataZone={setDataNewZone}
        />
      ))}
      <div>
        <p>
          {positionCreateElement.lng} {positionCreateElement.lat}
        </p>
        <p>{dataZoneSelected.id}</p>
      </div>

      <div
        id="map-container"
        ref={mapContainerRef}
        onContextMenu={handleContentMenu}
        onClick={handleCloseContextMenuMap}
      >
        {credentials.username === "admin" &&
          <Popup popupData={popupData} mapRef={mapRef} />
        }
        <div className="sidebar">
          Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} |
          Zoom: {zoom.toFixed(2)}
        </div>
        <button className="reset-button" onClick={handleButtonClick}>
          Reset
        </button>
        {credentials.username === "admin" &&
          <LayerCheckboxes
            layerState={layerState}
            setLayerState={setLayerState}
          />
        }
        {credentials.username === "admin" &&
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
              setZoneSelected={setDataZoneSelected}
            />

          </div>}
      </div>
    </>
  );
}
