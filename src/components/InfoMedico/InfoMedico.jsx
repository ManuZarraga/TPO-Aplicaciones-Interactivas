import AvatarMedico from "../../assets/Medico.jpg";
import "./InfoMedico.css";

export default function InfoMedico() {
  return (
    <div className="info-medico two-column">
      <div className="info-text">
        <h3>Dr. John Gosling</h3>
        <p className="role">Cardiólogo</p>
        <p>
          El Dr. John Gosling es especialista en cardiología con más de 15 años
          de experiencia en diagnóstico y tratamiento de enfermedades del
          corazón. Brinda atención personalizada y tratamientos basados en las
          últimas evidencias científicas.
        </p>
        <p className="credentials">Universidad de Buenos Aires</p>
        <p className="address">Consultorio en Av. Siempre Viva 123</p>
      </div>
      <div className="info-image">
        <img src={AvatarMedico} alt="Avatar médico" />
      </div>
    </div>
  );
}
