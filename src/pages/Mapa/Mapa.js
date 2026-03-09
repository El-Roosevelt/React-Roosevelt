import { useEffect, useRef } from "react";
import leaflet from "leaflet";
import "./Mapa.scss";
import Map from  "../../components/Map/Map"


export default function Mapa() {
    

    return (
        <div className=" container-map" >
            <Map/>
        </div>
    )
}