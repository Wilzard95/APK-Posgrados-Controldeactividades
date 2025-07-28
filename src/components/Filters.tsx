import React from "react";

interface Props {
  responsables: string[];
  estados: string[];
  facultades: string[];
  procedimientos: string[];
  selectedResponsable: string;
  selectedEstado: string;
  selectedFacultad: string;
  selectedProcedimiento: string;
  searchText: string;
  onResponsableChange: (value: string) => void;
  onEstadoChange: (value: string) => void;
  onFacultadChange: (value: string) => void;
  onProcedimientoChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
}

export function Filters({
  responsables,
  estados,
  facultades,
  procedimientos,
  selectedResponsable,
  selectedEstado,
  selectedFacultad,
  selectedProcedimiento,
  searchText,
  onResponsableChange,
  onEstadoChange,
  onFacultadChange,
  onProcedimientoChange,
  onSearchChange,
  onClearFilters,
}: Props) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: 16, 
          marginBottom: 12 
        }}
      >
        {/* Facultad */}
        <div>
          <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
            Facultad
          </label>
          <select
            value={selectedFacultad}
            onChange={(e) => onFacultadChange(e.target.value)}
            style={{ width: "100%" }}
          >
            <option value="">(Todas las facultades)</option>
            {facultades.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Procedimiento */}
        <div>
          <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
            Procedimiento
          </label>
          <select
            value={selectedProcedimiento}
            onChange={(e) => onProcedimientoChange(e.target.value)}
            style={{ width: "100%" }}
          >
            <option value="">(Todos los procedimientos)</option>
            {procedimientos.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Responsable */}
        <div>
          <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
            Responsable
          </label>
          <select
            value={selectedResponsable}
            onChange={(e) => onResponsableChange(e.target.value)}
            style={{ width: "100%" }}
          >
            <option value="">(Todos)</option>
            {responsables.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div>
          <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
            Estado
          </label>
          <select
            value={selectedEstado}
            onChange={(e) => onEstadoChange(e.target.value)}
            style={{ width: "100%" }}
          >
            <option value="">(Todos)</option>
            {estados.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Búsqueda */}
        <div>
          <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
            Búsqueda
          </label>
          <input
            type="text"
            placeholder="Buscar en programa u observaciones..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <button type="button" onClick={onClearFilters} style={{ marginTop: 8 }}>
        Limpiar filtros
      </button>
    </div>
  );
}
