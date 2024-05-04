import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [token, setToken] = useState(() => {
    return JSON.parse(localStorage.getItem("token")) || null;
  });

  const navigate = useNavigate();

  const signup = async (formdata) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/signup",
        formdata
      );
      console.log(data);
      setToken(data.token);
      localStorage.setItem("token", JSON.stringify(data.token));
      toast.success("Sign Up completed! Now login.");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (formdata) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/login",
        formdata
      );
      console.log(data);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("You are Logged in!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = () => {
    setUser(user);
    localStorage.setItem("user");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout successful!");
    navigate("/login");
  };

  const contextData = {
    token,
    user,
    signup,
    login,
    getUser,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
