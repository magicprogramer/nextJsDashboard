import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8000";
export const addPost = createAsyncThunk("posts/addpost", async (post, thunkAPI) => {
    try {
        const res = await axios.post(`${URL}/posts`, {...post, createdAt: Date.now()});
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});
export const getPostsByUser = createAsyncThunk("posts/getpostsbyuser", async (id, thunkAPI) => {
    try{
        console.log(`id ${id}`);
        const res = await axios.get(`${URL}/posts?userId=${id}`);
        console.log(res.data);
        return res.data;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})
export const getPosts = createAsyncThunk("posts/getposts", async (_, thunkAPI) => {
    try {
        const res = await axios.get(`${URL}/posts`);
        return res.data.filter((post) => post.userId);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});
export const deletePost = createAsyncThunk("posts/deleteposts", async (id, thunkAPI) => {
    try {
        const res = await axios.delete(`${URL}/posts/${id}`);
        return id;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});
const postSlice = createSlice({
    name : "posts",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPosts.pending, (state) => {

            state.list = [];
            state.loading = true;
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            state.list = state.list.filter((post) => String(post.id) !== String(action.payload));
        })
        .addCase(getPostsByUser.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        })
        .addCase(getPostsByUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

    },

})

export default postSlice.reducer;