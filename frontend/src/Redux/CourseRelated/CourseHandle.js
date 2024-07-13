import {
    getError,
    getFailed,
    getRequest,
    getSuccess,
    getSuccesC,
    getEmpty
}from "./CourseSlice";

export const totalCourses = (currentUser) => async(dispatch) =>{
    dispatch(getRequest());
    try{
        let result= await fetch(`http://localhost:5000/api/courses/getcourses`,{
            method:'get',
            headers:{
                Authorization:`Bearer ${currentUser?.token}`,
            }
        });
        result= await result.json();
        if(result[0]){
            dispatch(getSuccess(result));
        }else{
            dispatch(getFailed("no course are added till now"));

        }
    }  catch(error){
           dispatch(getError(error));
    }
}

//delete one course

export const deleteOneCourse = (currentUser,role,selectedId) => async(dispatch) =>{
    dispatch(getRequest());
    try{
        const requestBody = {selectedId};
        let result = await fetch(`http://localhost:5000/api/${role}/deleteOne`,{
            method: "put",
            body: JSON.stringify(requestBody),
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${currentUser?.token}`,
            },
        });
        result = await result.json();
        if(result[0]){
            if(role === "courses"){
                dispatch(getSuccesC(result));
            }
        }else{
            dispatch(getEmpty());
        }
}catch(error){

}
};

