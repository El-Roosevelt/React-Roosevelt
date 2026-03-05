import React, { useState } from "react";
import "./contextMenuLocation.scss";


export default function ContextMenuLocation({ positionContextMenu, onClose, onCreateInterestPoint, onCreateMark, types, goal, amountPointZone,onOpenZone , onCreateEdge, onCloseZone, onCancelZone }) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    const options = types.map(type => ({ name: type.name, color: type.color }));


    const createInterestPoint = () => {
        onCreateInterestPoint({
            name: name,
            cuisine: type
        })
        setName("");
        setType("");
        onClose();
    }

    const createMark = () => {
        onCreateMark();
        onClose();
    }
    const [showForm, setShowForm] = useState(false);

    const [showZoneControl,setShowZoneControl]= useState(false)

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const toggleZoneControl = () => {
        setShowZoneControl(!showZoneControl);
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
                {showForm ?
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
                
                : (
                    !showZoneControl?
                    <div className=" d-flex flex-column gap-1 ">
                        <div className="d-flex flex-row justify-content-end">
                            <input className=" btn btn-sm btn-danger" type="button" onClick={onClose} value="X" />
                        </div>
                        <input className=" btn btn-outline-info" value={"Crear punto de interes"} onClick={toggleForm} />
                        <input
                            type="button"
                            className="btn btn-outline-secondary"                            
                            onClick={createMark}
                            value={!goal ? "Crear ruta desde aquí" : "Crear ruta hasta aquí"}
                        />                        
                        <input
                            type="button"
                            className="btn btn-secondary"
                            onClick={toggleZoneControl}
                            value={"Crear poligono"}
                        />                                                
                    </div>
                    :<div className="d-flex flex-column gap-1">                        
                        <p className=" m-1 text-info">Para crearlo minimo 3 puntos</p>
                        {amountPointZone >0 && <span className=" d-flex flex-column border border-3 shadow-lg rounded-2 p-1 mb-4 align-items-center">Creados {amountPointZone} punto{amountPointZone>1?"s":""}</span>}
                        
                        {amountPointZone == 0 && 
                        <input type="button" className=" btn btn-success " value={"Abrir Zona"} onClick={onOpenZone}/>
                        }                                                  
                        {amountPointZone >=1 && 
                        <input type="button" className=" btn btn-outline-primary " value={"Extension"} onClick={onCreateEdge}/>
                        }
                        {amountPointZone>2 && 
                        <input type="button" className=" btn btn-danger " value={"Cerrar Zona"} onClick={onCloseZone}/>
                        }
                        {amountPointZone > 0 && 
                        <input type="button" className=" btn btn-success " value={"Cancelar"} onClick={onCancelZone}/>
                        }                         
                    </div>)
                }

            </div>

        </div>
    );
}