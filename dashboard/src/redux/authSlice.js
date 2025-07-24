import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8000";
let user = null;
if (typeof window !== 'undefined') {
  user = JSON.parse(localStorage.getItem("user"));
}

let token = null;
if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
  try {
    const res = await axios.post(`${URL}/register`, user);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data || err.message);
  }
});
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const res = await axios.post(`${URL}/login`, user);
    return res.data;
  } catch (err) {
    console.log("bad");
    return thunkAPI.rejectWithValue(err.response.data || err.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user ? user : null,
    token: token ? token : null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        console.log("fulified");
        console.log(state.token, action.payload);
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
