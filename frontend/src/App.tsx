import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Posts from "./components/Posts";
import MyPosts from "./components/MyPosts";
import Profile from "./components/Profile";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import "./App.css";

export default function App() {
  const [token, setToken] = useState<string>("");

  const handleLogout = () => setToken("");

  return (
    <div className="app-container">
      {/* Global Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main content area */}
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                onLoginClick={() => setToken("demo-token")}
                onLogoutClick={handleLogout}
              />
            }
          />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/posts"
            element={
              <ProtectedRoute token={token}>
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myposts"
            element={
              <ProtectedRoute token={token}>
                <MyPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute token={token}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
