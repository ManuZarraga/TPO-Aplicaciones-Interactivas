import InfoMedico from "../../components/InfoMedico/InfoMedico";
import MisCitas from "../../components/MisCitas/MisCitas";
import Calendario from "../../components/Calendario/Calendario";
import Sidebar from "../../components/Sidebar/Sidebar";
import FormularioReservas from "../../components/FormularioReservas/FormularioReservas";
import "../../App.css";

export default function LandingPage() {
  return (
    <div className="app-container">
      <Sidebar />
      {/* mobile pasando los 600px REVISAR */}
      <main className="main-content">
        <section className="info-section">
          <InfoMedico />
        </section>
        <section className="citas-section">
          {/* <MisCitas /> */}
          <FormularioReservas />
        </section>
        {/* <section className="calendario-section">
          <Calendario />
        </section> */}
      </main>
    </div>
  );
}
