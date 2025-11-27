import DoctorBag from "../../assets/doctor-bag-svgrepo-com.svg";
import HeartIcon from "../../assets/heart-illustration-1-svgrepo-com.svg";
import Electrocardio from "../../assets/electrocardiogram-svgrepo-com.svg";
import Chequeo from "../../assets/stethoscope-svgrepo-com.svg";
import "./Services.css";

const services = [
  {
    id: 1,
    title: "Chequeo Cardiológico",
    desc: "Evaluación completa del estado cardíaco y seguimiento.",
    iconSrc: Chequeo,
    iconAlt: "Chequeo cardiológico",
  },
  {
    id: 2,
    title: "Electrocardiograma",
    desc: "ECG de reposo y de esfuerzo con interpretación profesional.",
    iconSrc: Electrocardio,
    iconAlt: "Electrocardiograma",
  },
  {
    id: 3,
    title: "Ecocardiograma",
    desc: "Estudio ecográfico para valorar estructura y función cardíaca.",
    iconSrc: HeartIcon,
    iconAlt: "Ecocardiograma",
  },
];

export default function Services() {
  return (
    <section className="services">
      <header className="services-header">
        <img src={DoctorBag} alt="servicios" className="services-icon" />
        <h2>Servicios</h2>
      </header>

      <div className="services-cards">
        {services.map((s) => (
          <article key={s.id} className="service-card">
            <div className="service-card-icon-wrapper">
              <img
                src={s.iconSrc}
                alt={s.iconAlt}
                className="service-card-icon"
              />
            </div>
            <h4 className="service-card-title">{s.title}</h4>
            <p className="service-card-desc">{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
