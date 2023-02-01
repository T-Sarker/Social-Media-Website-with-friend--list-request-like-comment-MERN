import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FriendService from "./friendService";

const initialState = {
    isLoadingF: false,
    isErrorF: false,
    usersF: null,
    friendReqF: null,
    msgF: ''
}

export const getAllUsers = createAsyncThunk('friend/all', async (thunkAPI) => {
    try {
        const allUser = await FriendService.allUsers()
        return allUser;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const addFriend = createAsyncThunk('friend/add', async (fData, thunkAPI) => {
    try {
        const result = await FriendService.addFriends(fData)
        return result;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})


export const getCurrentUsersFriendReq = createAsyncThunk('friend/req', async (thunkAPI) => {
    try {
        const result = await FriendService.currentUsersFriendRequests()
        return result;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})



export const handelAllFriendRequests = createAsyncThunk('friend/req/handel', async (reqData, thunkAPI) => {
    try {
        const result = await FriendService.handelFriendRequests(reqData)
        return result;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})


const FriendSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoadingF = false
            state.isErrorF = false
            state.usersF = null
            state.friendReqF = null
            state.msgF = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state, action) => {
                state.isLoadingF = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {

                state.usersF = action.payload
            })
            .addCase(getAllUsers.rejected, (state, action) => {

                state.isErrorF = true
                state.msgF = action.payload

            })

            .addCase(getCurrentUsersFriendReq.pending, (state, action) => {
                state.isLoadingF = true
            })
            .addCase(getCurrentUsersFriendReq.fulfilled, (state, action) => {

                state.friendReqF = action.payload
            })
            .addCase(getCurrentUsersFriendReq.rejected, (state, action) => {

                state.isErrorF = true
                state.msgF = action.payload

            })

            .addCase(handelAllFriendRequests.pending, (state, action) => {
                state.isLoadingF = true
            })
            .addCase(handelAllFriendRequests.fulfilled, (state, action) => {
                state.isLoadingF = false
            })
            .addCase(handelAllFriendRequests.rejected, (state, action) => {

                state.isErrorF = true
                state.msgF = action.payload

            })

            .addCase(addFriend.pending, (state, action) => {
                state.isLoadingF = true
            })
            .addCase(addFriend.fulfilled, (state, action) => {
                state.isLoadingF = false
            })
            .addCase(addFriend.rejected, (state, action) => {

                state.isErrorF = true
                state.msgF = action.payload

            })
    }
})

export const { reset } = FriendSlice.actions

export default FriendSlice.reducer