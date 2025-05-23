import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            localStorage.setItem('token', action.payload.token)
        },
        logout: (state) => {
            state.user = null
            state.token = null
            localStorage.clear('token')
        }
    }
})

export const {setCredentials, logout} = authSlice.actions
export default authSlice.reducer