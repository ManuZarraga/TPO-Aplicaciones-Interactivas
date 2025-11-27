/* eslint-disable react/prop-types */
import "./BotonesAccion.css";

export default function BotonesAccion({
  estado,
  onEdit = () => {},
  onDelete = () => {},
  onFinalize = () => {},
}) {
  const st = String(estado || "").toLowerCase();

  // Rules:
  // - Reservado: ✅ (confirm) + 🗑️ (delete)
  // - Confirmado: 🏁 (finalize) + 🗑️ (cancel/delete)
  // - Finalizado: 🗑️ (delete only)
  // - Fallback: show a neutral icon that triggers onEdit and a delete button

  if (st === "reservado") {
    return (
      <div className="acciones">
        <button className="btn small" title="Confirmar turno" onClick={onEdit}>
          ✅
        </button>
        <button className="btn small" title="Eliminar" onClick={onDelete}>
          🗑️
        </button>
      </div>
    );
  }

  if (st === "confirmado") {
    return (
      <div className="acciones">
        <button
          className="btn small"
          title="Finalizar turno"
          onClick={onFinalize}
        >
          🏁
        </button>
        <button className="btn small" title="Cancelar turno" onClick={onDelete}>
          🗑️
        </button>
      </div>
    );
  }

  if (st === "finalizado") {
    return (
      <div className="acciones">
        <button className="btn small" title="Eliminar" onClick={onDelete}>
          🗑️
        </button>
      </div>
    );
  }

  // fallback for other states (eg. Solicitado)
  return (
    <div className="acciones">
      <button className="btn small" title="Cambiar estado" onClick={onEdit}>
        ⏳
      </button>
      <button className="btn small" title="Eliminar" onClick={onDelete}>
        🗑️
      </button>
    </div>
  );
}
