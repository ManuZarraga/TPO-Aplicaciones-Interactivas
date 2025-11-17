/* eslint-disable react/prop-types */
import MisCitas from "../../components/MisCitas/MisCitas";
import "../../components/MisCitas/MisCitas.css";
import FormularioObraSocial from "../../components/FormularioObraSocial/FormularioObraSocial";
import "./AdminPanel.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminPanel({
  appointments,
  onEditAppointment,
  onDeleteAppointment,
  onLogout = () => {},
  obrasSociales = [],
  onAddObraSocial = () => {},
  onDeleteObraSocial = () => {},
}) {
  const navigate = useNavigate();
  const [showObrasPopup, setShowObrasPopup] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="admin-panel-container">
      <div className="admin-actions">
        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <button className="btn" onClick={() => setShowObrasPopup(true)}>
          Gestionar Obras Sociales
        </button>
      </div>

      {showObrasPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <FormularioObraSocial
              onClose={() => setShowObrasPopup(false)}
              onAddObraSocial={onAddObraSocial}
              obrasSociales={obrasSociales}
              onDeleteObraSocial={onDeleteObraSocial}
            />
          </div>
        </div>
      )}

      <MisCitas
        citas={appointments}
        onEditAppointment={onEditAppointment}
        onDeleteAppointment={onDeleteAppointment}
      />
    </div>
  );
}
