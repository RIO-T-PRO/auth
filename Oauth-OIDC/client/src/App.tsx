import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/home/nav-bar";
import AuthPage from "./pages/auth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
