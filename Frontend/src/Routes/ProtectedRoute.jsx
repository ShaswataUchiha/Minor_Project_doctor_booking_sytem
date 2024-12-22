import { React, useContext } from "react";
import { authContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useContext(authContext) || {};
  const isAllowed = allowedRoles.includes(role);
  const accessbleRoutes =
    token && isAllowed ? children : <Navigate to="/login" replace={true} />;

  return accessbleRoutes;
};

export default ProtectedRoute;
