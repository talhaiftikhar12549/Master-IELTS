// import { Navigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { checkAuthStatus } from "./authService";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user, isAuthenticated } = useAuth();
//   const location = useLocation();
//   const [isAllowed, setIsAllowed] = useState(null); // null = loading
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const userData = await checkAuthStatus(); // must return role

//         if (allowedRoles && !allowedRoles.includes(userData.data.role)) {
//           setIsAllowed(false);
//         } else {
//           setIsAllowed(true);
//         }
//       } catch (err) {
//         setIsAllowed(false);
//         setError(err);
//       }
//     };

//     checkAuth();
//   }, [allowedRoles]);

//   if (error) {
//     console.log("an error occured while accesing protected route", error);
//   }
//   if (isAllowed === null) {
//     // return null;
//     return <div>Loading...</div>;
//   }

//   if (!isAllowed) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


// ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // ⏳ Show loading state while AuthContext restores user
  if (loading) {
    return <div>Loading...</div>;
  }

  // 🚫 If not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🚫 If logged in but role not allowed → redirect home
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Otherwise → allow access
  return children;
};

export default ProtectedRoute;
