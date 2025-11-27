/* eslint-disable react/prop-types */
import { useState } from "react";
import BotonesAccion from "../BotonesAccion/BotonesAccion";
import "./MisCitas.css";

export default function MisCitas({
  citas = [],
  onEditAppointment,
  onDeleteAppointment,
}) {
  const [deletePopup, setDeletePopup] = useState({ open: false, cita: null });
  const [confirmPopup, setConfirmPopup] = useState({ open: false, cita: null });
  const [finalizePopup, setFinalizePopup] = useState({
    open: false,
    cita: null,
  });

  return (
    <div className="mis-citas">
      <h1>Citas Agendadas</h1>
      <div className="citas-list">
        {citas.map((cita) => (
          <div key={cita.id} className="cita-card">
            <div className="cita-info">
              <p>
                <strong>Nombre:</strong> {cita.nombre}
              </p>
              <p>
                <strong>Email:</strong> {cita.email || "N/A"}
              </p>
              <p>
                <strong>Fecha/Hora:</strong> {cita.fecha}
              </p>
              <p>
                <strong>Obra Social:</strong> {cita.obraSocial || "N/A"}
              </p>
              <p>
                <strong>Médico:</strong> {cita.nombreMedico || "N/A"}
              </p>
              <p>
                <strong>Estado:</strong>
                <span className={`estado ${cita.estado?.toLowerCase()}`}>
                  {cita.estado}
                </span>
              </p>
            </div>
            <BotonesAccion
              estado={cita.estado}
              onEdit={() => setConfirmPopup({ open: true, cita })}
              onDelete={() => setDeletePopup({ open: true, cita })}
              onFinalize={() => setFinalizePopup({ open: true, cita })}
            />
          </div>
        ))}
      </div>
      {deletePopup.open && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>
              ¿Está seguro que desea eliminar la cita de{" "}
              <b>{deletePopup.cita.nombre}</b> el día{" "}
              <b>{deletePopup.cita.fecha}</b>?
            </p>
            <div className="btn-group">
              <button
                className="btn"
                onClick={() => {
                  onDeleteAppointment(deletePopup.cita.id);
                  setDeletePopup({ open: false, cita: null });
                }}
              >
                Sí, eliminar
              </button>
              <button
                className="btn"
                onClick={() => setDeletePopup({ open: false, cita: null })}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {confirmPopup.open && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>
              ¿Desea confirmar el turno de <b>{confirmPopup.cita.nombre}</b> el
              día <b>{confirmPopup.cita.fecha}</b>?
            </p>
            <div className="btn-group">
              <button
                className="btn"
                onClick={() => {
                  onEditAppointment(confirmPopup.cita.id, "Confirmado");
                  setConfirmPopup({ open: false, cita: null });
                }}
              >
                Sí, confirmar
              </button>
              <button
                className="btn"
                onClick={() => setConfirmPopup({ open: false, cita: null })}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {finalizePopup.open && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>
              ¿Desea marcar como <b>Finalizado</b> el turno de{" "}
              <b>{finalizePopup.cita.nombre}</b> el día{" "}
              <b>{finalizePopup.cita.fecha}</b>?
            </p>
            <div className="btn-group">
              <button
                className="btn"
                onClick={() => {
                  onEditAppointment(finalizePopup.cita.id, "Finalizado");
                  setFinalizePopup({ open: false, cita: null });
                }}
              >
                Sí, finalizar
              </button>
              <button
                className="btn"
                onClick={() => setFinalizePopup({ open: false, cita: null })}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
