import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.scss";
import customMarkerPng from "../../assets/custom-marker.png";
import interestPointData from "../../assets/providence-interestPoint.json";
import ContextMenuLocation from "../contextMenuLocation/contextMenuLocation";
import LayerCheckboxes from "../LayerCheckboxes/LayerCheckboxes";
import Popup from "../Popup/Popup";

//38.361498735545176, -0.49144135129607736
const INITIAL_CENTER = [-0.49144135129607736, 38.361498735545176];
const INITIAL_ZOOM = 15;

export default function Map({}) {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  // marcadores punto a punto
  const markersRef = useRef([]);

  const coordsRef = useRef([{
    id: 0,
    coordpol: [
      [-0.49321027016051744, 38.36560377774532],// va de principio a fin
      [-0.4924404263540225, 38.3626784200614],
      [-0.4802074143640027,38.36177478672232],
      [-0.49321027016051744, 38.36560377774532], // hay que volverlo a unir con el primer punto
    ],
  }]);

  const [popupData, setPopupData] = useState(null);

  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  const [goal, setGoal] = useState(false);

  const [centerMouse, setCenterMouse] = useState(INITIAL_CENTER);

  const [positionCreateElement, setPositionCreateElement] = useState({
    lng: 0,
    lat: 0
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

  const handleCreatPointZone=(e)=>{
    const coords=[e.lng.e.lat]

    if(!mapRef.current) return;
    
    coordsRef.current.coordpol.push(coords)


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

  const handleCreateMark = (e) => {
    const coords = [e.lng, e.lat];

    if (!mapRef.current) return;
    if (routePoints.length === 2) {
      clearMarkers();
      setGoal(false);
    } else setGoal(true);

    const marker = new mapboxgl.Marker()
      .setLngLat(coords)
      .addTo(mapRef.current);

    markersRef.current.push(marker);

    setRoutePoints((prev) => {
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
        coordinates: [e.lng, e.lat],
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

        if (!mapRef.current.getLayer(layerId)) {
          // add a layer for each cuisine type, filtering to only show features with that cuisine type.
          for (const layer of layerState) {
            const { name, color } = layer;

            const layerId = `interestPoint-${name}-symbol`;

            // add a symbol layer for each cuisine type, filtering to only show features with that cuisine type.
            if (!mapRef.current.getLayer(layerId)) {
              mapRef.current.addLayer({
                id: layerId,
                type: "symbol",
                source: "interestPoint",

                // Grabs local image for custom marker, allows markers to over lap and colors each marker based on the related cuisine color.
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
          }
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
      mapRef.current.addSource("maine", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            // These coordinates outline Maine.
            coordinates:   [             
              coordsRef.current[0].coordpol
            ]
            ,
          },
        },
      });

      mapRef.current.addLayer({
        id: "maine",
        type: "fill",
        source: "maine",
        layout: {},
        paint: {
          "fill-color": "#0080ff",
          "fill-opacity": 0.5,
        },
      });

      mapRef.current.addLayer({
        id: "outline",
        type: "line",
        source: "maine",
        layout: {},
        paint: {
          "line-color": "#000",
          "line-width": 3,
        },
      });

      /*mapRef.current.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [-0.49144135129607737, 38.33989873554519],
              },
            },
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [-0.489451351296075, 38.36949873554509],
              },
            },
          ],
        },
      });

      mapRef.current.addLayer({
        id: "circle",
        type: "circle",
        source: "points",
        paint: {
          "circle-color": "#4264fb",
          "circle-radius": 8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });

      mapRef.current.on("click", "circle", (e) => {
        mapRef.current.flyTo({
          center: e.features[0].geometry.coordinates,
        });
      });

      mapRef.current.on("mouseenter", "circle", () => {
        mapRef.current.getCanvas().style.cursor = "pointer";
      });

      mapRef.current.on("mouseleave", "circle", () => {
        mapRef.current.getCanvas().style.cursor = "";
      });*/
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

  return (
    <>
      {menu.visible && (
        <ContextMenuLocation
          positionState={positionCreateElement}
          positionContextMenu={menu}
          onClose={handleCloseContextMenuMap}
          onCreateInterestPoint={handleCreateInteresPoint}
          onCreateMark={handleCreateMark}
          types={layerState}
          goal={goal}
          amountPointZone={coordsRef.current.coordpol.length}
          onCreatePointZone={handleCreatPointZone}
        />
      )}
      <div className=" p-4">
        <p>
          longitud:{positionCreateElement.lng} latitud{" "}
          {positionCreateElement.lat}
        </p>
      </div>
      <div
        id="map-container"
        ref={mapContainerRef}
        onContextMenu={handleContentMenu}
        onClick={handleCloseContextMenuMap}
      >
        <Popup popupData={popupData} mapRef={mapRef} />
        <div className="sidebar">
          Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} |
          Zoom: {zoom.toFixed(2)}
        </div>
        <button className="reset-button" onClick={handleButtonClick}>
          Reset
        </button>
        <LayerCheckboxes
          layerState={layerState}
          setLayerState={setLayerState}
        />
      </div>
    </>
  );
}
