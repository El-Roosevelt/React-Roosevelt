import { useContext } from "react";
import Map from "../../components/Map/Map";
import PagePrueba from "../PagePrueba/PagePrueba";


export default function Mapa() {
  const disableContextMenuPag = (e) => {
    e.preventDefault();
  };
  return (
    <>
      
        <PagePrueba/>
        <div
          className="d-flex flex-column align-items-center map-container min-vh-100 m-2 mb-4 mt-4"
          onContextMenu={disableContextMenuPag}
        >
          <Map />
        </div>
    </>
  );
}
