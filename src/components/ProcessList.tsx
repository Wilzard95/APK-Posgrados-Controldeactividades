import React from "react";
import type { Proceso } from "../types";

interface Props {
  procesos: Proceso[];
  onSelect?: (proceso: Proceso) => void;
}

export function ProcessList({ procesos, onSelect }: Props) {
  return (
    <ul style={{ maxHeight: "60vh", overflowY: "auto" }}>
      {procesos.map((p, i) => (
        <li
          key={i}
          onClick={() => onSelect?.(p)}
          style={{ cursor: onSelect ? "pointer" : "default" }}
        >
          <b>{p.programa}</b> — {p.estado} / {p.procedimiento} — {p.responsable}
        </li>
      ))}
    </ul>
  );
}
