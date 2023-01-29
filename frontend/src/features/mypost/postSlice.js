import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
    isLoadingPost: false,
    isErrorPost: false,
    isSuccessPost: false,
    posts: null,
    msgPost: ''

}

export const getAllPost = createAsyncThunk('post/all', async (userId, thunkAPI) => {
    try {
        const result = await postService.getMyPost(userId)
        return result
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const updateMyPostData = createAsyncThunk('post/update', async (postdata, thunkAPI) => {
    try {
        const result = await postService.updateMyPost(postdata)
        return result
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})


export const deleteMyPostData = createAsyncThunk('post/delete', async (id, thunkAPI) => {
    try {
        const result = await postService.deleteMyPost(id)
        return result
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

//like and dislike post 
export const likeOrDislike = createAsyncThunk('post/expression', async (expdata, thunkAPI) => {
    try {
        const result = await postService.likeAndDislike(expdata)
        return result;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

//comment post 
export const commentPost = createAsyncThunk('post/comment', async (expdata, thunkAPI) => {
    try {
        const result = await postService.comments(expdata)
        return result;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

//comment delete post 
export const commentDeletePost = createAsyncThunk('post/commentDlt', async (expdata, thunkAPI) => {
    try {
        const result = await postService.commentsDelete(expdata)
        return result;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})


export const PostSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoadingPost = false
            state.isErrorPost = false
            state.posts = null
            state.msgPost = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPost.pending, (state, action) => {
                state.isLoadingPost = true
            })
            .addCase(getAllPost.fulfilled, (state, action) => {

                state.posts = action.payload
            })
            .addCase(getAllPost.rejected, (state, action) => {

                state.isErrorPost = true
                state.msgPost = action.payload

            })

            .addCase(updateMyPostData.pending, (state, action) => {
                state.isLoadingPost = true
            })
            .addCase(updateMyPostData.fulfilled, (state, action) => {

                state.isSuccessPost = true
                state.msgPost = 'Successfully updated'
            })
            .addCase(updateMyPostData.rejected, (state, action) => {

                state.isErrorPost = true
                state.msgPost = action.payload

            })

            .addCase(deleteMyPostData.pending, (state, action) => {
                state.isLoadingPost = true
            })
            .addCase(deleteMyPostData.fulfilled, (state, action) => {
                state.isLoadingPost = false
                state.isSuccessPost = true
                state.msgPost = 'Successfully deleted'
            })
            .addCase(deleteMyPostData.rejected, (state, action) => {

                state.isErrorPost = true
                state.msgPost = action.payload

            })

            .addCase(likeOrDislike.pending, (state, action) => {
                state.isLoadingPost = true
            })
            .addCase(likeOrDislike.fulfilled, (state, action) => {
                state.isLoadingPost = false
                state.msgPost = 'Successfully liked'
            })
            .addCase(likeOrDislike.rejected, (state, action) => {

                state.isErrorPost = true
                state.msgPost = action.payload

            })

            .addCase(commentPost.pending, (state, action) => {
                state.isLoadingPost = true
            })
            .addCase(commentPost.fulfilled, (state, action) => {
                state.isLoadingPost = false
            })
            .addCase(commentPost.rejected, (state, action) => {

                state.isErrorPost = true
                state.msgPost = action.payload

            })

            .addCase(commentDeletePost.pending, (state, action) => {
                state.isLoadingPost = true
            })
            .addCase(commentDeletePost.fulfilled, (state, action) => {
                state.isLoadingPost = false
            })
            .addCase(commentDeletePost.rejected, (state, action) => {

                state.isErrorPost = true
                state.msgPost = action.payload

            })
    }
})

export const { reset } = PostSlice.actions

export default PostSlice.reducer