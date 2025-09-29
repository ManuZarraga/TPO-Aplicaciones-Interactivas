import BotonesAccion from "../BotonesAccion/BotonesAccion";

export default function MisCitas() {
  const citas = [
    {
      id: 1,
      nombre: "Manuel Zarraga",
      fecha: "5 Oct, 12:00hs",
      obraSocial: "OSDE",
      estado: "Solicitado",
    },
    {
      id: 2,
      nombre: "Federico DiPasquasio",
      fecha: "12 Oct, 15:00hs",
      obraSocial: "Swiss Medical",
      estado: "Confirmado",
    },
    {
      id: 3,
      nombre: "Cosme Fulanito",
      fecha: "20 Oct, 15:00hs",
      obraSocial: null,
      estado: "Cancelado",
    },
  ];

  return (
    <div className="mis-citas">
      <h2>Mis Citas</h2>
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
                <strong>Estado:</strong>
                <span className={`estado ${cita.estado.toLowerCase()}`}>
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
