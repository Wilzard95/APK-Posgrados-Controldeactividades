import React, { useMemo, useState } from "react";
import type { Proceso } from "../types";

interface Props {
  procesos: Proceso[];
  onSelect?: (proceso: Proceso) => void;
}

function getEstadoColor(estado: string) {
  const e = estado.toLowerCase();
  if (e.includes("completado")) return "#2ecc71"; // verde
  if (e.includes("pendiente")) return "#f1c40f"; // amarillo
  if (e.includes("devuelto") || e.includes("desist")) return "#e74c3c"; // rojo
  return "#3498db"; // azul por defecto
}

export function ProcessList({ procesos, onSelect }: Props) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const groups = useMemo(() => {
    const map = new Map<string, Proceso[]>();
    procesos.forEach((p) => {
      if (!map.has(p.responsable)) map.set(p.responsable, []);
      map.get(p.responsable)!.push(p);
    });
    return Array.from(map.entries()).sort((a, b) =>
      a[0].localeCompare(b[0]),
    );
  }, [procesos]);

  const toggle = (r: string) =>
    setCollapsed((c) => ({ ...c, [r]: !c[r] }));

  return (
    <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
      {groups.map(([resp, items]) => (
        <div key={resp} style={{ marginBottom: 8 }}>
          <h3
            onClick={() => toggle(resp)}
            style={{ cursor: "pointer", userSelect: "none", margin: 0 }}
          >
            {collapsed[resp] ? "▶" : "▼"} {resp} ({items.length})
          </h3>
          {!collapsed[resp] && (
            <ul style={{ marginTop: 4 }}>
              {items.map((p, i) => (
                <li
                  key={i}
                  onClick={() => onSelect?.(p)}
                  style={{ cursor: onSelect ? "pointer" : "default" }}
                >
                  <b>{p.programa}</b> —
                  <span
                    style={{
                      background: getEstadoColor(p.estado),
                      color: "#fff",
                      borderRadius: 4,
                      padding: "0 4px",
                      margin: "0 4px",
                      fontSize: 12,
                    }}
                  >
                    {p.estado}
                  </span>
                  / {p.procedimiento}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
