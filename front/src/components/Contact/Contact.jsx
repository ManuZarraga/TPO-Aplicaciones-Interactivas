import ContactIcon from "../../assets/contact-phone-communication-svgrepo-com.svg";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-card">
      <div className="contact-header">
        <img src={ContactIcon} alt="contacto" className="contact-icon" />
        <h2>Contacto</h2>
      </div>

      <p className="contact-intro">
        Para consultas, turnos y más información, puedes comunicarte por
        teléfono, mail, o visitarnos en nuestro consultorio. Nuestro equipo
        responderá a la brevedad.
      </p>

      <ul className="contact-list">
        <li>
          <span className="li-icon">🏥</span>
          <span>Consultorio: Av. Siempre Viva 123, Ciudad</span>
        </li>
        <li>
          <span className="li-icon">📞</span>
          <span>Teléfono: +54 11 1234 5678</span>
        </li>
        <li>
          <span className="li-icon">✉️</span>
          <span>Email: contacto@drgosling.com</span>
        </li>
      </ul>
    </div>
  );
}
