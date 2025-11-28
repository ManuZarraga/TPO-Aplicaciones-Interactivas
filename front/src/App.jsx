/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/main/LandingPage";
import LoginPage from "./pages/login/LoginPage";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import "react-toastify/dist/ReactToastify.css";

import { mapTurnoToAppointment } from "./utils/appointments";
import { createObrasSocialesHandlers } from "./handlers/obrasSocialesHandlers";
import { createAppointmentsHandlers } from "./handlers/appointmentsHandlers";

const API_BASE = "http://localhost:3000/api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [obrasSociales, setObrasSociales] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState("Dr. John Gosling");

  const handleLogin = (userData, token) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setIsAuthenticated(true);
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/obras_sociales`).then((r) => r.json()),
      fetch(`${API_BASE}/users/2`)
        .then((r) => r.json())
        .catch(() => ({ name: "Dr. John Gosling" })),
    ])
      .then(([obrasData, userData]) => {
        const obras = obrasData || [];
        setObrasSociales(obras);
        if (userData && userData.name) setDoctorName(userData.name);

        return fetch(`${API_BASE}/turnos`)
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

  const { handleAddObraSocial, handleDeleteObraSocial } =
    createObrasSocialesHandlers({ setObrasSociales });

  const {
    handleAddAppointment,
    handleEditAppointment,
    handleDeleteAppointment,
  } = createAppointmentsHandlers({
    obrasSociales,
    doctorName,
    setAppointments,
  });

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
