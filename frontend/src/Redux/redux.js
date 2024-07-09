import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./userRelated/userSlice";
import { courseReducer } from "./CourseRelated/CourseSlice";

const redux=configureStore({
    reducer:{
        user:userReducer,
        course:courseReducer,

    }
})
export default redux;

