import { get, set } from "idb-keyval";
import type { Proceso } from "../types";

const KEY_PROCESOS = "procesos";
const KEY_LAST_SYNC = "lastSync";

export async function saveProcesos(data: Proceso[], date: Date) {
  await Promise.all([set(KEY_PROCESOS, data), set(KEY_LAST_SYNC, date)]);
}

export async function loadProcesos(): Promise<{
  data: Proceso[];
  lastSync: Date | null;
}> {
  const [data, last] = await Promise.all([
    get<Proceso[]>(KEY_PROCESOS),
    get<Date>(KEY_LAST_SYNC),
  ]);
  return { data: data || [], lastSync: last || null };
}
