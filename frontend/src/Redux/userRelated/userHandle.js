
import {
    authRequest,
    authSuccess,
    authFailed,
    authError,
    getcanceldeletedcomponent,
    stuffAdded,
    authSuccessGetMessage,
    getdeletedcomponent,
    authEmpty,
    getSuccess

} from "./userSlice";

export const registerUser = (fields,currentUser) => async(dispatch) => {
    const {role} = fields;
    dispatch(authRequest());
    try{ 
        console.log("Registering user with fields:", fields);
        let result = await fetch(`http://localhost:5000/api/auth/register${role}`,{
            method: "post",
            body: JSON.stringify(fields),
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${currentUser?.token}`,
            },
        });
        result = await result.json();
        console.log("Registration result:", result);
        if(result.email){
            dispatch(authSuccess(result));
        }
        else{
            dispatch(authFailed(result.message));
        }
    }
    catch(error){
        dispatch(authError(error));
    }
};

export const loginUser = (fields,role) =>async(dispatch) => {
    const {email,password} = fields;
    dispatch(authRequest());
    try{
        let result = await fetch(`http://localhost:5000/api/auth/login${role}`,{
        method: "post",
        body: JSON.stringify(fields),
        headers:{
            "Content-Type":"application/json",
        },
        });
        result = await result.json();
        if(result.role){
            dispatch(authSuccess(result));
        }
        else{
            dispatch(authFailed(result.message));
        }
    }
    catch(error){
        dispatch(authError(error));
    }
} ;

// Add course
export const addCourse = (fields, currentUser) => async (dispatch) => {
    dispatch(authRequest());
    console.log(fields, currentUser);
    try {
        let result = await fetch(`http://localhost:5000/api/courses/addcourse`, {
            method: "post",
            body: JSON.stringify(fields),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser?.token}`,
            },
        });
        result = await result.json();
        if (result.course) {
            dispatch(stuffAdded());
        } else {
            dispatch(authFailed(result.message));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};

//show Students
export const ShowStudentsList = (currentUser)=> async(dispatch) =>{
  dispatch(authRequest());
  try{
        let result = await fetch(`http://localhost:5000/api/students/getstudents`,{
            method:'get',
            headers:{
                Authorization: `Bearer ${currentUser?.token}`,
            },
        });
       
        result = await result.json();
        if(result[0]){
            dispatch(getSuccess(result))
        }else{
            dispatch(authEmpty());
        }
  }
  catch(err)
  {
    dispatch(authError(err));
  }
};

//to cancel delete component;
export const cancelDelete= () =>
    (dispatch) =>{
        dispatch(getcanceldeletedcomponent());

    };

//  ro confirm delte component
export const setDeletedComponents = () =>(dispatch) =>{
    dispatch(getdeletedcomponent());
} ; 
