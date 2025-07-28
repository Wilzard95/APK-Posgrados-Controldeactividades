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
    <div
      style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}
    >
      <select
        value={selectedResponsable}
        onChange={(e) => onResponsableChange(e.target.value)}
      >
        <option value="">(Todos)</option>
        {responsables.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <select
        value={selectedEstado}
        onChange={(e) => onEstadoChange(e.target.value)}
      >
        <option value="">(Todos)</option>
        {estados.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={selectedFacultad}
        onChange={(e) => onFacultadChange(e.target.value)}
      >
        <option value="">(Todas las facultades)</option>
        {facultades.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>

      <select
        value={selectedProcedimiento}
        onChange={(e) => onProcedimientoChange(e.target.value)}
      >
        <option value="">(Todos los procedimientos)</option>
        {procedimientos.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Buscar..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <button type="button" onClick={onClearFilters}>
        Limpiar filtros
      </button>
    </div>
  );
}
