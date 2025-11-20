import AvatarMedico from "../../assets/Medico.jpg";
import ClinicIcon from "../../assets/heart-care-svgrepo-com.svg";
import "./InfoMedico.css";

export default function InfoMedico() {
  return (
    <div className="info-medico">
      <div className="info-text">
        <div className="info-header">
          <img src={ClinicIcon} alt="ícono" className="clinic-icon" />
          <div className="title-wrap">
            <h3>Dr. John Gosling</h3>
            <p className="role">Cardiólogo Clínico</p>
          </div>
        </div>

        <p>
          El Dr. John Gosling es cardiólogo clínico con más de 15 años de
          experiencia en diagnóstico y tratamiento integral de enfermedades
          cardiovasculares. Especialista en hipertensión arterial, prevención
          del riesgo coronario y seguimiento de pacientes con arritmias. Ofrece
          estudios como electrocardiograma, ecocardiograma Doppler y pruebas
          ergométricas.
        </p>
      </div>

      <div className="info-image">
        <img src={AvatarMedico} alt="Avatar médico" />
      </div>

      <ul className="info-list">
        <li>
          <span className="li-icon">📄</span>
          <span>M.N.: 12345 — M.P.: 67890</span>
        </li>
        <li>
          <span className="li-icon">🎓</span>
          <span>Universidad de Buenos Aires</span>
        </li>
        <li>
          <span className="li-icon">🏥</span>
          <span>Consultorio en Av. Siempre Viva 123</span>
        </li>
        <li>
          <span className="li-icon">⏰</span>
          <span>Lunes a Viernes, 9:00 a 17:00</span>
        </li>
        <li>
          <span className="li-icon">📞</span>
          <span>(11) 1234-5678</span>
        </li>
        <li>
          <span className="li-icon">🌐</span>
          <span>Atención presencial y telemedicina</span>
        </li>
      </ul>
    </div>
  );
}
