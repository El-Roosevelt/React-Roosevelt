import React, { use, useState } from "react";
import "./InfoPanel.scss";


export default function InfoPanel({ zones, onRemoveZone, onEditZone, dangerColor, typesDanger}) {
  const [tabSwitched, setTabSwitched] = useState(false);

  const [selectedZoneToRemove, setSelectedZoneToRemove] = useState();

  const [selectedZoneToEdit, setSelectedZoneToEdit] = useState({
    id: 0,
    name: "",
    type: "",
    coordpol: [[]]
  });

  const danger = Object.freeze({
        rojo: "Alta",
        amarillo: "Media",
        verde: "Baja"
    })

  const [nameZoneEdit, setNameZoneEdit] = useState();
  const [typeZoneEdit, setTypeZoneEdit] = useState();

  const removeZone = () => {
    onRemoveZone(selectedZoneToRemove);
    setSelectedZoneToRemove(null);
  }
  const prepareToEdit = (zone) => {
    setSelectedZoneToEdit({
      id: zone.id,
      name: zone.name,
      type: zone.type,
      coordpol: zone.coordpol
    })
    setNameZoneEdit(zone.name)
    setTypeZoneEdit(zone.type)
  }
  const editZone = () => {
    onEditZone(selectedZoneToEdit);
    setSelectedZoneToEdit({
      id: 0,
      name: "",
      type: "",
      coordpol: [[]]
    });
  }

  return (
    <div className="info-panel-container">
      <div className="modern-tabs">
        <button
          className={`tab-btn ${!tabSwitched ? "active" : ""}`}
          onClick={() => setTabSwitched(false)}
        >
          Zonas
        </button>
        <button
          className={`tab-btn ${tabSwitched ? "active" : ""}`}
          onClick={() => setTabSwitched(true)}
        >
          Rutas
        </button>
      </div>

      <div className="panel-content">
        {zones.length === 0 ? (
          <div className="text-center p-4 text-muted small">
            No hay {tabSwitched ? "rutas" : "zonas"} para mostrar.
          </div>
        ) : (
          zones.map((z) => {

            const dotColorClass = dangerColor && dangerColor[z.color]
              ? dangerColor[z.color]
              : "bg-secondary";

            return (
              <div key={z.id}>
                {selectedZoneToRemove !== z.id ?
                  (selectedZoneToEdit.id !== z.id ?
                    <div className="zone-item">
                      <div className="item-header">
                        <div className="item-title-group">
                          <div className={`color-dot ${dotColorClass}`}></div>
                          <h4 className="item-title">{z.name || `Zona ${z.id + 1}`}</h4>
                        </div>
                        <button className=" btn-edit" onClick={() => prepareToEdit({id:z.id,name:z.name,type:z.color,coordpol:z.coordpol})}>
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button className="btn-close" onClick={() => setSelectedZoneToRemove(z.id)}>
                          <i className="bi bi-x"></i>
                        </button>
                      </div>

                      <div className="item-meta">
                        Zona: <span className="fw-bold" style={{ color: "#333" }}>{z.color || "Ninguno"}</span>
                      </div>

                      <div className="coords-box">
                        {z.coordpol && z.coordpol.map((c, index) => {
                          if (typeof c[0] === 'number') {
                            return (
                              <div key={index} style={{ marginBottom: "4px" }}>
                                <strong style={{ color: "#1a73e8" }}>P{index + 1}:</strong> {c[0].toFixed(5)}, {c[1].toFixed(5)}
                              </div>
                            );
                          }

                          if (Array.isArray(c[0])) {
                            return (
                              <div key={index} style={{ marginBottom: "8px" }}>
                                <strong style={{ color: "#1a73e8" }}>Tramo {index + 1}:</strong>
                                {c.map((e, idx) => (
                                  <div key={idx} style={{ marginLeft: "12px" }}>
                                    ↳ {e[0]?.toFixed(5)}, {e[1]?.toFixed(5)}
                                  </div>
                                ))}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>

                    </div> :
                    // Al editar una zona
                    <div>
                      <form onSubmit={()=>editZone}>
                        <div className=" m-1 p-2">
                          <label className=" form-label">
                            Nombre zona:
                          </label>
                          <input className=" form-control w-75" value={nameZoneEdit} onChange={e => setNameZoneEdit(e.target.value)} />
                        </div>
                        <div className=" m-1 p-2">
                          <label className=" form-label">
                            Tipo de zona:
                          </label>
                          <select className="form-select w-75" value={typeZoneEdit} onChange={e=>setTypeZoneEdit(e.target.value)}>
                          {Object.keys(typesDanger).map(key => (
                                                    <option value={key}>{danger[key]}</option>
                                                ))}
                          </select>
                        </div>
                        <div className=" d-flex flex-row gap-1 p-2 m-1">
                          <input className=" btn btn-info w-50" onClick={() => setSelectedZoneToEdit({
                            id: 0,
                            name: "",
                            type: "",
                            coordpol: [[]]
                          })} value={"Cancelar"} />
                          <input type="submit" className=" btn btn-success w-auto" value={"Guardar"}/>
                        </div>

                      </form>
                    </div>
                  ) :
                  //Al remover una zona
                  <div className=" option-remove p-4">
                    <p className=" fw-bold fs-6">¿Quieres eliminar esta zona?</p>
                    <button className=" btn btn-danger m-1" onClick={() => removeZone()}>Borrar</button>
                    <button className=" btn btn-success m-1" onClick={() => setSelectedZoneToRemove("")}>Cancelar</button>
                  </div>
                }
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}