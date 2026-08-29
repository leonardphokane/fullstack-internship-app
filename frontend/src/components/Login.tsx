import React, { useState } from "react";
import api from "../api"; // ✅ use the shared Axios instance
import { useNavigate } from "react-router-dom";

interface Props {
  setToken: (token: string) => void;
}

// Shape of the login response from backend
interface LoginResponse {
  token: string;
}

export default function Login({ setToken }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // ✅ Tell Axios what type to expect
      const res = await api.post<LoginResponse>("/auth/login", { email, password });

      // ✅ Store token in localStorage
      localStorage.setItem("token", res.data.token);

      // ✅ Update App state
      setToken(res.data.token);

      // ✅ Redirect to dashboard
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <input
        className="login-input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="login-input"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
}
