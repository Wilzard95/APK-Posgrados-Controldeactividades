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
export async function obtenerProcesos() {
  const shareLink = import.meta.env.VITE_EXCEL_SHARE_LINK;
  const encoded = Buffer.from(shareLink, "utf8").toString("base64");
  const url = `/shares/${encoded}/driveItem/workbook/tables('tblProcesos')/range('A1:H')`;
  // Implementar llamada a Microsoft Graph con token Files.Read
  // y procesar el rango devuelto.
  throw new Error("Not implemented");
}
