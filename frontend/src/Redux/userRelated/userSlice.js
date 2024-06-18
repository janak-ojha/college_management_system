import { DarkMode } from "@mui/icons-material";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    status:"idle",
    loading:false,
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    currentROle: (JSON.parse(localStorage.getItem("user")) || {}).role || null,
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
        }
    }
})    