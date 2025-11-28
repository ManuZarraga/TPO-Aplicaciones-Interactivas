import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import BG from "../../assets/Dark Blue Background.png";
import AvatarMedico from "../../assets/Medico.jpg";
import { useState } from "react";
import { toast } from "react-toastify";

const API_BASE = "http://localhost:3000/api";

// eslint-disable-next-line react/prop-types
export default function LoginPage({ onLogin = () => {} }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        toast.error(errorBody.error || "Credenciales inválidas");
        return;
      }

      const data = await res.json();
      toast.success("Inicio de sesión exitoso");

      onLogin(data.user, data.token);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      toast.error("Error al conectar con el servidor");
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
