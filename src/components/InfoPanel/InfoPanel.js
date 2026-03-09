import React, { useState } from "react";
import "./InfoPanel.scss";

// ВАЖНО: Убедись, что в Map.js ты передаешь dangerColor!
// <InfoPanel zones={zonesRef} onRemoveZone={handleRemoveZone} dangerColor={dangerColor} />
export default function InfoPanel({ zones, onRemoveZone, dangerColor }) {
  const [tabSwitched, setTabSwitched] = useState(false);

  return (
    <div className="info-panel-container">
      {/* Навигация (Вкладки) */}
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

      {/* Контент */}
      <div className="panel-content">
        {zones.length === 0 ? (
          <div className="text-center p-4 text-muted small">
            No hay {tabSwitched ? "rutas" : "zonas"} para mostrar.
          </div>
        ) : (
          zones.map((z) => {
            
            // Строго берем цвет из словаря твоего друга (если не найдет, будет серым)
            const dotColorClass = dangerColor && dangerColor[z.color] 
              ? dangerColor[z.color] 
              : "bg-secondary";

            return (
              <div className="zone-item" key={z.id}>
                
                <div className="item-header">
                  <div className="item-title-group">
                    {/* Точка с оригинальным классом от твоего друга (bg-warning, bg-danger и тд) */}
                    <div className={`color-dot ${dotColorClass}`}></div>
                    <h4 className="item-title">{z.name || `Zona ${z.id + 1}`}</h4>
                  </div>
                  
                  <button className="btn-close" onClick={() => onRemoveZone(z.id)}>
                    <i className="bi bi-x"></i>
                  </button>
                </div>

                <div className="item-meta">
                  {/* Строго выводим текст, который прислал его компонент */}
                  Zona: <span className="fw-bold" style={{color: "#333"}}>{z.color || "Ninguno"}</span>
                </div>

                {/* КООРДИНАТЫ (защищенные от падений) */}
                <div className="coords-box">
                  {z.coordpol && z.coordpol.map((c, index) => {
                    // Обычные точки для Зон
                    if (typeof c[0] === 'number') {
                      return (
                        <div key={index} style={{ marginBottom: "4px" }}>
                          <strong style={{color: "#1a73e8"}}>P{index + 1}:</strong> {c[0].toFixed(5)}, {c[1].toFixed(5)}
                        </div>
                      );
                    }
                    
                    // Массивы для Рут
                    if (Array.isArray(c[0])) {
                      return (
                        <div key={index} style={{ marginBottom: "8px" }}>
                          <strong style={{color: "#1a73e8"}}>Tramo {index + 1}:</strong>
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
            );
          })
        )}
      </div>
    </div>
  );
}