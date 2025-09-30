import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import FormularioReservas from "../../components/FormularioReservas/FormularioReservas";
import InfoMedico from "../../components/InfoMedico/InfoMedico";
import "../../App.css";

export default function LandingPage() {
  const [obrasSociales, setObrasSociales] = useState([
    "OSDE",
    "Swiss Medical",
    "Galeno",
    "Medicus",
  ]);

  const handleAddObraSocial = (nuevaObra) => {
    if (!obrasSociales.includes(nuevaObra)) {
      setObrasSociales([...obrasSociales, nuevaObra]);
    }
  };

  return (
    <div className="app-container">
      <Sidebar onAddObraSocial={handleAddObraSocial} />
      <main className="main-content">
        <section className="info-section">
          <InfoMedico />
        </section>
        <section className="citas-section">
          <FormularioReservas obrasSociales={obrasSociales} />
        </section>
      </main>
    </div>
  );
}
