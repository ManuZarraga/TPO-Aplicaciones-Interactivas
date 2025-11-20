import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function Header({ isAuthenticated = false }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner container">
        <div className="brand">
          <Link to="/">Consultorio Médico</Link>
        </div>

        <nav className={`nav ${open ? "open" : ""}`} aria-expanded={open}>
          <a className="navLink" href="#about" onClick={() => setOpen(false)}>
            Nosotros
          </a>
          <a
            className="navLink"
            href="#services"
            onClick={() => setOpen(false)}
          >
            Servicios
          </a>
          <a
            className="navLink"
            href="#reservas"
            onClick={() => setOpen(false)}
          >
            Reservas
          </a>
          <a className="navLink" href="#contact" onClick={() => setOpen(false)}>
            Contacto
          </a>
          <Link
            to={isAuthenticated ? "/admin" : "/login"}
            className="admin-btn"
            onClick={() => setOpen(false)}
          >
            {isAuthenticated ? "Admin Panel" : "Acceder"}
          </Link>
          {/* logout handled inside AdminPanel; header only links to login/admin */}
        </nav>

        <button
          className={`burger ${open ? "open" : ""}`}
          onClick={() => setOpen((s) => !s)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
