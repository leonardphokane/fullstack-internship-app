// src/components/Navbar/Navbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

interface Props {
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export default function Navbar({ onLoginClick, onLogoutClick }: Props) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onLoginClick();
    navigate("/login");
  };

  const handleLogout = () => {
    onLogoutClick();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-actions">
        <button className="login-btn" onClick={handleLogin}>Login</button>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
