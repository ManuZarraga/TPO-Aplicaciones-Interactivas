# MedApp - Documentación

## 📌 Descripción General

**MedApp** es una aplicación web diseñada para la gestión de turnos médicos.  
Permite a los pacientes programar citas con un médico, seleccionar su Obra Social y visualizar sus turnos en un calendario.  
Los administradores pueden gestionar las citas, confirmarlas o eliminarlas, así como administrar la lista de Obras Sociales.

---

## ✨ Funcionalidades Principales

- **Reserva de turnos para pacientes**  
  Los pacientes pueden completar un formulario con su nombre, información de contacto, seleccionar una Obra Social y elegir la fecha y hora de su turno.

- **Gestión de Obras Sociales**  
  Los usuarios pueden agregar nuevas Obras Sociales o eliminar las existentes mediante un modal emergente.

- **Vista de Calendario**  
  Todos los turnos se muestran en un calendario para una fácil visualización.

- **Panel de Administración**  
  Los administradores pueden iniciar sesión, ver todos los turnos, confirmarlos o eliminarlos, y acceder a los detalles de cada cita.

- **Diseño Responsivo**  
  La aplicación es totalmente responsiva y funciona correctamente en dispositivos de escritorio y móviles.

- **Notificaciones (Toast)**  
  Se muestran mensajes de éxito y error mediante notificaciones emergentes al realizar acciones como agregar/eliminar Obras Sociales, reservar o eliminar turnos, e iniciar sesión.

---

## 📚 Librerías Utilizadas

- **React** → Framework principal para construir la interfaz de usuario.
- **react-router-dom** → Para la navegación y el enrutamiento del lado del cliente entre páginas (Landing, Login, Admin Panel).
- **react-big-calendar** → Para mostrar y gestionar los turnos en un calendario.
- **moment** → Para la manipulación de fechas y horarios (integrado con el calendario).
- **react-toastify** → Para mostrar notificaciones emergentes (mensajes de éxito/error).

---

## 🧩 Componentes

- **LandingPage** → Página principal donde se renderizan Sidebar y FormularioReservas junto sus funcionalidades.
- **Sidebar** → Barra lateral de navegación y acceso a la gestión de Obras Sociales.
- **FormularioReservas** → Formulario para que los pacientes reserven turnos.
- **Calendario** → Vista en calendario de todos los turnos.
- **MisCitas** → Lista de todos los turnos, con opciones para confirmar o eliminar (solo administradores).
- **FormularioObraSocial** → Modal emergente para agregar o eliminar Obras Sociales.
- **LoginPage** → Página de inicio de sesión para administradores con validación de credenciales.
- **AdminPanel** → Panel de control del administrador para gestionar todos los turnos.

---

## 🔄 Flujo de Uso

### 👤 Pacientes

- Agendar un nuevo turno completando el formulario y seleccionando una fecha/hora disponible.
- Agregar o eliminar su Obra Social desde el modal emergente.
- Visualizar todos sus turnos en el calendario.

### 👨‍⚕️ Administradores

- Iniciar sesión con sus credenciales.
- Visualizar todos los turnos en una lista.
- Confirmar o eliminar turnos.
- Recibir notificaciones emergentes para todas las acciones realizadas.
