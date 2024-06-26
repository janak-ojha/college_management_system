
import {
    authRequest,
    authSuccess,
    authFailed,
    authError,
    getcanceldeletedcomponent,
    authSuccessGetMessage
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

//to comfirm delete component;
export const cancelDelete= () =>
    (dispatch) =>{
        dispatch(getcanceldeletedcomponent());

    }
