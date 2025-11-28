/* eslint-disable react/prop-types */
import { useState } from "react";
import "./FormularioObraSocial.css";

export default function FormularioObraSocial({
  onClose,
  onAddObraSocial,
  obrasSociales,
  onDeleteObraSocial,
  onEditObraSocial,
}) {
  const [nombreObraSocial, setNombreObraSocial] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombreObraSocial.trim()) {
      if (editingId) {
        onEditObraSocial(editingId, nombreObraSocial.trim());
        setEditingId(null);
      } else {
        onAddObraSocial(nombreObraSocial.trim());
      }
      setNombreObraSocial("");
    }
  };

  const startEdit = (obra) => {
    setEditingId(obra.id);
    setNombreObraSocial(obra.nombre || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNombreObraSocial("");
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
            <label>
              {editingId ? "Modificar Obra Social" : "Agregar Obra Social"}
            </label>
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
              {editingId ? "Guardar" : "Agregar"}
            </button>
            <button
              type="button"
              className="btn"
              onClick={editingId ? cancelEdit : onClose}
            >
              {editingId ? "Cancelar" : "Cancelar"}
            </button>
          </div>
        </form>

        <h3>Eliminar Obra Social</h3>

        <div className="obra-social-list-wrapper">
          <ul className="obra-social-list">
            {obrasSociales.map((obra) => (
              <li key={obra.id} className="obra-social-item">
                {obra.nombre}
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button
                    className="delete-obra-btn"
                    onClick={() => startEdit(obra)}
                    title={`Editar ${obra.nombre}`}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-obra-btn"
                    onClick={() => onDeleteObraSocial(obra.id)}
                    title={`Eliminar ${obra.nombre}`}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
