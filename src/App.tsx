import React, { useState, useMemo } from "react";
import { useProcesos } from "./hooks/useProcesos";
import { LastSyncBanner } from "./components/LastSyncBanner";
import { Filters } from "./components/Filters";
import { ProcessList } from "./components/ProcessList";
import { ProcessModal } from "./components/ProcessModal";
import { exportProcesosToXLSX } from "./lib/export";
import type { Proceso } from "./types";

export default function App() {
  const { data, loading, error, lastSync, offline, refresh } = useProcesos();
  const [responsable, setResponsable] = useState("");
  const [estado, setEstado] = useState("");
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

  const filtered = useMemo(() => {
    const text = search.toLowerCase();
    return data.filter((p) => {
      const matchResp = !responsable || p.responsable === responsable;
      const matchEstado = !estado || p.estado === estado;
      const matchText =
        !text ||
        p.programa.toLowerCase().includes(text) ||
        p.observaciones.toLowerCase().includes(text);
      return matchResp && matchEstado && matchText;
    });
  }, [data, responsable, estado, search]);

  const clearFilters = () => {
    setResponsable("");
    setEstado("");
    setSearch("");
  };

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h1>Seguimiento Procesos</h1>

      {/* DEBUG INFO */}
      <div style={{ 
        background: '#f0f0f0', 
        padding: '10px', 
        marginBottom: '10px', 
        border: '1px solid #ccc',
        fontSize: '12px'
      }}>
        <strong>DEBUG INFO:</strong><br/>
        Loading: {loading.toString()}<br/>
        Error: {error || 'None'}<br/>
        Data length: {data.length}<br/>
        Offline: {offline.toString()}<br/>
        Last sync: {lastSync ? lastSync.toLocaleString() : 'Never'}<br/>
        <button onClick={() => console.log('Data:', data)}>Log Data to Console</button>
      </div>

      <button onClick={refresh} disabled={loading} style={{ marginBottom: 12 }}>
        {loading ? "Actualizando…" : "Refrescar"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <Filters
        responsables={responsables}
        estados={estados}
        selectedResponsable={responsable}
        selectedEstado={estado}
        searchText={search}
        onResponsableChange={setResponsable}
        onEstadoChange={setEstado}
        onSearchChange={setSearch}
        onClearFilters={clearFilters}
      />

      <p>
        Total registros: {filtered.length}{" "}
        <button
          type="button"
          onClick={() => exportProcesosToXLSX(filtered, "procesos_filtrados.xlsx")}
        >
          Exportar filtrado a Excel
        </button>
      </p>

      <ProcessList procesos={filtered} onSelect={setSelected} />
      <ProcessModal proceso={selected} onClose={() => setSelected(null)} />
      <LastSyncBanner lastSync={lastSync} offline={offline} />
    </div>
  );
}
