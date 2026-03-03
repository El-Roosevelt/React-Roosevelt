import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.scss";
import customMarkerPng from "../../assets/custom-marker.png";
import restaurantsData from "../../assets/providence-restaurants.json";
import ContextMenuLocation from "../contextMenuLocation/contextMenuLocation";
import LayerCheckboxes from "../LayerCheckboxes/LayerCheckboxes";

import { map } from "leaflet";
//38.361498735545176, -0.49144135129607736
const INITIAL_CENTER = [-0.49144135129607736, 38.361498735545176];
const INITIAL_ZOOM = 15;

export default function Map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  const [centerMouse, setCenterMouse] = useState(INITIAL_CENTER);

  const [positionNewMark, setPositionNewMark] = useState({
    name: "",
    lng: 0,
    lat: 0,
  });

  const updatedRestaurantsData = {
    ...restaurantsData,
    features: [...restaurantsData.features],
  };

  const [layerState, setLayerState] = useState([
    {
      name: "vegetarian",
      color: "#33a02c",
      isChecked: true,
    },
    {
      name: "sandwich",
      color: "#ffff99",
      isChecked: true,
    },
    {
      name: "asian",
      color: "#6a3d9a",
      isChecked: true,
    },
    {
      name: "american",
      color: "#a6cee3",
      isChecked: true,
    },
    {
      name: "coffee",
      color: "#e31a1c",
      isChecked: true,
    },
    {
      name: "mexican",
      color: "#cab2d6",
      isChecked: true,
    },
    {
      name: "seafood",
      color: "#1f78b4",
      isChecked: true,
    },
    {
      name: "ice cream",
      color: "#fb9a99",
      isChecked: true,
    },
    {
      name: "korean",
      color: "#cab2d6",
      isChecked: true,
    },
    {
      name: "sushi",
      color: "#b2df8a",
      isChecked: true,
    },
    {
      name: "italian",
      color: "#ff7f00",
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
    positionNewMark[0] = centerMouse[0];
    positionNewMark[1] = centerMouse[1];
  };

  const handleButtonClick = () => {
    mapRef.current.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });
  };

  const handleMouseMoveMap = (e) => {
    setCenterMouse([e.lngLat.lng, e.lngLat.lat]);
  };

  const handleCreateMark = () => {
    new mapboxgl.Marker({ color: "red", rotation: 45 })
      .setLngLat(positionNewMark)
      .addTo(mapRef.current);
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "";
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

      if (positionNewMark.name != "") {
        const newfeature = {
          id: 999, // asegúrate de que no repita id
          type: "Feature",
          properties: {
            name: positionNewMark.name,
            cuisine: "italian",
          },
          geometry: {
            type: "Point",
            coordinates: [positionNewMark.lng, positionNewMark.lat],
          },
        };
        updatedRestaurantsData.features.push(newfeature);
      }
      // add a single source for all restaurants
      mapRef.current.addSource("restaurants", {
        type: "geojson",
        data: updatedRestaurantsData,
      });

      // add a layer for each cuisine type
      for (const layer of layerState) {
        const { name, color } = layer;

        const layerId = `restaurants-${name}-symbol`;

        if (!mapRef.current.getLayer(layerId)) {
          // add a layer for each cuisine type, filtering to only show features with that cuisine type.
          for (const layer of layerState) {
            const { name, color } = layer;

            const layerId = `restaurants-${name}-symbol`;

            // add a symbol layer for each cuisine type, filtering to only show features with that cuisine type.
            if (!mapRef.current.getLayer(layerId)) {
              mapRef.current.addLayer({
                id: layerId,
                type: "symbol",
                source: "restaurants",

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
      }
      if (!mapRef.current) return;

      layerState.forEach((layer) => {
        const layerId = `restaurants-${layer.name}-symbol`;
        if (mapRef.current.getLayer(layerId)) {
          const visibility = layer.isChecked ? "visible" : "none";
          mapRef.current.setLayoutProperty(layerId, "visibility", visibility);
        }
      });
    });

    // para esconder o mostrar las capas dependiendo del estado de los checkboxes

    new mapboxgl.Marker()
      .setLngLat([-0.49144135129607737, 38.36149873554519])
      .addTo(mapRef.current);

    new mapboxgl.Marker({ color: "black", rotation: 45 })
      .setLngLat([-0.486451351296075, 38.36349873554509])
      .addTo(mapRef.current);

    mapRef.current.on("move", () => {
      // get the current center coordinates and zoom level from the map
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();

      // update state
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    mapRef.current.on("mousemove", handleMouseMoveMap);

    // crear los puntos de interes
    mapRef.current.on("load", () => {
      mapRef.current.addSource("points", {
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
      });
    });

    return () => {
      mapRef.current.remove();
    };
  }, [layerState, positionNewMark]);

  return (
    <>
      <div className="sidebar-mouse">
        Mouse Longitude: {centerMouse[0].toFixed(4)} | Mouse Latitude:{" "}
        {centerMouse[1].toFixed(4)}
      </div>
      <div className="sidebar-mouse">
        Mouse Longitude: {positionNewMark.lng} | Mouse Latitude:{" "}
        {positionNewMark.lat}
      </div>

      {menu.visible && (
        <ContextMenuLocation
          positionState={menu}
          onClose={handleCloseContextMenuMap}
          onCreateMark={setPositionNewMark}
          types={layerState}
        />
      )}
      <div
        id="map-container"
        ref={mapContainerRef}
        onContextMenu={handleContentMenu}
        onClick={handleCloseContextMenuMap}
      >
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
