// src/routes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Halaman user
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/dashboard" element={<UserDashboard />} />   
           </Routes>
    </BrowserRouter>
  );
}
