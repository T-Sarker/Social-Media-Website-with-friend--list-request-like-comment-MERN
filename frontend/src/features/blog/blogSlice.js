import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import blogService from "./blogService";

// creating the service calls
export const addBlog = createAsyncThunk('blog/add', async (blog, thunkAPI) => {
    try {
        const res = await blogService.addBlog(blog)
        return res
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const allBlog = createAsyncThunk('blog/all', async (blog, thunkAPI) => {
    try {
        const res = await blogService.allBlog()
        return res
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    blogs: [],
    msg: ''
}

export const BlogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addBlog.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(addBlog.fulfilled, (state, action) => {
                state.isSuccess = true
            })
            .addCase(addBlog.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.msg = action.payload

            })
            .addCase(allBlog.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(allBlog.fulfilled, (state, action) => {
                state.isLoading = false
                state.blogs = action.payload
            })
            .addCase(allBlog.rejected, (state, action) => {
                state.isError = true
                state.msg = action.payload

            })
    }
})

export const { reset } = BlogSlice.actions

export default BlogSlice.reducer
