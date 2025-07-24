// scripts/convert-xlsx.js  (CommonJS, hoja fija: "BaseDatos")
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");

// --- CONFIG ---
const SHEET_NAME = "BaseDatos";     // <- cámbialo aquí si algún día cambia
const OUTPUT = "public/procesos.json";
// ----------------

const [, , inputPathArg] = process.argv;

if (!inputPathArg) {
  console.error('Uso: node scripts/convert-xlsx.js "data/Seguimiento_Procesos en curso.xlsx"');
  process.exit(1);
}

const inputPath = path.resolve(inputPathArg);
const outPath = path.resolve(OUTPUT);

// 1. Leer el workbook
const wb = xlsx.readFile(inputPath, { cellDates: true });

// 2. Seleccionar hoja
const ws = wb.Sheets[SHEET_NAME];
if (!ws) {
  console.error(`No existe la hoja "${SHEET_NAME}". Hojas disponibles:`, wb.SheetNames);
  process.exit(1);
}

// 3. Convertir a matriz (todas las filas)
const rows = xlsx.utils.sheet_to_json(ws, { header: 1, defval: "", blankrows: false });

// 4. Detectar fila de cabecera (donde está "Programa académico")
const headerRowIndex = rows.findIndex(r =>
  (r[0] || "").toString().toLowerCase().includes("programa")
);
if (headerRowIndex === -1) {
  console.error('No se encontró la fila de cabecera (columna A con "Programa..."). Revisa la hoja.');
  process.exit(1);
}

const dataRows = rows.slice(headerRowIndex + 1);

// 5. Mapear SOLO columnas A–H (0–7)
const mapped = dataRows
  .filter(r => r.some(c => c !== "")) // descarta filas totalmente vacías
  .map(r => ({
    programa:      r[0] ?? "",
    facultad:      r[1] ?? "",
    rrc_raa:       r[2] ?? "",
    procedimiento: r[3] ?? "",
    modalidad:     r[4] ?? "",
    responsable:   r[5] ?? "",
    estado:        r[6] ?? "",
    observaciones: r[7] ?? ""
  }));

// 6. Guardar JSON
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(mapped, null, 2), "utf8");

console.log(`OK -> ${outPath} (${mapped.length} registros)`);



