/* eslint-disable react/prop-types */
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./FormularioReservas.css";
import { toast } from "react-toastify";

const localizer = momentLocalizer(moment);

export default function FormularioReservas({
  obrasSociales = [],
  appointments = [],
  onAddAppointment,
}) {
  const [formData, setFormData] = useState({
    nombreMedico: "",
    nombrePaciente: "",
    telefono: "",
    email: "",
    obraSocial: "",
    fechaTurno: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function getMinDate() {
    const today = new Date();
    today.setSeconds(0, 0);
    return today.toISOString().slice(0, 16);
  }

  function getMaxDate() {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 14);
    maxDate.setHours(17, 0, 0, 0);
    return maxDate.toISOString().slice(0, 16);
  }

  function getMinDateTime() {
    const today = new Date();
    today.setHours(9, 0, 0, 0);
    return today.toISOString().slice(0, 16);
  }

  function getMaxDateTime() {
    const today = new Date();
    today.setHours(17, 0, 0, 0);
    return today.toISOString().slice(0, 16);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedDate = new Date(formData.fechaTurno);
    const now = new Date();
    now.setSeconds(0, 0);

    if (selectedDate < now) {
      toast.error("No se puede reservar un turno en una fecha pasada.");
      return;
    }

    const overlap = appointments.some(
      (appt) => new Date(appt.start).getTime() === selectedDate.getTime()
    );

    if (overlap) {
      toast.error("Ya existe un turno reservado para esa fecha y hora.");
      return;
    }

    const hour = selectedDate.getHours();
    if (hour < 9 || hour >= 17) {
      toast.error("El turno debe ser entre las 09:00 y las 17:00.");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      nombre: formData.nombrePaciente,
      nombreMedico: formData.nombreMedico,
      fecha: new Date(formData.fechaTurno).toLocaleString("es-AR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
      obraSocial: formData.obraSocial,
      estado: "Solicitado",
      title: `Consulta ${formData.nombrePaciente}`,
      start: new Date(formData.fechaTurno),
      end: new Date(new Date(formData.fechaTurno).getTime() + 30 * 60000),
    };
    onAddAppointment(newAppointment);
    setFormData({
      nombreMedico: "",
      nombrePaciente: "",
      telefono: "",
      email: "",
      obraSocial: "",
      fechaTurno: "",
    });
  };

  const eventPropGetter = (event) => {
    let backgroundColor = "#339af0";

    if (event.estado === "Solicitado") {
      backgroundColor = "#ffe066";
      return {
        style: {
          backgroundColor,
          color: "#856404",
          borderRadius: "8px",
          border: "none",
          fontWeight: 600,
        },
      };
    }
    if (event.estado === "Confirmado") {
      backgroundColor = "#d3f9d8";
      return {
        style: {
          backgroundColor,
          color: "#2b8a3e",
          borderRadius: "8px",
          border: "none",
          fontWeight: 600,
        },
      };
    }
    if (event.estado === "Cancelado") {
      backgroundColor = "#ffa8a8";
      return {
        style: {
          backgroundColor,
          color: "#842029",
          borderRadius: "8px",
          border: "none",
          fontWeight: 600,
        },
      };
    }
    return {
      style: {
        backgroundColor,
        color: "#fff",
        borderRadius: "8px",
        border: "none",
        fontWeight: 600,
      },
    };
  };

  return (
    <div className="formulario">
      <h2>Reservar una Cita</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Nombre y Apellido del Médico</label>
          <input
            type="text"
            name="nombreMedico"
            value={formData.nombreMedico}
            onChange={handleChange}
            placeholder="Ej: Dr. John Doe"
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre y Apellido del Paciente</label>
          <input
            type="text"
            name="nombrePaciente"
            value={formData.nombrePaciente}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez"
            required
          />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Ej: +54 11 1234 5678"
            required
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ej: paciente@email.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Obra Social</label>
          <select
            name="obraSocial"
            value={formData.obraSocial}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una opción</option>
            {obrasSociales.map((obra, idx) => (
              <option key={idx} value={obra}>
                {obra}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Fecha y Hora del Turno</label>
          <input
            type="datetime-local"
            name="fechaTurno"
            value={formData.fechaTurno || ""}
            onChange={handleChange}
            required
            min={getMinDate()}
            max={getMaxDate()}
          />
        </div>
        <button type="submit" className="btn">
          Reservar Turno
        </button>
      </form>

      <div className="calendario">
        <h3>Calendario de citas</h3>
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 400 }}
          eventPropGetter={eventPropGetter}
          min={getMinDateTime()}
          max={getMaxDateTime()}
        />
      </div>
    </div>
  );
}
