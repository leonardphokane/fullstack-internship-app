// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  token: string;
  children: JSX.Element;
}

export default function ProtectedRoute({ token, children }: Props) {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
