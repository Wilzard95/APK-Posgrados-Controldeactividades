import { copyFile } from 'fs-extra';
import { exec } from 'child_process';

// Ruta del archivo Excel en OneDrive
const origen = 'C:/Users/Nitro/OneDrive - uptc.edu.co/BASE DE DATOS POSGRADOS/Seguimiento_Procesos en curso.xlsx';
// Ruta de destino en el proyecto
const destino = 'data/Seguimiento_Procesos en curso.xlsx';

async function copiarYConvertir() {
  try {
    // Copiar el archivo Excel
    await copyFile(origen, destino);
    console.log('Archivo copiado correctamente a la carpeta data.');
    // Ejecutar el script de conversión a JSON
    exec('node data/notepad\ scriptsconvert-xlsx.js "data/Seguimiento_Procesos en curso.xlsx" "docs/procesos.json"', (err, stdout, stderr) => {
      if (err) {
        console.error('Error al convertir a JSON:', stderr);
      } else {
        console.log(stdout);
      }
    });
  } catch (e) {
    console.error('Error al copiar el archivo:', e);
  }
}

copiarYConvertir(); 