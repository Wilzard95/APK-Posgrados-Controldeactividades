import React from "react";
import type { Proceso } from "../types";

interface Props {
  proceso: Proceso | null;
  onClose: () => void;
}

export function ProcessModal({ proceso, onClose }: Props) {
  if (!proceso) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{ background: "#fff", padding: 16, maxWidth: 500 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{proceso.programa}</h2>
        <p>
          <b>Responsable:</b> {proceso.responsable}
        </p>
        <p>
          <b>Estado:</b> {proceso.estado}
        </p>
        <p>{proceso.observaciones}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
