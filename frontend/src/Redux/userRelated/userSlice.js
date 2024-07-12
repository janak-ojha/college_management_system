
import { createSlice,  } from "@reduxjs/toolkit";

const initialState = {
    status:"idle",
    loading:false,
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    currentRole: (JSON.parse(localStorage.getItem("user")) || {}).role || null,
    deleteComponent: false,
    error: null,
    response: null,
    studentsList: [],
    teachersList: [],

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
        authEmpty:(state,action) =>{
            state.loading= false;
            state.teachersList = action.payload;
            state.studentsList = action.payload; 
        },
        getcanceldeletedcomponent: (state) =>{
            state.deleteComponent =false;
            state.response = null;
            state.status ="idle";
        },
        getdeletedcomponent:(state) =>{
            state.deleteComponent = true;

        },
        stuffAdded:(state) =>{
            state.status = "added";
            state.loading = false;
        },
        getSuccess: (state, action) => {
            state.loading = false;
            state.studentsList = action.payload;
            state.error = null;
            state.response = null;
          },

    },
});

export const {
    authRequest,
    authSuccess,
    authFailed,
    authError,
    authSuccessGetMessage,
    getcanceldeletedcomponent,
    getdeletedcomponent,
    stuffAdded,
    authEmpty,
    getSuccess,
} = userSlice.actions;

export const userReducer = userSlice.reducer;


