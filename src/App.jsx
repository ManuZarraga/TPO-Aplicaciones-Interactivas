import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/main/LandingPage";
import LoginPage from "./pages/login/LoginPage";
import AdminPanel from "./pages/AdminPanel/AdminPanel";

function App() {
  const [obrasSociales, setObrasSociales] = useState([
    "OSDE",
    "Swiss Medical",
    "Galeno",
    "Medicus",
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      nombre: "Manuel Zarraga",
      nombreMedico: "Dr. John Gosling",
      fecha: "06-oct, 09:30",
      obraSocial: "OSDE",
      estado: "Solicitado",
      title: "Consulta Manuel Zarraga",
      start: new Date(2025, 9, 6, 9, 30),
      end: new Date(2025, 9, 6, 10, 0),
    },
    {
      id: 2,
      nombre: "Federico DiPasquasio",
      nombreMedico: "Dr. John Gosling",
      fecha: "08-oct, 12:00",
      obraSocial: "Swiss Medical",
      estado: "Solicitado",
      title: "Consulta Federico DiPasquasio",
      start: new Date(2025, 9, 8, 12, 0),
      end: new Date(2025, 9, 8, 13, 0),
    },
    {
      id: 3,
      nombre: "Cosme Fulanito",
      nombreMedico: "Dr. John Gosling",
      fecha: "20-oct, 15:00",
      obraSocial: "Galeno",
      estado: "Solicitado",
      title: "Consulta Cosme Fulanito",
      start: new Date(2025, 9, 20, 15, 0),
      end: new Date(2025, 9, 20, 16, 0),
    },
  ]);

  const handleAddAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const handleAddObraSocial = (nuevaObra) => {
    if (!obrasSociales.includes(nuevaObra)) {
      setObrasSociales([...obrasSociales, nuevaObra]);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              obrasSociales={obrasSociales}
              appointments={appointments}
              onAddAppointment={handleAddAppointment}
              onAddObraSocial={handleAddObraSocial}
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={<AdminPanel appointments={appointments} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
