// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { createContext, useContext, ReactNode, useState } from "react";
// import axios from "axios";

// type AuthContextType = {
//   login: ({
//     email,
//     password,
//   }: {
//     email: string;
//     password: string;
//   }) => Promise<any>;
//   register: ({
//     username,
//     email,
//     password,
//   }: {
//     username: string;
//     email: string;
//     password: string;
//   }) => Promise<any>;
//   updateEmail: (email: string) => Promise<any>;
//   user: any;
//   setUser: React.Dispatch<React.SetStateAction<any>>;
// };

// type Props = {
//   children?: ReactNode;
// };

// const initialValue: AuthContextType = {
//   login: async () => {},
//   register: async () => {},
//   updateEmail: async () => {},
//   user: null,
//   setUser: () => {},
// };

// const AuthContext = createContext<AuthContextType>(initialValue);

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }: Props) => {
//   const [user, setUser] = useState<any>(null);
//   axios.defaults.baseURL = `http://localhost:5500`;

//   const login = async ({
//     email,
//     password,
//   }: {
//     email: string;
//     password: string;
//   }) => {
//     try {
//       const res = await axios.post(`/auth/login`, {
//         email,
//         password,
//       });
//       console.log("Login response:", res.data);
//       setUser(res.data.user); // Now setting the user data
//       // Store tokens in localStorage or secure storage
//       localStorage.setItem("accessToken", res.data.accessToken);
//       localStorage.setItem("refreshToken", res.data.refreshToken);
//       console.log("User set in context:", res.data.user);
//       return res.data;
//     } catch (error) {
//       console.error("Login error:", error);
//       throw error;
//     }
//   };

//   const register = async ({
//     username,
//     email,
//     password,
//   }: {
//     username: string;
//     email: string;
//     password: string;
//   }) => {
//     try {
//       const res = await axios.post(`/auth/register`, {
//         username,
//         email,
//         password,
//       });
//       setUser(res.data.user); // Now setting the user data
//       // Store tokens in localStorage or secure storage
//       localStorage.setItem("accessToken", res.data.accessToken);
//       localStorage.setItem("refreshToken", res.data.refreshToken);
//       console.log("Register response:", res.data);
//       return res.data;
//     } catch (error) {
//       console.error("Register error:", error);
//       throw error;
//     }
//   };

//   const updateEmail = async (email: string) => {
//     const res = await axios.put(`/auth/updateUserEmail`, {
//       email,
//     });
//     return res.data;
//   };

//   const value = {
//     login,
//     register,
//     updateEmail,
//     user,
//     setUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, ReactNode, useState } from "react";
import axios from "axios";
import { updateUser as apiUpdateUser } from '../services/apiService';

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
  updateUser: ({
    userId,
    username,
    password,
  }: {
    userId: string;
    username?: string;
    password?: string;
  }) => Promise<any>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

type Props = {
  children?: ReactNode;
};

const initialValue: AuthContextType = {
  login: async () => { },
  register: async () => { },
  updateUser: async () => { },
  user: null,
  setUser: () => { },
};

const AuthContext = createContext<AuthContextType>(initialValue);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);
  axios.defaults.baseURL = `http://localhost:5500`;

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
      return res.data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const updateUser = async ({
    userId,
    username,
    password,
  }: {
    userId: string;
    username?: string;
    password?: string;
  }) => {
    try {
      const updatedUser = await apiUpdateUser(userId, username, password);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Update user error:", error);
      throw error;
    }
  };

  const value = {
    login,
    register,
    updateUser,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
