import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  setToken: (token: string | null) => void;
}

export default function Logout({ setToken }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Clear token from localStorage
    localStorage.removeItem("token");

    // ✅ Reset App state
    setToken(null);

    // ✅ Redirect to login
    navigate("/login");
  }, [setToken, navigate]);

  return (
    <div className="logout-container">
      <p>Logging out...</p>
    </div>
  );
}
