/* eslint-disable react/prop-types */
import { useState } from "react";
import "./FormularioObraSocial.css";

export default function FormularioObraSocial({
  onClose,
  onAddObraSocial,
  obrasSociales,
  onDeleteObraSocial,
}) {
  const [nombreObraSocial, setNombreObraSocial] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombreObraSocial.trim()) {
      onAddObraSocial(nombreObraSocial.trim());
      setNombreObraSocial("");
    }
  };

  return (
    <div className="formulario-obra-social-popup">
      <button className="close-popup" onClick={onClose} aria-label="Cerrar">
        ✖
      </button>
      <div className="formulario">
        <h2>Obras Sociales</h2>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>Agregar Obra Social</label>
            <input
              type="text"
              value={nombreObraSocial}
              onChange={(e) => setNombreObraSocial(e.target.value)}
              placeholder="Ej: Swiss Medical"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn">
              Agregar
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>

        <h3>Eliminar Obra Social</h3>

        <div className="obra-social-list-wrapper">
          <ul className="obra-social-list">
            {obrasSociales.map((obra) => (
              <li key={obra.id} className="obra-social-item">
                {obra.nombre}
                <button
                  className="delete-obra-btn"
                  onClick={() => onDeleteObraSocial(obra.id)}
                  title={`Eliminar ${obra.nombre}`}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
