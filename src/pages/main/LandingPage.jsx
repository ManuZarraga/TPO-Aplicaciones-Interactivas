/* eslint-disable react/prop-types */
import Sidebar from "../../components/Sidebar/Sidebar";
import FormularioReservas from "../../components/FormularioReservas/FormularioReservas";
import InfoMedico from "../../components/InfoMedico/InfoMedico";
import "../../App.css";

export default function LandingPage({
  obrasSociales,
  appointments,
  onAddAppointment,
  onAddObraSocial,
}) {
  return (
    <div className="app-container">
      <Sidebar onAddObraSocial={onAddObraSocial} />
      <main className="main-content">
        <section className="info-section">
          <InfoMedico />
        </section>
        <section className="citas-section">
          <FormularioReservas
            obrasSociales={obrasSociales}
            appointments={appointments}
            onAddAppointment={onAddAppointment}
          />
        </section>
      </main>
    </div>
  );
}
