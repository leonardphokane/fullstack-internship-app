import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import api from "../../api";
import "./Dashboard.css";

interface Props {
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export default function Dashboard({ onLoginClick, onLogoutClick }: Props) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get("/dashboard").then((res) => setData(res.data));
  }, []);

  return (
    <div className="dashboard">
      <Navbar onLoginClick={onLoginClick} onLogoutClick={onLogoutClick} />
      <aside className="sidebar">
        <h3>Quick Links</h3>
        <ul>
          <li>Dashboard</li>
          <li>Posts</li>
          <li>Profile</li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="flashcards">
          <div className="card dashboard-card">
            <h2>Dashboard</h2>
            <p>
              {data ? data.description : "Overview of your full-stack progress."}
            </p>
          </div>
          <div className="card posts-card">
            <h2>Posts</h2>
            <p>Manage and share your engineering insights.</p>
          </div>
          <div className="card profile-card">
            <h2>Profile</h2>
            <p>Customize your developer identity.</p>
          </div>
        </div>

        <div className="engineering-image">
          <h1>FULL STACK ENGINEERING</h1>
          <p>End-to-end mastery — API, database, and interface.</p>
        </div>
      </main>
    </div>
  );
}
