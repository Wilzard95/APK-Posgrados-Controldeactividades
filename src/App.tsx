import React from 'react';
import { useEffect, useState } from 'react';

type Proceso = {
  programa: string;
  facultad: string;
  rrc_raa: string;
  procedimiento: string;
  modalidad: string;
  responsable: string;
  estado: string;
  observaciones: string;
};

export default function App() {
  const [data, setData] = useState<Proceso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = (import.meta.env.VITE_DATA_URL || '/procesos.json') + '?t=' + Date.now();
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      const json: Proceso[] = await res.json();
      setData(json);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

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
    </div>
  );
}
