import { createSlice } from '@reduxjs/toolkit'
import appApi from '../services/appApi'

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addNotifications: (state, { payload }) => {
            if (state.newMessages[payload]) {
                state.newMessages[payload] = state.newMessages[payload] + 1
            } else {
                state.newMessages[payload] = 1
            }

        },
        resetNotifications: (state, { payload }) => {
            delete state.newMessages[payload]
        },

    },
    extraReducers: (builder) => {
        //save the user after signing up
        builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, { payload }) => payload)
        //save the user after loging in
        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => payload)
        //logout: delete user session
        builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null)



    },
})

export const { addNotifications, resetNotifications } = userSlice.actions

export default userSlice.reducer
