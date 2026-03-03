import React, { useState } from "react";
import "./contextMenuLocation.scss";


export default function ContextMenuLocation({ positionState, positionContextMenu, onClose, onCreateInterestPoint, onCreateMark, types, goal }) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    const options = types.map(type => ({ name: type.name, color: type.color }));


    const createInterestPoint = () => {
        onCreateInterestPoint({
            name: name,
            cuisine: type,
            lng: positionState.lng,
            lat: positionState.lat
        })
        setName("");
        setType("");
        onClose();
    }

    const createMark = () => {
        onCreateMark({
            lng: positionState.lng,
            lat: positionState.lat
        })
        onClose();
    }
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div
            style={{
                position: "absolute",
                visibility: positionContextMenu.visible ? "visible" : "hidden",
                top: positionContextMenu.y,
                left: positionContextMenu.x,
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                background: "white",
                zIndex: 1001,
                padding: "2px",
                borderRadius: "0px 25px 10px 25px",
            }}
        >
            <div className=" d-flex flex-column gap-2 p-2">
                {showForm && (
                    <div className=" d-flex flex-column gap-1 ">
                        <form onSubmit={createInterestPoint} className=" d-flex flex-column gap-1">
                            <h5>Creando un punto de interes</h5>
                            <input type="text" className="form-control" placeholder="Nombre del punto de interés" value={name} onChange={(e) => setName(e.target.value)} />
                            <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="">Selecciona un tipo</option>
                                {options.map((type) => (
                                    <option value={type.name}>{type.name}</option>
                                ))}
                            </select>
                            <input className=" btn btn-sm btn-success" type="submit" value="Crear" />
                        </form>
                    </div>
                )}
                {!showForm &&
                    <div className=" d-flex flex-column gap-1 ">
                        <div className="d-flex flex-row justify-content-end">
                            <input className=" btn btn-sm btn-danger" type="button" onClick={onClose} value="X" />
                        </div>
                        <input type="text" className=" btn btn-outline-info" value={"Crear punto de interes"} onClick={toggleForm} />
                        <input
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={createMark}
                            value={goal ? "Crear ruta desde aquí" : "Crear ruta hasta aquí"}
                        />
                    </div>
                }

            </div>

        </div>
    );
}