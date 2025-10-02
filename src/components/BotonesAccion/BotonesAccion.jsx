import "./BotonesAccion.css";

// eslint-disable-next-line react/prop-types
export default function BotonesAccion({ estado, onEdit, onDelete }) {
  return (
    <div className="acciones">
      <button className="btn small" title="Cambiar estado" onClick={onEdit}>
        {estado === "Solicitado" ? "✅" : "⏳"}
      </button>
      <button className="btn small" title="Eliminar" onClick={onDelete}>
        🗑️
      </button>
    </div>
  );
}
