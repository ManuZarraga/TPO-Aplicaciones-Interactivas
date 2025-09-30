import { useState } from "react";
import "./FormularioObraSocial.css";

// eslint-disable-next-line react/prop-types
export default function FormularioObraSocial({ onClose, onAddObraSocial }) {
  const [formData, setFormData] = useState({
    nombreObraSocial: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nombreObraSocial.trim()) {
      onAddObraSocial(formData.nombreObraSocial.trim());
      setFormData({ nombreObraSocial: "" });
      onClose();
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="formulario-obra-social-popup">
      <button className="close-popup" onClick={onClose} aria-label="Cerrar">
        ✖
      </button>
      <div className="formulario">
        <h2>Crear Obra Social</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>Nombre de la Obra Social</label>
            <input
              type="text"
              name="nombreObraSocial"
              value={formData.nombreObraSocial}
              onChange={handleChange}
              placeholder="Ej: Swiss Medical"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn">
              Crear
            </button>
            <button type="button" className="btn" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
