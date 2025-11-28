# TPO Cardiología - Documentación

## 📌 Descripción General

El proyecto consiste es una aplicación web para la gestión de turnos médicos (frontend + backend). Permite a pacientes reservar citas, seleccionar obra social y ver sus turnos en un calendario; los administradores pueden ver todas las citas, confirmarlas, finalizarlas o eliminarlas.

Esta documentación resume el funcionamiento general, las librerías principales, cómo ejecutar el proyecto en desarrollo y dónde encontrar la colección de Postman y archivos útiles para Docker/Sequelize.

---

## 🚀 Tecnologías y librerías principales

- Frontend

  - React, Vite
  - react-router-dom (enrutamiento)
  - react-big-calendar (calendario de turnos)
  - moment (localización y formatos de fecha)
  - react-toastify (notificaciones / loaders)

- Backend
  - Node.js + Express (TypeScript)
  - Sequelize (ORM) con conexión a PostgreSQL
  - Nodemailer (configurable vía variables de entorno para envío de emails)

---

## 🏗 Estructura general del proyecto

- `/front` → frontend React (Vite). Contiene los componentes, páginas y handlers para llamadas a la API.
- `/back` → backend en TypeScript con Express + Sequelize. Contiene modelos, controladores, servicios y configuración.
- `CARDIOLOGÍA TPO.postman_collection.json` → colección Postman incluida en el repositorio (exportada desde Postman).

---

## ⚙️ Configuración y ejecución (desarrollo)

Requisitos previos

### 🔑 Variables de entorno rápidas para pruebas

Después de clonar el proyecto, puedes crear rápidamente los archivos de variables de entorno para backend y frontend usando los siguientes ejemplos:

**Backend (`back/.env`)**

```ini
# Base de Datos (Postgres)
PORT=3000
ENV=LOCAL
DATABASE_URL=postgres://postgres:123@localhost:5432/tp-cardiologia

# Mailer (Nodemailer)
MAIL_USER=drjohngosling@gmail.com
MAIL_PASS=hbjvzqcsqxveznfu

# Auth
JWT_SECRET=supersecretkey
ADMIN_PASSWORD=medical123
```

Puede copiar y pegar estos bloques en un archivo`.env` en la carpeta mencionada.

Frontend (desarrollo)

1. Abrir una terminal y moverse a la carpeta `front`:

```bash
cd front
npm install
npm run dev
```

El frontend por defecto corre en `http://localhost:5173` o el puerto que Vite asigne.

Backend (desarrollo)

1. Copiar el archivo de ejemplo de variables de entorno en `back`:

```bash
cd back
npm install
npm run dev
```

Por defecto el backend corre en `http://localhost:3000` y expone los endpoints bajo `/api`.

## 🗄 Base de datos y Sequelize

- El backend usa Sequelize como ORM. Los modelos principales están en `back/src/models/` (`users.model.ts`, `turnos.model.ts`, `obras_sociales.model.ts`, etc.).
- Archivo de configuración de Sequelize: `back/.sequelizerc` y `back/src/models/sequelize.ts`.
- `back/schema/schema.sql` contiene el esquema base para inicializar la base de datos si prefieres correr scripts manualmente.

---

## 🐳 Docker

Hay un `docker-compose.yml` en la carpeta `back` pensado para facilitar el despliegue local (servicio de base de datos, y el backend). Para usarlo:

```bash
cd back
docker-compose up --build
```

Esto levantará la base de datos y el backend según la configuración definida. Para ver los servicios y puerto expuestos, revisar `back/docker-compose.yml`.

---

## 📡 API - Endpoints principales

Los endpoints más usados por el frontend son:

- `GET /api/obras_sociales` → listar obras sociales
- `GET /api/obras_sociales/:id` → obtener informacion de una obra social
- `POST /api/obras_sociales` → crear obra social
- `DELETE /api/obras_sociales/:id` → eliminar obra social
- `GET /api/turnos` → listar turnos
- `GET /api/turnos/:id` → obtener informacion de un turno
- `POST /api/turnos` → crear turno
- `PUT /api/turnos/:id` → actualizar turno (cambiar `estado`)
- `DELETE /api/turnos/:id` → eliminar turno
- `GET /api/users/:id` → obtener información de usuario

Para más detalle, las rutas completas se encuentran en `back/src/routes/`.

---

## 📬 Envío de emails

- La configuración para envío de emails está en `back/src/config/mailer.ts` y utiliza `nodemailer` con credenciales definidas por variables de entorno (`MAIL_USER`, `MAIL_PASS`).
- El backend puede enviar emails al crear/confirmar/cancelar turnos; Durante este proceso, las llamadas a la API pueden tardar mientras se realiza el envío de correo.

---

## 📁 Postman

- La colección Postman exportada se incluye en el repo: `CARDIOLOGÍA TPO.postman_collection.json`.

Para probar los endpoints, importa la colección en Postman y levanta el backend. Para ver las tablas en tiempo real, se debe levantar la imagen de docker y establecer la conexion con una base PostgreSQL.

---

## 🔐 Autenticación y Autorización (JWT)

El sistema de autenticación permite que solo el médico y su secretaria accedan al Panel Administrativo.
El backend valida credenciales, genera tokens JWT y protege rutas; el frontend mantiene la sesión activa usando localStorage.

### 🧩 Flujo de autenticación (frontend)

Login desde /login

El frontend envía email y contraseña al backend:

POST /api/auth/login

Si las credenciales son válidas, el backend devuelve:

{
"token": "<jwt_token>",
"user": {
"id": 1,
"email": "secretaria@example.com",
"name": "Secretaria",
"role": "admin"
}
}

Al iniciar la app, el frontend revisa si existe un token guardado:

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

if (token && user) {
setIsAuthenticated(true);
}

El frontend guarda token y user en localStorage para mantener la sesión.
De esta forma, el usuario no necesita volver a loguearse después de recargar la página.

### 🧩 Generación de JWT (backend)

En back/src/services/authentication.service.ts se genera el token:

jwt.sign(payload, SECRET_KEY, { expiresIn: '8h' });

Los emails autorizados como administradores se definen en:

const ALLOWED_ADMIN_EMAILS = [
'secretaria@example.com',
'drjohngosling@mail.com'
];

### 🧩 Middleware de protección

Las rutas administrativas usan un middleware (authMiddleware) que valida el encabezado:

Authorization: Bearer <token>

Si el token falta o es inválido, la API responde con 401 (no autorizado).

En el backend, las operaciones administrativas se protegen con authMiddleware:

router.post('/', authMiddleware, obrasSocialesController.createObraSocial);
router.delete('/:id', authMiddleware, obrasSocialesController.deleteObraSocial)

---

## 🧪 Pruebas y comprobaciones rápidas

- Asegúrate de que PostgreSQL está accesible y que `DATABASE_URL` en `back/.env` apunta a una base creada.
- Inicia backend, luego frontend y prueba reservar un turno desde la UI. Observa los toasts y que las llamadas a `/api/turnos` devuelvan el turno creado.

---

## 📌 Notas finales y contribución

- Este repositorio contiene código tanto del frontend como del backend; al hacer cambios en uno u otro, prueba el flujo completo (reserva → confirmación) para verificar el envío de emails y la persistencia en la DB.
