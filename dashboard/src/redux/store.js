import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import authReducer from './authSlice';
import postReducer from './postsSlice';
export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    posts: postReducer
  },
});