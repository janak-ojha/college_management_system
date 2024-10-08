
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
    courseStudentsList: [],
    attendanceListForSubject:[],
    studentTeachers: "",
    markForSubject:[],
    attendanceOfStudentList:[],
    markOfStudentList:[],
    noticeList:[],

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
            state.coursesList = action.payload
        },
        getcanceldeletedcomponent: (state) =>{
            state.deleteComponent =false;
            state.response = null;
            state.status ="idle";
        },
        getdeletedcomponent:(state) =>{
            state.deleteComponent = true;

        },
        getSuccessForPerticularCoursesStudent:(state,action) =>{
            state.loading = false;
            state.courseStudentsList = action.payload;
            state.error = null;
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
        getSuccessS:(state,action) =>{
            state.loading = false;
            state.studentsList = action.payload;
            state.error = null;
            state.response = null;
        },
        getSuccessT:(state,action) =>{
            state.loading = false;
            state.teachersList = action.payload;
            state.error = null;
            state.response = null;
        },
        authSucessForParticularSubject:(state,action) =>{
            state.loading= false;
            state.attendanceListForSubject = action.payload;
            state.error=null;
            state.response=null;
        },
        authSuccessForParticularSubjectM:(state,action) =>{
            state.loading=false;
            state.markForSubject=action.payload;
            state.error=null;
            state.response = null;
        },
        authSuccessForStudentA:(state,action) =>{
            state.loading=false;
            state.attendanceOfStudentList = action.payload;
            state.error=null;
            state.response = null;
        },
        authSuccessForStudentM:(state,action) =>{
            state.loading=false;
            state.markOfStudentList=action.payload;
            state.error=null;
            state.response = null;
        },
        authSuccessForStudentTeachers: (state, action) => {
            state.loading= false;
            state.studentTeachers = action.payload;
            state.error = null;
            state.response = null;
          },
        authSuccessForNotice:(state,action) =>{
            state.loading = false;
            state.noticeList = action.payload;
            state.error = null;
            state.response = null;
        },
        authLogout: (state) => {
            localStorage.removeItem("user");
            state.status = "idle";
            state.currentUser = null;
            state.currentRole = null;
            state.error = null;
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
    getSuccessT,
    getSuccessS,
    getSuccessForPerticularCoursesStudent,
    authSucessForParticularSubject,
    authSuccessForParticularSubjectM,
    authSuccessForStudentTeachers,
    authSuccessForStudentA,
    authSuccessForStudentM,
    authSuccessForNotice,
    authLogout,
} = userSlice.actions;

export const userReducer = userSlice.reducer;


