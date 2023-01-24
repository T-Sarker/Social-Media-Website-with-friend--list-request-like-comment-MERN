import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from './authService'

const user = JSON.parse(localStorage.getItem('user')) // getting the user data from localstorage

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    user: user ? user : null,
    msg: ''
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        const result = await authService.register(user)
        return result;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data)
    }
})


export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        const result = await authService.login(user)
        console.log(JSON.stringify(result));
        return result
    } catch (error) {

        return thunkAPI.rejectWithValue(error.response.data)
    }
})


export const logout = createAsyncThunk('auth/logout', (thunkAPI) => {
    try {
        authService.logout()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // reset: (state) => {
        //     state.user = null
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.msg = action.payload
            })

            .addCase(login.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {

                state.isError = true
                state.isLoading = false
                state.isSuccess = false
                state.msg = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = false
                state.msg = ''
                state.user = null
            })

    }

})

export const { reset } = authSlice.actions
export default authSlice.reducer
