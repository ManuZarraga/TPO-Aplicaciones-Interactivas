import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LandingPage from "./pages/main/LandingPage";
import LoginPage from "./pages/login/LoginPage";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

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
      fecha: "06-nov, 09:30",
      obraSocial: "OSDE",
      estado: "Cancelado",
      title: "Consulta Manuel Zarraga",
      start: new Date(2025, 10, 6, 9, 30),
      end: new Date(2025, 10, 6, 10, 0),
    },
    {
      id: 2,
      nombre: "Federico DiPasquasio",
      nombreMedico: "Dr. John Gosling",
      fecha: "08-nov, 12:00",
      obraSocial: "Swiss Medical",
      estado: "Solicitado",
      title: "Consulta Federico DiPasquasio",
      start: new Date(2025, 10, 8, 12, 0),
      end: new Date(2025, 10, 8, 13, 0),
    },
    {
      id: 3,
      nombre: "Cosme Fulanito",
      nombreMedico: "Dr. John Gosling",
      fecha: "27-nov, 15:00",
      obraSocial: "Galeno",
      estado: "Confirmado",
      title: "Consulta Cosme Fulanito",
      start: new Date(2025, 10, 27, 15, 0),
      end: new Date(2025, 10, 27, 16, 0),
    },
  ]);

  // Obra Social
  const handleAddObraSocial = (nuevaObra) => {
    if (!obrasSociales.includes(nuevaObra)) {
      setObrasSociales([...obrasSociales, nuevaObra]);
      toast.success("Obra Social agregada correctamente");
    }
  };

  const handleDeleteObraSocial = (obra) => {
    setObrasSociales(obrasSociales.filter((o) => o !== obra));
    toast.success("Obra Social eliminada correctamente");
  };

  // Citas
  const handleAddAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
    toast.success("Turno reservado correctamente");
    // send reservation email if appointment.email present (best-effort)
    if (appointment.email) {
      fetch("http://localhost:4001/api/email/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: appointment.email,
          nombre: appointment.nombre,
          fecha: appointment.fecha,
        }),
      }).catch((e) => console.warn("mail send failed", e));
    }
  };

  const handleEditAppointment = (id, newEstado) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, estado: newEstado } : app
      )
    );
    toast.success("Se modificó el estado del turno");

    // if appointment became Confirmado, send confirmation email
    if (newEstado === "Confirmado") {
      const appToConfirm = appointments.find((a) => a.id === id);
      if (appToConfirm && appToConfirm.email) {
        fetch("http://localhost:4001/api/email/confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: appToConfirm.email,
            nombre: appToConfirm.nombre,
            fecha: appToConfirm.fecha,
          }),
        }).catch((e) => console.warn("mail send failed", e));
      }
    }
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter((app) => app.id !== id));
    toast.success("Turno eliminado correctamente");
  };

  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                obrasSociales={obrasSociales}
                appointments={appointments}
                onAddAppointment={handleAddAppointment}
                onAddObraSocial={handleAddObraSocial}
                onDeleteObraSocial={handleDeleteObraSocial}
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
              />
            }
          />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <AdminPanel
                  appointments={appointments}
                  onEditAppointment={handleEditAppointment}
                  onDeleteAppointment={handleDeleteAppointment}
                  onLogout={handleLogout}
                  obrasSociales={obrasSociales}
                  onAddObraSocial={handleAddObraSocial}
                  onDeleteObraSocial={handleDeleteObraSocial}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName="custom-toast"
        />
      </>
    </Router>
  );
}

export default App;
