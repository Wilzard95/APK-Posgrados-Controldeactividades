import { useCallback, useEffect, useState } from "react";
import { loadProcesos, saveProcesos } from "../lib/db";
import type { Proceso } from "../types";

export function useProcesos() {
  const [data, setData] = useState<Proceso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [offline, setOffline] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    setOffline(false);
    try {
      const url = "https://wilzard95.github.io/APK-Posgrados-Controldeactividades/procesos.json?t=" + Date.now();
      const res = await fetch(url, {
        cache: 'no-cache', // Forzar recarga sin cache
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (!res.ok) throw new Error(res.statusText);
      const json: Proceso[] = await res.json();
      const now = new Date();
      setData(json);
      setLastSync(now);
      await saveProcesos(json, now);
    } catch (e: any) {
      setError(e.message);
      console.error('Error loading data:', e);
      const cache = await loadProcesos();
      setData(cache.data);
      setLastSync(cache.lastSync);
      setOffline(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, lastSync, offline, refresh };
}
