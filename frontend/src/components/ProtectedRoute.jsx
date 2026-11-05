import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    if (role === "RECRUITER") {
      return <Navigate to="/recruiter-dashboard" replace />;
    }

    return <Navigate to="/job-seeker-dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;