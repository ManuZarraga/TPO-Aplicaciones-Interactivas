/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment/min/moment-with-locales";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarCheck from "../../assets/calendar-check-svgrepo-com.svg";
import "./FormularioReservas.css";
import { toast } from "react-toastify";

moment.locale("es");
const localizer = momentLocalizer(moment);

const MOBILE_BREAKPOINT = 768;

const messages = {
  allDay: "Todo el día",
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "Sin eventos en este rango.",
  showMore: (total) => `+${total} de más`,
};

const mobileViews = ["day", "agenda"];
const desktopViews = ["month", "day"];

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const HOURS = Array.from({ length: 9 }, (_, i) => 9 + i);

function getMinDateOnly() {
  const today = new Date();
  return today.toISOString().slice(0, 10); // yyyy-MM-dd
}

function getMaxDateOnly() {
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 14);
  return maxDate.toISOString().slice(0, 10); // yyyy-MM-dd
}

function getMinDateTime() {
  const today = new Date();
  today.setHours(9, 0, 0, 0);
  return today;
}

function getMaxDateTime() {
  const today = new Date();
  today.setHours(17, 59, 59, 999);
  return today;
}

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
    fechaTurnoFecha: "",
  });

  const [selectedHour, setSelectedHour] = useState("");

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.innerWidth < MOBILE_BREAKPOINT
      : false
  );

  const [currentView, setCurrentView] = useState("month");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeViews = isMobile ? mobileViews : desktopViews;
  const defaultView = isMobile ? "day" : "month";

  const safeView = activeViews.includes(currentView)
    ? currentView
    : defaultView;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "fechaTurnoFecha") {
      setSelectedHour("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fechaTurnoFecha } = formData;
    const fecha = fechaTurnoFecha;
    const hora = selectedHour;

    if (!fecha || !hora) {
      toast.error("Debe seleccionar una fecha y una hora disponible.");
      return;
    }

    const selectedDate = new Date(`${fecha}T${hora}`);
    const now = new Date();
    now.setSeconds(0, 0);

    if (selectedDate < now) {
      toast.error("No se puede reservar un turno en una fecha pasada.");
      return;
    }

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 14);
    maxDate.setHours(23, 59, 59, 999);

    if (selectedDate > maxDate) {
      toast.error("El turno debe estar dentro de los próximos 14 días.");
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
      fecha: selectedDate.toLocaleString("es-AR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
      obraSocial: formData.obraSocial,
      estado: "Solicitado",
      title: `Consulta ${formData.nombrePaciente}`,
      start: selectedDate,
      end: new Date(selectedDate.getTime() + 30 * 60 * 1000),
    };

    onAddAppointment(newAppointment);

    setFormData({
      nombreMedico: "",
      nombrePaciente: "",
      telefono: "",
      email: "",
      obraSocial: "",
      fechaTurnoFecha: "",
    });
    setSelectedHour("");
  };

  const eventPropGetter = (event) => {
    let backgroundColor = "#339af0";
    let color = "#fff";

    if (event.estado === "Solicitado") {
      backgroundColor = "#ffe066";
      color = "#856404";
    } else if (event.estado === "Confirmado") {
      backgroundColor = "#d3f9d8";
      color = "#2b8a3e";
    } else if (event.estado === "Cancelado") {
      backgroundColor = "#ffa8a8";
      color = "#842029";
    }

    return {
      style: {
        backgroundColor,
        color,
        borderRadius: "8px",
        border: "none",
        fontWeight: 600,
      },
    };
  };

  const hourBadges = formData.fechaTurnoFecha
    ? HOURS.map((h) => {
        const hourStr = h.toString().padStart(2, "0") + ":00";
        const dateTimeStr = `${formData.fechaTurnoFecha}T${hourStr}`;
        const targetDate = new Date(dateTimeStr);

        const isTaken = appointments.some((appt) => {
          const apptDate = new Date(appt.start);
          return (
            apptDate.getFullYear() === targetDate.getFullYear() &&
            apptDate.getMonth() === targetDate.getMonth() &&
            apptDate.getDate() === targetDate.getDate() &&
            apptDate.getHours() === h
          );
        });

        const isSelected = selectedHour === hourStr;

        return (
          <button
            type="button"
            key={hourStr}
            className={`hour-badge${isTaken ? " taken" : ""}${
              isSelected ? " selected" : ""
            }`}
            disabled={isTaken}
            onClick={() => setSelectedHour(hourStr)}
          >
            {hourStr}
          </button>
        );
      })
    : null;

  return (
    <div className="formulario">
      <div className="form-header">
        <img src={CalendarCheck} alt="calendario" className="form-icon" />
        <h2>Reservar una Cita</h2>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        {/* <div className="form-group">
          <label>Nombre y Apellido del Médico</label>
          <input
            type="text"
            name="nombreMedico"
            value={formData.nombreMedico}
            onChange={handleChange}
            placeholder="Ej: Dr. John Doe"
            required
          />
        </div> */}

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
          <label>Fecha del Turno</label>
          <input
            type="date"
            name="fechaTurnoFecha"
            value={formData.fechaTurnoFecha}
            onChange={handleChange}
            required
            min={getMinDateOnly()}
            max={getMaxDateOnly()}
          />
        </div>

        {formData.fechaTurnoFecha && (
          <div className="form-group">
            <label>Hora del Turno</label>
            <div className="hour-badges-row">{hourBadges}</div>
          </div>
        )}

        <button type="submit" className="btn">
          Reservar Turno
        </button>
      </form>

      <div className="calendario">
        <h3>Calendario de citas</h3>
        <Calendar
          localizer={localizer}
          culture="es"
          messages={messages}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          view={safeView}
          onView={setCurrentView}
          views={activeViews}
          popup
          className="rbc-calendar-custom"
          style={{ height: 400 }}
          eventPropGetter={eventPropGetter}
          min={getMinDateTime()}
          max={getMaxDateTime()}
          formats={{
            weekdayFormat: (date, culture, loc) =>
              capitalize(loc.format(date, "ddd", culture)),
            monthHeaderFormat: (date, culture, loc) =>
              capitalize(loc.format(date, "MMMM · YYYY", culture)),
          }}
        />
      </div>
    </div>
  );
}
