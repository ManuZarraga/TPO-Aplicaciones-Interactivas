import { useState, useEffect } from "react";
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

  const [obrasSociales, setObrasSociales] = useState([]);

  const [appointments, setAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState("Dr. John Gosling");

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/api/obras_sociales").then((r) => r.json()),
      fetch("http://localhost:3000/api/users/2")
        .then((r) => r.json())
        .catch(() => ({ name: "Dr. John Gosling" })),
    ])
      .then(([obrasData, userData]) => {
        const obras = obrasData || [];
        setObrasSociales(obras);
        if (userData && userData.name) setDoctorName(userData.name);

        return fetch("http://localhost:3000/api/turnos")
          .then((r) => r.json())
          .then((turnos) => {
            const mapped = (turnos || []).map((t) =>
              mapTurnoToAppointment(
                t,
                obras,
                (userData && userData.name) || "Dr. John Gosling"
              )
            );
            setAppointments(mapped);
          });
      })
      .catch((e) => console.warn("failed loading initial data", e));
  }, []);

  function mapTurnoToAppointment(
    t,
    obras = [],
    doctorNameFallback = "Dr. John Gosling"
  ) {
    function parseFechaHora(fecha, hora) {
      if (!fecha) return new Date();

      if (String(fecha).includes("T") || String(fecha).includes(" ")) {
        const dt = new Date(fecha);
        if (!isNaN(dt.getTime())) {
          if (!hora) return dt;
          const y = dt.getFullYear();
          const m = dt.getMonth() + 1;
          const d = dt.getDate();
          fecha = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(
            2,
            "0"
          )}`;
        }
      }

      const parts = String(fecha).split("-");
      if (parts.length !== 3) {
        const dt = new Date(fecha);
        if (!isNaN(dt.getTime())) return dt;
        return new Date();
      }

      const [y, m, d] = parts;
      let hh = 0,
        mm = 0,
        ss = 0;
      if (hora) {
        const match = String(hora).match(/^(\d{2}:\d{2}(?::\d{2})?)/);
        const timePart = match ? match[1] : String(hora);
        const tparts = timePart.split(":");
        hh = Number(tparts[0] || 0);
        mm = Number(tparts[1] || 0);
        ss = Number(tparts[2] || 0);
      }

      return new Date(Number(y), Number(m) - 1, Number(d), hh, mm, ss);
    }

    const start = parseFechaHora(t.fecha, t.hora);
    const obraObj =
      obras.find((o) => Number(o.id) === Number(t.obra_social_id)) || null;
    return {
      id: t.id,
      nombre: t.nombre_paciente || "",
      nombreMedico: t.nombre_medico || doctorNameFallback,
      fecha: start.toLocaleString("es-AR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
      obraSocial: obraObj
        ? obraObj.nombre
        : t.obra_social_nombre || t.obra_social_id,
      obraSocialId: t.obra_social_id,
      estado: t.estado,
      title: `Consulta ${t.nombre_paciente || ""}`,
      start,
      end: new Date(start.getTime() + 30 * 60 * 1000),
      email: t.email,
    };
  }

  // Obra Social
  const handleAddObraSocial = async (nuevaObraNombre) => {
    try {
      const res = await fetch("http://localhost:3000/api/obras_sociales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevaObraNombre }),
      });
      const created = await res.json();
      setObrasSociales((prev) => [...prev, created]);
      toast.success("Obra Social agregada correctamente");
    } catch (e) {
      console.error(e);
      toast.error("No se pudo agregar la obra social");
    }
  };

  const handleDeleteObraSocial = async (obraId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/obras_sociales/${obraId}`,
        { method: "DELETE" }
      );
      if (res.status === 204 || res.ok) {
        setObrasSociales((prev) => prev.filter((o) => o.id !== obraId));
        toast.success("Obra Social eliminada correctamente");
      } else {
        toast.error("No se pudo eliminar la obra social");
      }
    } catch (e) {
      console.error(e);
      toast.error("No se pudo eliminar la obra social");
    }
  };

  // Citas
  const handleAddAppointment = async (appointment) => {
    try {
      const payload = {
        nombre_paciente: appointment.nombre,
        telefono: appointment.telefono || "",
        email: appointment.email || "",
        obra_social_id:
          typeof appointment.obraSocial === "object"
            ? appointment.obraSocial.id
            : appointment.obraSocial,
        fecha: appointment.start.toISOString(),
        hora: appointment.start.toTimeString().slice(0, 5),
        estado: appointment.estado || "Reservado",
      };

      const res = await fetch("http://localhost:3000/api/turnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const created = await res.json();

      const mapped = mapTurnoToAppointment(created, obrasSociales, doctorName);

      try {
        const all = await fetch("http://localhost:3000/api/turnos");
        const allData = await all.json();
        const remapped = (allData || []).map((t) =>
          mapTurnoToAppointment(t, obrasSociales, doctorName)
        );
        setAppointments(remapped);
      } catch (e) {
        setAppointments((prev) => [...prev, mapped]);
      }

      toast.success("Turno reservado correctamente");
    } catch (e) {
      console.error(e);
      toast.error("No se pudo reservar el turno");
    }
  };

  const handleEditAppointment = async (id, newEstado) => {
    try {
      const res = await fetch(`http://localhost:3000/api/turnos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: newEstado }),
      });
      const updated = await res.json();

      const mapped = mapTurnoToAppointment(updated, obrasSociales, doctorName);

      setAppointments((prev) => prev.map((a) => (a.id === id ? mapped : a)));
      toast.success("Se modificó el estado del turno");
    } catch (e) {
      console.error(e);
      toast.error("No se pudo modificar el estado del turno");
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/turnos/${id}`, {
        method: "DELETE",
      });
      if (res.status === 204 || res.ok) {
        setAppointments((prev) => prev.filter((app) => app.id !== id));
        toast.success("Turno eliminado correctamente");
      } else {
        toast.error("No se pudo eliminar el turno");
      }
    } catch (e) {
      console.error(e);
      toast.error("No se pudo eliminar el turno");
    }
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
