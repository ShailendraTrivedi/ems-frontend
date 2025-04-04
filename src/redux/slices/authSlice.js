import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "@/redux/actions/authActions";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: { username: null, token: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.username = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      Cookies.remove("token");
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.username = null;
        state.token = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.username = null;
        state.token = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
