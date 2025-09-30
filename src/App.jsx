import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/main/LandingPage";
import LoginPage from "./pages/login/LoginPage";
import AdminPanel from "./pages/AdminPanel/AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
