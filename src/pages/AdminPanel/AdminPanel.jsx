/* eslint-disable react/prop-types */
import MisCitas from "../../components/MisCitas/MisCitas";
import "../../components/MisCitas/MisCitas.css";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";

export default function AdminPanel({
  appointments,
  onEditAppointment,
  onDeleteAppointment,
}) {
  const navigate = useNavigate();

  return (
    <div className="admin-panel-container">
      <button className="admin-logout-btn" onClick={() => navigate("/")}>
        Logout
      </button>
      <MisCitas
        citas={appointments}
        onEditAppointment={onEditAppointment}
        onDeleteAppointment={onDeleteAppointment}
      />
    </div>
  );
}
