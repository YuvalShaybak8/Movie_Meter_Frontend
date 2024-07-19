import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  axios.defaults.baseURL = `http://localhost:5500`;

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("accessToken");
      const userData = localStorage.getItem("loggedinUser");
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    };

    initializeAuth();
  }, []);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      console.log("user Info", email, password);
      const res = await axios.post(`/auth/login`, {
        email,
        password,
      });
      setUser(res.data.user);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("loggedinUser", JSON.stringify(res.data.user));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;
      navigate("/home");
      console.log("Tokens stored in localStorage:", {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
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
      localStorage.setItem("loggedinUser", JSON.stringify(res.data.user));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;
      navigate("/home");
      console.log("Tokens stored in localStorage:", {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      return res.data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const updateEmail = async (email: string) => {
    try {
      const res = await axios.put(`/auth/updateUserEmail`, {
        email,
      });
      const updatedUser = { ...user, email: res.data.email };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return res.data;
    } catch (error) {
      console.error("Update email error:", error);
      throw error;
    }
  };

  const googleSignIn = async (credential: string) => {
    try {
      const res = await axios.post(`/auth/google`, { credential });
      setUser(res.data.user);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("loggedinUser", JSON.stringify(res.data.user));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;
      navigate("/home");
      return res.data;
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("refreshToken");
      if (!token) {
        throw new Error("No refresh token found in local storage");
      }

      await axios.post(`/auth/logout`, { token });

      console.log("Logout - Removing tokens and user data from local storage");
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("loggedinUser");
      delete axios.defaults.headers.common["Authorization"];
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  // Axios interceptor to handle token expiration and refreshing
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const res = await axios.post("/auth/refresh", {
              token: refreshToken,
            });
            localStorage.setItem("accessToken", res.data.accessToken);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.data.accessToken}`;
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${res.data.accessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            logout(); // Invalidate session if refresh token fails
          }
        }
      }
      return Promise.reject(error);
    }
  );

  const value = {
    login,
    register,
    updateEmail,
    googleSignIn,
    logout,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
