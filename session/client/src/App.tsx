import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landing";
import AuthPage from "./pages/auth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
