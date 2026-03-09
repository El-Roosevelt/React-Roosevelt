import React, { useState } from "react";
import "./InfoPanel.scss";

export default function InfoPanel({ zones, onRemoveZone, dangerColor }) {
  const [tabSwitched, setTabSwitched] = useState(false);

  return (
    <div className="info-panel-container">
      <ul className="nav nav-tabs m-0">
        <li className="nav-item">
          <button 
            className={`nav-link w-100 ${!tabSwitched ? "active" : ""}`} 
            onClick={() => setTabSwitched(false)}
          >
            Zonas
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link w-100 ${tabSwitched ? "active" : ""}`} 
            onClick={() => setTabSwitched(true)}
          >
            Rutas
          </button>
        </li>
      </ul>

      <div className="panel-content">
        <p className="bg-light mb-3 p-2 fw-bolder rounded text-center text-muted">
          Datos de {!tabSwitched ? "Zonas" : "Rutas"}
        </p>

        <div className="d-flex flex-column">
          {zones.map((z) => (
            <div className="zone-card" key={z.id}>
              
              <div className="zone-header">
                <span className="zone-number">Numero: {z.id + 1}</span>
                <button className="btn-close-zone" onClick={() => onRemoveZone(z.id)}>
                  <i className="bi bi-x"></i>
                </button>
              </div>

              <div className="zone-name">
                Nombre: {z.name || "Sin nombre"}
              </div>

              <div className={`text-light fw-bold text-center rounded py-2 mb-3 shadow-sm ${dangerColor[z.color] || "bg-secondary"}`}>
                Zona: {z.color}
              </div>

              <div className="coords-box">
                {!tabSwitched ? (
                  z.coordpol.map((c, index) => (
                    <p key={index}>{c[0]} <br/> {c[1]}</p>
                  ))
                ) : (
                  z.coordpol.map((c, idx1) => (
                    <div key={idx1}>
                      {c.map((e, idx2) => (
                        <p key={idx2}>{e[0]} <br/> {e[1]}</p>
                      ))}
                    </div>
                  ))
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}