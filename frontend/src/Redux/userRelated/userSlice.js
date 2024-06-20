
import { createSlice,  } from "@reduxjs/toolkit";

const initialState = {
    status:"idle",
    loading:false,
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    currentRole: (JSON.parse(localStorage.getItem("user")) || {}).role || null,
    error: null,
    response: null,
    };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        authRequest: (state) => {
            state.status="loading";
            state.loading =true ;
        },
        authSuccess: (state,action)=>{
            state.status ="success";
            state.loading = false;
            state.currentUser = action.payload;
            state.currentRole = action.payload.role;
            localStorage.setItem("user",JSON.stringify(action.payload));
   
        },
        authSuccessGetMessage: (state,action) => {
            state.status = "success";
            state.loading = false;
            state.response = action.payload
        },
        authFailed: (state,action) =>{
            state.status ="failed";
            state.loading = false;
            state.response =action.payload;
        },
        authError : (state,action) => {
            state.status ="error";
            state.loading =false;
            state.error = action.payload;
        },

    },
});

export const {
    authRequest,
    authSuccess,
    authFailed,
    authError,
    authSuccessGetMessage

} = userSlice.actions;

export const userReducer = userSlice.reducer;


