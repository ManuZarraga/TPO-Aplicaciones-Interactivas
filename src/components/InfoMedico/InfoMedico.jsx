import AvatarMedico from "../../assets/Medico.jpg";

export default function InfoMedico() {
  return (
    <div className="info-medico">
      <div className="avatar">
        <img src={AvatarMedico} alt="Avatar médico" />
      </div>
      <h3>Dr. John Doe</h3>
      <p>Cardiólogo</p>
      <p>Universidad de Buenos Aires</p>
      <p>Consultorio en Av. Siempre Viva 123</p>
    </div>
  );
}
