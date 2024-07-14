import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const RegisterUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const { register } = useAuth();
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    register(userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const LoginUser = async (userData: {
  email: string;
  password: string;
}) => {
  const { login } = useAuth();
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    login(userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getUserById = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    console.log("Response : ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

// export const updateUser = async (userId: string, username?: string, password?: string) => {
//   const response = await axios.put('/api/user/update', { userId, username, password });
//   return response.data;
// };

export const updateUser = async (
  userId: string,
  username?: string,
  password?: string
) => {
  try {
    const response = await axios.put("/updateUser", {
      userId,
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const createRating = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/ratings`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating rating:", error);
    throw error;
  }
};

export const getAllRatings = async () => {
  try {
    const response = await axios.get(`${API_URL}/ratings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching ratings:", error);
    throw error;
  }
};

export const getUserRatings = async () => {
  try {
    const response = await axios.get(`${API_URL}/ratings/myRatings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user ratings:", error);
    throw error;
  }
};
