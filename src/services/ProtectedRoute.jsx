import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkAuthStatus } from "./authService";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const [isAllowed, setIsAllowed] = useState(null); // null = loading
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await checkAuthStatus(); // must return role

        if (allowedRoles && !allowedRoles.includes(userData.data.role)) {
          setIsAllowed(false);
        } else {
          setIsAllowed(true);
        }
      } catch (err) {
        setIsAllowed(false);
        setError(err);
      }
    };

    checkAuth();
  }, [allowedRoles]);

  if (error) {
    console.log("an error occured while accesing protected route", error);
  }
  if (isAllowed === null) {
    // return null;
    return <div>Loading...</div>;
  }

  if (!isAllowed) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
