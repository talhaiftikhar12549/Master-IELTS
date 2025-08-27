import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const userData = await loginUser(credentials);

      // setUser(userData);
      setUser({
        token: userData.token,
        role: userData.role,
        ...userData.user, // agar backend user object bhej raha hai
      });
      setIsAuthenticated(true);
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: userData.token,
          role: userData.role,
          ...userData.user,
        })
      );

      // Redirect to either the protected page they tried to access or home
      // const redirectTo = useruserData.role === "admin" ? "/dashboard" : "/";

      // navigate(redirectTo);
      if (
        userData.role === "superadmin" ||
        userData.role === "admin" ||
        userData.role === "student"
      ) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const newUser = await registerUser(userData);
      setUser(newUser);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Clear token from localStorage if you're using it
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
