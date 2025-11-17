/* eslint-disable react/prop-types */
import "../../App.css";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import InfoMedico from "../../components/InfoMedico/InfoMedico";
import Services from "../../components/Services/Services";
import FormularioReservas from "../../components/FormularioReservas/FormularioReservas";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";

export default function LandingPage({ obrasSociales, appointments, onAddAppointment, isAuthenticated, onLogout }) {
  return (
    <div className="app-container">
      <Header isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <Hero />

      <main className="main-content">
        <section id="about" className="section container">
          <InfoMedico />
        </section>

        <section id="services" className="section container">
          <Services />
        </section>

        <section id="reservas" className="section container">
          <FormularioReservas
            obrasSociales={obrasSociales}
            appointments={appointments}
            onAddAppointment={onAddAppointment}
          />
        </section>

        <section id="contact" className="section container">
          <Contact />
        </section>

        <Footer />
      </main>
    </div>
  );
}
