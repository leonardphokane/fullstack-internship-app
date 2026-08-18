import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

interface Props {
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export default function Navbar({ onLoginClick, onLogoutClick }: Props) {
  return (
    <nav className="navbar">
      <div className="logo">Full Stack Engineering</div>
      <ul className="nav-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/posts">Posts</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li className="login" onClick={onLoginClick}>Login</li>
        <li className="logout" onClick={onLogoutClick}>Logout</li>
      </ul>
    </nav>
  );
}
