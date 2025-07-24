import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const URL = "http://localhost:8000";

export const getUsers = createAsyncThunk('users/getusers', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${URL}/users`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
export const deleteUser = createAsyncThunk('users/deleteuser', async (id, thunkAPI) => {
  try {
    const res = await axios.delete(`${URL}/users/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    })
    .addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      console.log(action);
      state.list = state.list.filter((user) => String(user.id) !== String(action.payload));
    });
  },
});

export default userSlice.reducer;