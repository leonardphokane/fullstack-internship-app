// src/components/Sidebar.tsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

interface Props {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: Props) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Full Stack Engineering</h2>
      <nav className="sidebar-nav">
        <NavLink to="/" className="sidebar-link">Dashboard</NavLink>
        <NavLink to="/posts" className="sidebar-link">Posts</NavLink>
        <NavLink to="/myposts" className="sidebar-link">My Posts</NavLink>
        <NavLink to="/profile" className="sidebar-link">Profile</NavLink>
        <NavLink to="/login" className="sidebar-link">Login</NavLink>
        <button className="sidebar-link logout-btn" onClick={handleLogoutClick}>
          Logout
        </button>
      </nav>
    </div>
  );
}
