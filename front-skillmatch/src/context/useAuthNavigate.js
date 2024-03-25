// useAuthNavigate.js

import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const useAuthNavigate = () => {
  const navigate = useNavigate();
  const { login: contextLogin, logout: contextLogout } = useAuth();

  const login = (token) => {
    contextLogin(token);
    navigate("/offers");
  };

  const logout = () => {
    contextLogout();
    navigate("/login");
  };

  return { login, logout };
};
