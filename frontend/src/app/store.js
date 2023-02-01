import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import blogReducer from '../features/blog/blogSlice'
import postReducer from '../features/mypost/postSlice'
import friendReducer from '../features/friends/friendSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        blog: blogReducer,
        post: postReducer,
        friends: friendReducer
    }
})