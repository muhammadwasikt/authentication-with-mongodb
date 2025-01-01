import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: [],
    userId: []
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userId: (state, { payload }) => {
            state.userId = payload
        },
        userToken: (state, { payload }) => {
            state.token = payload
        }
    },
})


export const { userId , userToken } = UserSlice.actions

export default UserSlice.reducer