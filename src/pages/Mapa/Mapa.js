// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
// import { createRoot } from 'react-dom/client';

// export default function Mapa() {

//     const position = [51.505, -0.09]
//     const domNode = document.getElementById('root');
//     const root = createRoot(domNode);
//     root.render(
//         <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
//             <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <Marker position={position}>
//                 <Popup>
//                     A pretty CSS3 popup. <br /> Easily customizable.
//                 </Popup>
//             </Marker>
//         </MapContainer>,
//     )
// }


import { useEffect, useRef } from "react";
import leaflet from "leaflet";
import Map from "../../components/Map/Map"

export default function Mapa() {
    /*const mapRef = useRef();

    useEffect(() => {
        mapRef.current = leaflet.map("map").setView([51.505, -0.09], 13);
        leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',

            }
        ).addTo(mapRef.current);
    }, []);*/

    return (
        <div className=" d-flex flex-column">
            <Map></Map>
        </div>
    )
}