import React, { useState } from "react";
import "./contextMenuLocation.scss";


export default function ContextMenuLocation({ positionState, onClose, onCreateMark, types}) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    
    const options=types.map(type=>({name:type.name,color:type.color}));


    const createMark = () =>{
        onCreateMark({
            name:name,
            cuisine:type,
            lng: positionState.lng,
            lat: positionState.lat
        })
        setName("");
        setType("");
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
            visibility: positionState.visible ? "visible" : "hidden",
            top: positionState.y,
            left: positionState.x,
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
                        <form className=" d-flex flex-column gap-1">
                            <h5>Creando un punto de interes</h5>
                            <input type="text" className="form-control" placeholder="Nombre del punto de interés" value={name} onChange={(e) => setName(e.target.value)} />
                            <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="">Selecciona un tipo</option>
                                {options.map((type) => (
                                    <option value={type.name}>{type.name}</option>
                                ))}
                            </select>
                            <input className=" btn btn-sm btn-success" type="button"  onClick={createMark} value="Crear" />
                        </form>   
                    </div>
                )}
                {!showForm &&
                    <div className=" d-flex flex-column gap-1 ">
                        <div className="d-flex flex-row justify-content-end">
                        <input className=" btn btn-sm btn-danger" type="button"  onClick={onClose} value="X" />
                        </div>
                        <input type="text" className=" btn btn-outline-info" value={"Crear punto Interes"} onClick={toggleForm} />
                        <input type="text" className=" btn btn-outline-secondary" value={"Crear ruta"} onClick={onClose} />
                        <input type="text" className=" btn btn-outline-primary" value={"aqui"} />
                    </div>
                }
                
            </div>
          
        </div>
    );
}