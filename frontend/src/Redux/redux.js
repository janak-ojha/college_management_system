import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./userRelated/userSlice";

const redux=configureStore({
    reducer:{
        user:userReducer

    }
})
export default redux;

