import React, { use, useState } from "react";
import "./InfoPanel.scss";


export default function InfoPanel({ zones, rutes, onRemoveZone, onEditZone, dangerColor, typesDanger, zoneSelected, setZoneSelected }) {

  const [tabSwitched, setTabSwitched] = useState(false);

  const [selectedZoneToRemove, setSelectedZoneToRemove] = useState();

  const [selectedZoneToEdit, setSelectedZoneToEdit] = useState({
    id: null,
    name: "",
    color: "",
    coordpol: [[]]
  });

  const [selectedRuteToRemove, setSelectedRuteToRemove] = useState();
  const [selectedRuteToEdit, setSelectedRuteToEdit] = useState();

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
      color: zone.color,
      coordpol: zone.coordpol
    })
    setNameZoneEdit(zone.name)
    setTypeZoneEdit(zone.color)
  }
  const editZone = () => {
    onEditZone(
      {
        id: selectedZoneToEdit.id,
        name: selectedZoneToEdit.name != nameZoneEdit ? nameZoneEdit : selectedZoneToEdit.name,
        color: selectedZoneToEdit.color != typeZoneEdit ? typeZoneEdit : selectedZoneToEdit.color,
        coordpol: selectedZoneToEdit.coordpol
      });
    setSelectedZoneToEdit({
      id: null,
      name: "",
      color: "",
      coordpol: [[]]
    });
  }
  const getOneZone = (zone) => {
    setZoneSelected({ id: zone.id, name: zone.name, color: zone.color, coordpol: zone.coordpol })
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
          !tabSwitched ? (
            zones.map((z) => {

              const dotColorClass = dangerColor && dangerColor[z.color]
                ? dangerColor[z.color]
                : "bg-secondary";

              return (
                <div key={z.id} >
                  {selectedZoneToRemove !== z.id ?
                    (selectedZoneToEdit.id !== z.id ?
                      <div className={`zone-item ${zoneSelected.id != null ? "active" : ""}`} onClick={() => getOneZone({ id: z.id, name: z.name, color: z.color, coordpol: z.coordpol })}>
                        <div className="item-header">
                          <div className="item-title-group">
                            <div className={`color-dot ${dotColorClass}`}></div>
                            <h4 className="item-title">{z.name || `Zona ${z.id + 1}`}</h4>
                          </div>
                          <button className=" btn-edit" onClick={() => prepareToEdit({ id: z.id, name: z.name, color: z.color, coordpol: z.coordpol })}>
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
                        <form onSubmit={editZone}>
                          <div className=" m-1 p-2">
                            <label className=" form-label">
                              Nombre zona:
                            </label>
                            <input className=" form-control w-75" value={nameZoneEdit} onChange={e => setNameZoneEdit(e.target.value)} />
                          </div>
                          <div className=" m-1 p-2">

                            <p>ID:{selectedZoneToEdit.id}</p>
                            <label className=" form-label">
                              Tipo de zona:
                            </label>
                            <select className="form-select w-75" value={typeZoneEdit} onChange={e => setTypeZoneEdit(e.target.value)}>
                              {Object.keys(typesDanger).map(key => (
                                <option key={key} value={key}>{danger[key]}</option>
                              ))}
                            </select>
                          </div>
                          <div className=" d-flex flex-row gap-1 p-2 m-1">
                            <input className=" btn btn-info w-50" onClick={() => setSelectedZoneToEdit({
                              id: null,
                              name: "",
                              color: "",
                              coordpol: [[]]
                            })} value={"Cancelar"} />
                            <input type="submit" className=" btn btn-success w-auto" value={"Guardar"} />
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
            })) : (
            rutes.map((r) => {
              return (
                <div key={r.id}>
                  <div className="zone-item">
                    <div className="item-header">
                      <div className="item-title-group p-2">
                        <h4 className="item-title">{r.name}</h4>
                      </div>
                      <button className=" btn-edit">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button className="btn-close">
                        <i className="bi bi-x"></i>
                      </button>
                    </div>
                    <div className="item-meta">
                      <p>{r.description}</p>
                    </div>
                    <div className="coords-box">
                      {r.coordpol && r.coordpol.map((c, index) => {
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
                  </div>
                </div>
              )
            })
          )
        )}
      </div>
    </div>
  );
}