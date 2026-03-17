import axios from "axios";
import { useEffect, useState } from "react";
export default function PagePrueba() {
  const [rutes, setRutes] = useState();
  const [zones, setZones] = useState();

  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const handleGetData = async () => {
      try {
        // mando datos
        const apiUrl = process.env.REACT_APP_API_URL;

        const [resRutas, resZonas] = await Promise.all(
          axios.get(`${apiUrl}/api/rutas`),
          axios.get(`${apiUrl}/api/zonas`)
        );

        if (resRutas.status === 200) {
          setRutes(...resRutas.data);
          console.log(rutes);
        }
        if (resZonas.status === 200) {
          setZones(...resZonas.data);
        }
      } catch (error) {
        if (
          error.resRutas?.status === 401 ||
          error.resRutas?.status === 404 ||
          error.resZonas?.status === 401 ||
          error.resZonas?.status === 404
        ) {
          setMessage({
            text: "No han salido todos los datos de la pai",
            type: "not found",
          });
        } else {
          setMessage({ text: "Error en el servidor", type: "danger" });
        }
      }
    };
    handleGetData();
  });
  const [nombre,setNombre] = useState();
  const [apellido,setApellido] = useState();

  return (
    <>
      <div>
        <form>
            <div>
                <label>Nombre</label>
                <input type="text" value={nombre} onChange={e=>setNombre(e.target.value)}/>
            </div>
            <div>
                <label>Apellido</label>
                <input type="text" value={apellido} onChange={e=>setApellido(e.target.value)}/>
            </div>
        </form>
      </div>
    </>
  );
}























