import React, { useState, useEffect } from 'react'
// import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
// import '@geoapify/geocoder-autocomplete/styles/minimal.css'
import "./Mapa.scss";

export default function Mapa() {

    // function onPlaceSelect(value) {
    //     console.log(value);
    // }

    // function onSuggectionChange(value) {
    //     console.log(value);
    // }
    // const onPlaceSelected = (feature) => {
    //     console.log('Selected:', feature?.properties?.formatted);
    // };

    // const onSuggestionsChange = (list) => {
    //     console.log('Suggestions:', list);
    // };

    // return (
    //     <GeoapifyContext apiKey="21b07e2c13234dee83122652436caad2">
    //         <GeoapifyGeocoderAutocomplete
    //             placeholder="Search for an address"
    //             lang="en"
    //             limit={8}
    //             addDetails={true}
    //             placeSelect={onPlaceSelected}
    //             suggestionsChange={onSuggestionsChange}
    //         />
    //     </GeoapifyContext>
    // )

    function MyMap() {
        let mapContainer;

        useEffect(() => {
            const initialState = {
                lng: 11,
                lat: 49,
                zoom: 4
            };

            const map = L.map(mapContainer).setView([initialState.lat, initialState.lng], initialState.zoom);

            // the attribution is required for the Geoapify Free tariff plan
            map.attributionControl.setPrefix('').addAttribution('Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>');

            var myAPIKey = 'YOUR_API_KEY_HERE';
            const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-carto/style.json';

            const gl = L.mapboxGL({
                style: `${mapStyle}?apiKey=${myAPIKey}`,
                accessToken: 'no-token'
            }).addTo(map);
        }, [mapContainer]);

        return (
            <div className="map-container" ref={el => mapContainer = el}>
            </div>
        )
    }
}