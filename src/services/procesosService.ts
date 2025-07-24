/**
 * Servicio de procesos
 *
 * Endpoint Graph utilizado:
 *   /shares/{encoded}/driveItem/workbook/tables('tblProcesos')/range('A1:H')
 *
 * Donde {encoded} es el enlace al Excel compartido codificado de acuerdo con
 * https://learn.microsoft.com/graph/api/shares-get?view=graph-rest-1.0&tabs=http
 *
 * Las columnas A-H se mapean de la siguiente forma:
 *   A: id proceso
 *   B: nombre
 *   C: responsable
 *   D: fecha inicio
 *   E: fecha fin
 *   F: estado
 *   G: comentarios
 *   H: ultima actualizacion
 *
 * El resultado se almacena en cache sobreescribiendo cualquier valor previo
 * para asegurar consistencia con el archivo de Excel.
 */
import type { Proceso } from "../types";

export async function obtenerProcesos(token: string): Promise<Proceso[]> {
  const shareLink = import.meta.env.VITE_EXCEL_SHARE_LINK;
  const encoded = Buffer.from(shareLink, "utf8").toString("base64");
  const url =
    `https://graph.microsoft.com/v1.0/shares/${encoded}` +
    "/driveItem/workbook/tables('tblProcesos')/range('A1:H')";

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = (await res.json()) as { values?: any[][] };
  const values = json.values || [];

  return values
    .slice(1) // skip header row
    .filter((r) => r.some((c) => c !== null && c !== ""))
    .map((r) => ({
      programa: r[0] ?? "",
      facultad: r[1] ?? "",
      rrc_raa: r[2] ?? "",
      procedimiento: r[3] ?? "",
      modalidad: r[4] ?? "",
      responsable: r[5] ?? "",
      estado: r[6] ?? "",
      observaciones: r[7] ?? "",
    }));
}
