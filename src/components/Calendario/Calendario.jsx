import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendario.css";

const localizer = momentLocalizer(moment);

export default function Calendario() {
  const [events] = useState([
    {
      title: "Consulta Manuel Zarraga",
      start: new Date(2025, 9, 6, 9, 30), // está zero-based (month 9)
      end: new Date(2025, 9, 6, 10, 30),
    },
    {
      title: "Consulta Federico DiPasquasio",
      start: new Date(2025, 9, 8, 12, 0),
      end: new Date(2025, 9, 8, 13, 0),
    },
    {
      title: "Consulta Cosme Fulanito",
      start: new Date(2025, 9, 20, 15, 0),
      end: new Date(2025, 9, 20, 16, 0),
    },
  ]);

  return (
    <div className="calendario">
      <h2>Calendario de citas</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400 }}
      />
    </div>
  );
}
