import React from "react";

interface Props {
  responsables: string[];
  estados: string[];
  selectedResponsable: string;
  selectedEstado: string;
  searchText: string;
  onResponsableChange: (value: string) => void;
  onEstadoChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
}

export function Filters({
  responsables,
  estados,
  selectedResponsable,
  selectedEstado,
  searchText,
  onResponsableChange,
  onEstadoChange,
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
