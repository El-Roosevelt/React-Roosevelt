import "./RutasFavoritas.scss"; 
import Ruta from "../../components/Ruta/Ruta";
import { useState } from "react";

export default function RutasFavoritas() {

    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(null);
    const [rutasFavoritas, setRutasFavoritas] = useState([
        {
            id: 1,
            titulo: "Ruta Favorita 1",
            imagen: "/assets/ruta-1.png",
            fecha: "2026-02-24",
        },
        {
            id: 2,
            titulo: "Ruta Favorita 2",
            imagen: "/assets/ruta-1.png",
            fecha: "2026-02-24",
        },
        {
            id: 3,
            titulo: "Ruta Favorita 3",
            imagen: "/assets/ruta-1.png",
            fecha: "2026-02-24",
        },
        {
            id: 4,
            titulo: "Ruta Favorita 4",
            imagen: "/assets/ruta-1.png",
            fecha: "2026-02-24",
        },
        {
            id: 5,
            titulo: "Ruta Favorita 5",
            imagen: "/assets/ruta-1.png",
            fecha: "2026-02-24",
        },
    ]);

  function eliminarRuta(id) {
    setShowModal(true);
    setId(id);    
  }
  const handleCloseModal = () => {
    setShowModal(false);
    setRutasFavoritas(rutasFavoritas.filter((r) => r.id !== id));
    setId(null);
  }


  return (
    <div className="p-3 pb-5 bg-primary h-100">
      <h2 className="text-light text-center">Rutas favoritas</h2>
      
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 align-content-start g-4 h-100">
        {rutasFavoritas.map((ruta) => {
          return (
            <div className="col" key={ruta.id}>
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
        {showModal && (
            <div className=" bg-modal">
                <div className=" modal d-flex flex-column align-items-center justify-content-center">
                    <h3 className="text-center">¿Estás seguro de que quieres eliminar esta ruta de tus favoritas?</h3>
                    <div>
                        <button className="btn btn-secondary me-2" onClick={handleCloseModal}>Sí, eliminar</button>
                        <button className="btn btn-primary" onClick={() => setShowModal(false)}>No, cancelar</button>
                    </div>
                </div>
            </div>    
        )}
    
        
    </div>
  );
}