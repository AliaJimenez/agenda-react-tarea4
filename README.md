# Agenda de contactos (React)

Tarea 4 de Programación Web (PWEB). Aplicación hecha con React y Vite que consulta y agrega contactos usando un servicio remoto de agenda.

## Funcionalidades

- Lista los contactos guardados (`GET`).
- Agrega un contacto nuevo con nombre, apellido y teléfono (`POST`).
- Botón para actualizar el listado, con estados de carga, error y lista vacía.

## Servicio utilizado

`http://www.raydelto.org/agenda.php`

La URL está en `src/config.js`. Como el servicio usa `http`, algunos navegadores pueden bloquear las peticiones si la app se sirve desde `https`.

## Estructura

```
src/
├── App.jsx                         # Estado de la agenda y carga de contactos
├── config.js                       # URL del servicio
├── main.jsx                        # Punto de entrada
├── styles.css
└── components/
    ├── FormularioContacto.jsx      # Formulario para agregar contactos
    └── ListaContactos.jsx          # Listado de contactos
```

## Cómo ejecutarlo

Requiere [Node.js](https://nodejs.org/) instalado.

```bash
npm install
npm run dev
```

Luego abre la dirección que muestra la terminal (normalmente `http://localhost:5173`).

Para generar la versión de producción:

```bash
npm run build
npm run preview
```
