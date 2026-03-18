import { useRutas } from "../../hooks/useRutas";
import { useZonas } from "../../hooks/useZonas";
import { useLineasObjetos } from "../../hooks/useLineasObjetos";

import { useEffect, useState } from "react";
export default function PagePrueba() {
  const [message, setMessage] = useState({ text: "", type: "" });

  const { zonas: zones, loading: loadingZones } = useZonas();

  const { rutas: rutes, loading: loadingRutes } = useRutas();

  const { lineasObjetos: linesObjects, loading: loadingLinesObjects } =
    useLineasObjetos();

  const stringToJsonArray = (s) => {
    try {
      // Si s ya es un array/objeto (porque Spring a veces lo convierte solo), lo devolvemos
      if (typeof s !== "string") return s;

      // Si es un string, intentamos parsear
      return JSON.parse(s);
    } catch (e) {
      console.error("Error parseando este valor:", s);
      return []; // Devolvemos un array vacío para que el .map() de abajo no falle
    }
  };
  console.log(rutes);
  console.log(zones);
  console.log(linesObjects)

  return (
    <>
      <div className=" m-5">
        <div className=" m-2">
          <h2>Prueba de Carga de Datos</h2>
          {message.text && (
            <p className={`alert alert-${message.type}`}>{message.text}</p>
          )}

          <h4>
            Rutas:{" "}
            {rutes.map((r) => {
              return (
                <div className=" m-2">
                  <p>{r.nombreRuta}</p>
                </div>
              );
            })}
          </h4>
        </div>
        <div>
          <h4>Zonas</h4>
          {zones.map((z) => {
            return (
              <div>
                <p>{z.nombre_zona}</p>
              </div>
            );
          })}
        </div>
        <div>
          <h4>LineasObjectos</h4>
          {linesObjects.map((l) => {
            return (
              <div>
                <p>
                  {l.id_ruta} {l.id_objeto}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
