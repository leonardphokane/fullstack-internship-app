import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  token: string | null;
  children: React.ReactNode;
}

export default function ProtectedRoute({ token, children }: Props) {
  if (!token) {
    // Instead of forcing redirect, show the children with a warning
    return (
      <div style={{ textAlign: "center", marginTop: "40px", color: "#ff0" }}>
        ⚠️ Protected route — please log in to access full data.
        <div style={{ marginTop: "20px" }}>{children}</div>
      </div>
    );
  }
  return <>{children}</>;
}
