import React, { useState } from "react";
import { login } from "../services/auth";   // ✅ use service helper
import { LoginResponse } from "shared/types";

interface Props {
  setToken: (token: string) => void;
}

export default function Login({ setToken }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res: LoginResponse = await login(email, password);
      setToken(res.token);   // ✅ triggers Dashboard in App.tsx
    } catch (err) {
      alert("Login failed. Please check your credentials.");
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
    </div>
  );
}
