import React from "react";

const placeholderRoute = {
  id: 0,
  color: "rojo",
  coordpol: [
    [40.416775, -3.70379],
    [40.4175, -3.7045],
    [40.4181, -3.7052],
  ],
};

export default function RutasCard({ zones, dangerColor }) {
  const routesToRender =
    !zones || zones.length === 0 ? [placeholderRoute] : zones;

  return (
    <div className="rutas-list">
      {routesToRender.map((route) => {
        const dotColorClass =
          dangerColor && dangerColor[route.color]
            ? dangerColor[route.color]
            : "bg-secondary";

        return (
          <div key={route.id} className="zone-item">
            <div className="item-header">
              <div className="item-title-group">
                <div className={`color-dot ${dotColorClass}`}></div>
                <h4 className="item-title">{`Ruta ${route.id + 1}`}</h4>
              </div>
            </div>

            <div className="coords-box">
              {route.coordpol &&
                route.coordpol.map((c, index) => {
                  if (typeof c[0] === "number") {
                    return (
                      <div key={index} style={{ marginBottom: "4px" }}>
                        <strong style={{ color: "#1a73e8" }}>
                          P{index + 1}:
                        </strong>{" "}
                        {c[0].toFixed(5)}, {c[1].toFixed(5)}
                      </div>
                    );
                  }

                  if (Array.isArray(c[0])) {
                    return (
                      <div key={index} style={{ marginBottom: "8px" }}>
                        <strong style={{ color: "#1a73e8" }}>
                          Tramo {index + 1}:
                        </strong>
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

            <div className="route-badges">
              <span className="badge accessibility-badge">Ascensor</span>
              <span className="badge accessibility-badge">Rampa</span>
              <span className="badge accessibility-badge">Escaleras</span>
              <span className="badge accessibility-badge">Baño accesible</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

