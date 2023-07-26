import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading:false,
    token:null,
    error:false
}

const userLognSlice = createSlice({
    name:"userlogin",
    initialState,
    reducers:{
       loginRequest:(state) => {
        state.loading = true;
        state.error = false;
        state.token = null;
       },
       loginSuccess:(state,action) => {
        state.loading = false;
        state.token = action.payload;
        state.error = false
       },
       loginFailed:(state)=>{
        state.loading = false;
        state.token = null;
        state.error = true
       }

    }
})

export const {loginRequest,loginSuccess,loginFailed} = userLognSlice.actions

export const userLoginReducer = userLognSlice.reducer