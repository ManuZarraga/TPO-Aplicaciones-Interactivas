import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import BG from "../../assets/Dark Blue Background.png";
import AvatarMedico from "../../assets/Medico.jpg";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "gosling@medical.com" && password === "medical123") {
      navigate("/admin");
    } else {
      // Optionally show an error
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div
      className="login-bg"
      style={{
        backgroundImage: `url(${BG})`,
      }}
    >
      <div className="login-container">
        <img className="login-avatar" src={AvatarMedico} alt="Avatar" />
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Ingrese su email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn login-btn">
            Ingresar
          </button>
          <button
            type="button"
            className="btn back-btn"
            onClick={() => navigate("/")}
          >
            Volver al Inicio
          </button>
        </form>
      </div>
    </div>
  );
}
