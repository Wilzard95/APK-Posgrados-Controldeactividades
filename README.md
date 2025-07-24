# APK-Posgrados-Controldeactividades

Aplicación web para registrar y hacer seguimiento de las actividades del equipo
de posgrados. Los datos provienen de un archivo de Excel hospedado en OneDrive
al que se accede mediante Microsoft Graph.

## Requisitos
- Node.js 18 o superior.
- Cuenta institucional UPTC con permiso `Files.Read` sobre el archivo.

## Configuración
1. Copie `.env.example` a `.env` y complete:
   - `VITE_CLIENT_ID` y `VITE_TENANT_ID` obtenidos al registrar la aplicación
     en Azure AD.
   - `VITE_EXCEL_SHARE_LINK` con el enlace de solo lectura al Excel
     proporcionado (por ejemplo:
     `https://uptceduco-my.sharepoint.com/:x:/g/personal/posg_aseguramientocalidad_uptc_edu_co/EbL0IprlT3lLiQTLLdmgafABr0AEQjxUJRhDg6mGOgQJEg`).
2. Nunca suba el archivo `.env` al repositorio.

## Instalación
```bash
npm install
```

### Comandos útiles
- `npm run dev` – servidor de desarrollo con Vite.
- `npm run build` – genera la aplicación en `dist`.
- `npm run preview` – previa de producción.
- `npm run format` – formatea el código con Prettier.

## Estructura
```
├─ docs/              Documentación adicional
├─ src/               Código fuente de la aplicación
│  └─ services/       Acceso a Microsoft Graph
├─ .github/workflows/ CI/CD opcional para GitHub Pages
```

## Uso de la aplicación
1. Inicie el servidor de desarrollo con `npm run dev` y abra el enlace que
   aparece en la terminal.
2. Autentíquese con su cuenta UPTC para obtener el token `Files.Read`.
3. La app leerá la tabla `tblProcesos` del Excel indicado por
   `VITE_EXCEL_SHARE_LINK`.

### Modo offline
La aplicación guarda la última lista de procesos en IndexedDB cada vez
que se pulsa **Refrescar**. Si al intentar obtener el JSON ocurre un
error de red, se cargan esos datos cacheados y se indica "offline" en la
parte inferior de la pantalla junto con la fecha de la última
sincronización.

### Filtros y búsqueda
La barra de filtros permite filtrar por **Responsable**, **Estado** y un
campo de texto libre que busca coincidencias en *programa* u
*observaciones*. Puede combinarse de la siguiente forma:

- Seleccionar solo un Estado muestra todos los responsables con ese
  estado.
- Seleccionar solo un Responsable filtra por esa persona.
- Al escribir texto se filtra adicionalmente por coincidencia.
El botón **Limpiar filtros** restablece todo a `(Todos)`.

## Deploy
La aplicación se publica automáticamente en GitHub Pages después de cada push a
`main`. Puede consultarse en:

<https://Wilzard95.github.io/APK-Posgrados-Controldeactividades/>

Para volver a desplegar manualmente solo ejecute un push a la rama `main` o
dispare el workflow **Deploy** desde la pestaña *Actions*. El workflow instala
las dependencias, ejecuta `npm run build` y actualiza la rama `gh-pages` con el
contenido de `dist/`.

## Troubleshooting
- **No aparece la información**: verifique que el link de Excel esté correcto y
  que su usuario tenga permisos.
- **Error de autenticación**: asegúrese de haber registrado bien la aplicación
  y de incluir los IDs en el `.env`.

## Licencia (MIT)
Este proyecto se distribuye bajo la [Licencia MIT](LICENSE).
