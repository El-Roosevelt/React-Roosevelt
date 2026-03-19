import { useRutas } from "../../hooks/useRutas";
import { useZonas } from "../../hooks/useZonas";
import { useLineasObjetos } from "../../hooks/useLineasObjetos";
import { useObjetos } from "../../hooks/useObjetos";

import { useEffect, useState } from "react";
export default function PagePrueba() {
  const [message, setMessage] = useState({ text: "", type: "" });

  const { zonas: zones, loading: loadingZones } = useZonas();

  const { rutas: rutes, loading: loadingRutes } = useRutas();

  const { lineasObjetos: linesObjects, loading: loadingLinesObjects } =
    useLineasObjetos();

  const { objetos: objects, loading: loadingObjects } = useObjetos();

  const { tiposobjeto: typeObjects, loading: loadingTypeObjects } = useObjetos();

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
  
    console.log("Rutas")
    console.log( rutes);
    console.log("Zonas")
    console.log( zones);
    console.log("LineasObjetos")
    console.log(linesObjects);
    console.log("Objetos")
    console.log(objects);
    console.log("TiposObjetos")
    console.log(typeObjects)


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
                  <p>{r.zona.id}</p>
                  <p>{r.usuario_autor.id}</p>
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
