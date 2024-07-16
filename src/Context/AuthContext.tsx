import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import axios from "axios";

type AuthContextType = {
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<any>;
  register: ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => Promise<any>;
  updateEmail: (email: string) => Promise<any>;
  logout: () => void;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

type Props = {
  children?: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);
  axios.defaults.baseURL = `http://localhost:5500`;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await axios.post(`/auth/login`, {
        email,
        password,
      });
      setUser(res.data.user);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;
      return res.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const res = await axios.post(`/auth/register`, {
        username,
        email,
        password,
      });
      setUser(res.data.user);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;
      return res.data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const updateEmail = async (email: string) => {
    const res = await axios.put(`/auth/updateUserEmail`, {
      email,
    });
    return res.data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  const value = {
    login,
    register,
    updateEmail,
    logout,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
