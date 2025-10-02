import BotonesAccion from "../BotonesAccion/BotonesAccion";
import "./MisCitas.css";

// eslint-disable-next-line react/prop-types
export default function MisCitas({ citas = [] }) {
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
            <BotonesAccion />
          </div>
        ))}
      </div>
    </div>
  );
}
