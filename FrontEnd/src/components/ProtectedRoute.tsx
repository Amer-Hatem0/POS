// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token || user?.role !== "Admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
