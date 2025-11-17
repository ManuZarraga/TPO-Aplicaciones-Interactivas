import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>© {new Date().getFullYear()} Dr. John Gosling - Todos los derechos reservados</div>
        <div className="small">Hecho con ❤️ · Política de privacidad</div>
      </div>
    </footer>
  );
}
