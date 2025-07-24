import React from 'react';
import { useProcesos } from './hooks/useProcesos';
import { LastSyncBanner } from './components/LastSyncBanner';

export default function App() {
  const { data, loading, error, lastSync, offline, refresh } = useProcesos();

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h1>Seguimiento Procesos</h1>

      <button onClick={refresh} disabled={loading} style={{ marginBottom: 12 }}>
        {loading ? 'Actualizando…' : 'Refrescar'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <p>Total registros: {data.length}</p>

      <ul style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        {data.map((p, i) => (
          <li key={i}>
            <b>{p.programa}</b> — {p.estado} / {p.procedimiento} — {p.responsable}
          </li>
        ))}
      </ul>
      <LastSyncBanner lastSync={lastSync} offline={offline} />
    </div>
  );
}
