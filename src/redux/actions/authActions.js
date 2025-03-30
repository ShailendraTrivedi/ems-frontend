import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);
      if (response.status === 200) {
        Cookies.set("token", response.data.data.jwtToken);
        localStorage.setItem("userId", response.data.data.user.userID);
        localStorage.setItem("username", response.data.data.user.username);
        return {
          username: response.data.data.user.username,
          token: response.data.data.jwtToken,
        };
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", credentials);
      if (response.status === 201) {
        Cookies.set("token", response.data.data.jwtToken);
        localStorage.setItem("userId", response.data.data.user.userID);
        localStorage.setItem("username", response.data.data.user.username);
        return {
          username: response.data.data.user.username,
          token: response.data.data.jwtToken,
        };
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
