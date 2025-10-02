import MisCitas from "../../components/MisCitas/MisCitas";
import "../../components/MisCitas/MisCitas.css";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";

// eslint-disable-next-line react/prop-types
export default function AdminPanel({ appointments }) {
  const navigate = useNavigate();

  return (
    <div className="admin-panel-container">
      <button className="admin-logout-btn" onClick={() => navigate("/")}>
        Logout
      </button>
      <MisCitas citas={appointments} />
    </div>
  );
}
