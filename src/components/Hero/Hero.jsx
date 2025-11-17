import "./Hero.css";
import HeroBg from "../../assets/Medico.jpg";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${HeroBg})` }} />
      <div className="hero-content container">
        <h1>Bienvenido al Consultorio del Dr. John Gosling</h1>
        <p>Atención cardiológica profesional y cercana. Reserva tu turno fácilmente.</p>
        <a className="btn hero-cta" href="#reservas">Reservar Turno</a>
      </div>
    </section>
  );
}
