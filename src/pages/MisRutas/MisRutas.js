import "./MisRutas.scss";
import Ruta from "../../components/Ruta/Ruta";

export default function MisRutas(){

    const titulo = "Ruta-1";
    const imagen = "/assets/ruta-1.png";
    const fecha = "2026-02-24";

    return (
        <div className="p-3 pb-5 bg-primary h-100">
            <h2 className="text-light text-center">Mis rutas</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 align-content-start g-4 h-100">
                <div className="col">
                    <Ruta titulo={titulo} imagen={imagen} fecha={fecha} />
                </div>
                <div className="col">
                    <Ruta titulo={titulo} imagen={imagen} fecha={fecha} />
                </div>
                <div className="col">
                    <Ruta titulo={titulo} imagen={imagen} fecha={fecha} />
                </div>
                <div className="col">
                    <Ruta titulo={titulo} imagen={imagen} fecha={fecha} />
                </div>
                <div className="col">
                    <Ruta titulo={titulo} imagen={imagen} fecha={fecha} />
                </div>
                <div className="col">
                    <Ruta titulo={titulo} imagen={imagen} fecha={fecha} />
                </div>
                <div className="col">
                    <Ruta titulo={titulo} imagen={imagen} fecha={fecha} />
                </div>
                <div className="col">
                    <Ruta titulo={titulo} imagen={imagen} fecha={fecha} />
                </div>
            </div>
        </div>
    )
}