export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>MedApp</h2>
      </div>
      <div className="sidebar-buttons">
        <button className="btn">Agendar Turno</button>
        <button className="btn">Crear Obra Social</button>
      </div>
      <div className="logout">
        <button className="btn logout-btn">Logout</button>
      </div>
    </aside>
  );
}
