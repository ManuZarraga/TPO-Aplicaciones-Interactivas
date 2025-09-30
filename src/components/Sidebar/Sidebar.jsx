import { useState } from "react";
import "./Sidebar.css";
import FormularioObraSocial from "../FormularioObraSocial/FormularioObraSocial";

// eslint-disable-next-line react/prop-types
export default function Sidebar({ onAddObraSocial }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpen = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);

  return (
    <>
      <aside className="sidebar">
        <div className="logo">
          <h2>MedApp</h2>
        </div>
        <div className="sidebar-buttons">
          <button className="btn" onClick={handleOpen}>
            Crear Obra Social
          </button>
          <button className="btn">Admin Panel Médico</button>
        </div>
      </aside>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <FormularioObraSocial
              onClose={handleClose}
              onAddObraSocial={onAddObraSocial}
            />
          </div>
        </div>
      )}
    </>
  );
}
