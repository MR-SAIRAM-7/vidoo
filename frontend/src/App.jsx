import { Routes, Route, Router } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage.jsx";
// import GuestPage from "./pages/GuestPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/guest" element={<GuestPage />} /> */}
      </Routes>
  );
}

export default App;
