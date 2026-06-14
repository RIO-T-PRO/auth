import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login-page";
import SuccessPage from "./pages/success-pages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}
