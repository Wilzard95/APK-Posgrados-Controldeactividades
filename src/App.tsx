import React, { useState, useMemo } from "react";
import { useProcesos } from "./hooks/useProcesos";
import { Filters } from "./components/Filters";
import { ProcessList } from "./components/ProcessList";
import { ProcessModal } from "./components/ProcessModal";
import { exportProcesosToXLSX } from "./lib/export";
import type { Proceso } from "./types";

export default function App() {
  const { data, loading, error, refresh } = useProcesos();
  const [responsable, setResponsable] = useState("");
  const [estado, setEstado] = useState("");
  const [facultad, setFacultad] = useState("");
  const [procedimiento, setProcedimiento] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Proceso | null>(null);

  const responsables = useMemo(
    () => Array.from(new Set(data.map((p) => p.responsable))).sort(),
    [data],
  );
  const estados = useMemo(
    () => Array.from(new Set(data.map((p) => p.estado))).sort(),
    [data],
  );
  const facultades = useMemo(
    () => Array.from(new Set(data.map((p) => p.facultad))).sort(),
    [data],
  );
  const procedimientos = useMemo(
    () => Array.from(new Set(data.map((p) => p.procedimiento))).sort(),
    [data],
  );

  const filtered = useMemo(() => {
    const text = search.toLowerCase();
    return data.filter((p) => {
      const matchResp = !responsable || p.responsable === responsable;
      const matchEstado = !estado || p.estado === estado;
      const matchFacultad = !facultad || p.facultad === facultad;
      const matchProcedimiento =
        !procedimiento || p.procedimiento === procedimiento;
      const matchText =
        !text ||
        p.programa.toLowerCase().includes(text) ||
        p.observaciones.toLowerCase().includes(text);
      return (
        matchResp &&
        matchEstado &&
        matchFacultad &&
        matchProcedimiento &&
        matchText
      );
    });
  }, [data, responsable, estado, facultad, procedimiento, search]);

  const clearFilters = () => {
    setResponsable("");
    setEstado("");
    setFacultad("");
    setProcedimiento("");
    setSearch("");
  };

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h1>Seguimiento Procesos</h1>

      <button onClick={refresh} disabled={loading} style={{ marginBottom: 12 }}>
        {loading ? "Actualizando…" : "Refrescar"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <Filters
        responsables={responsables}
        estados={estados}
        facultades={facultades}
        procedimientos={procedimientos}
        selectedResponsable={responsable}
        selectedEstado={estado}
        selectedFacultad={facultad}
        selectedProcedimiento={procedimiento}
        searchText={search}
        onResponsableChange={setResponsable}
        onEstadoChange={setEstado}
        onFacultadChange={setFacultad}
        onProcedimientoChange={setProcedimiento}
        onSearchChange={setSearch}
        onClearFilters={clearFilters}
      />

      <p>
        Total registros: {filtered.length}{" "}
        <button
          type="button"
          onClick={() =>
            exportProcesosToXLSX(filtered, "procesos_filtrados.xlsx")
          }
        >
          Exportar filtrado a Excel
        </button>
      </p>

      <ProcessList procesos={filtered} onSelect={setSelected} />
      <ProcessModal proceso={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
