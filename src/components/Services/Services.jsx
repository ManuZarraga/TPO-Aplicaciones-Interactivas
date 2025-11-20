import DoctorBag from "../../assets/doctor-bag-svgrepo-com.svg";
import "./Services.css";

const services = [
  {
    id: 1,
    title: "Chequeo Cardiológico",
    desc: "Evaluación completa del estado cardíaco y seguimiento.",
  },
  {
    id: 2,
    title: "Electrocardiograma",
    desc: "ECG de reposo y de esfuerzo con interpretación profesional.",
  },
  {
    id: 3,
    title: "Ecocardiograma",
    desc: "Estudio ecográfico para valorar estructura y función cardíaca.",
  },
];

export default function Services() {
  return (
    <div className="services">
      <div className="services-header">
        <img src={DoctorBag} alt="servicios" className="services-icon" />
        <h2>Servicios</h2>
      </div>
      <div className="cards">
        {services.map((s) => (
          <div key={s.id} className="card">
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
