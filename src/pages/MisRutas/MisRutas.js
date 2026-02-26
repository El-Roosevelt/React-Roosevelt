import "./MisRutas.scss";
import Ruta from "../../components/Ruta/Ruta";
import { useState } from "react";

export default function MisRutas() {
  const [rutas, setRutas] = useState([
    {
      id: 1,
      titulo: "Ruta-1",
      imagen: "/assets/ruta-1.png",
      fecha: "2026-02-24",
    },
    {
      id: 2,
      titulo: "Ruta-2",
      imagen: "/assets/ruta-1.png",
      fecha: "2026-02-24",
    },
    {
      id: 3,
      titulo: "Ruta-3",
      imagen: "/assets/ruta-1.png",
      fecha: "2026-02-24",
    },
    {
      id: 4,
      titulo: "Ruta-4",
      imagen: "/assets/ruta-1.png",
      fecha: "2026-02-24",
    },
    {
      id: 5,
      titulo: "Ruta-5",
      imagen: "/assets/ruta-1.png",
      fecha: "2026-02-24",
    },
  ]);

  const titulo = "Ruta-1";
  const imagen = "/assets/ruta-1.png";
  const fecha = "2026-02-24";

  function eliminarRuta(id) {
    setRutas(rutas.filter((r) => r.id !== id));
  }

  return (
    <div className="p-3 pb-5 bg-primary h-100">
      <h2 className="text-light text-center">Mis rutas</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 align-content-start g-4 h-100">
        {rutas.map((ruta) => {

          return (
            <div className="col">
              <Ruta
                id={ruta.id}
                titulo={ruta.titulo}
                imagen={ruta.imagen}
                fecha={ruta.fecha}
                eliminarRuta={eliminarRuta}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
