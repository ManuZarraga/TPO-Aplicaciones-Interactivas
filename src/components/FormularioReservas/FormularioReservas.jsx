import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./FormularioReservas.css";

const localizer = momentLocalizer(moment);

export default function FormularioReservas() {
  const [formData, setFormData] = useState({
    nombreMedico: "",
    nombrePaciente: "",
    telefono: "",
    email: "",
    obraSocial: "",
  });

  const obrasSociales = ["OSDE", "Swiss Medical", "Galeno", "Medicus"];

  const [events] = useState([
    {
      title: "Consulta Dr. John Doe",
      start: new Date(2025, 9, 10, 12, 0),
      end: new Date(2025, 9, 10, 13, 0),
    },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
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
        <button type="submit" className="btn">
          Reservar Turno
        </button>
      </form>

      <div className="calendario">
        <h3>Calendario de citas</h3>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 400 }}
        />
      </div>
    </div>
  );
}
