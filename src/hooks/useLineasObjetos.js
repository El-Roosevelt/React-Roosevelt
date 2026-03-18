
import { useState, useEffect } from "react";
import { getLineasObjetos } from "../services/linesObjectsService";

export function useLineasObjetos() {
  const [lineasObjetos, setLineasObjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("1. El useEffect del Hook se ha disparado"); // <--- AÑADE ESTO
    getLineasObjetos()
      .then(data => {
        console.log("2. Datos recibidos en el Hook");
        setLineasObjetos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("3. Error detectado:", err);
        setLoading(false);
      });
  }, []);

  return { lineasObjetos, loading };
}