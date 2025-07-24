import { utils, writeFile, type WorkBook } from 'xlsx';
import type { Proceso } from '../types';

export function exportProcesosToXLSX(data: Proceso[], filename = 'procesos.xlsx') {
  const ws = utils.json_to_sheet(data);
  const wb: WorkBook = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Procesos');
  writeFile(wb, filename);
}
