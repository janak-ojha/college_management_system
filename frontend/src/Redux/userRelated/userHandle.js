
import {
    authRequest,
    authSuccess,
    authFailed,
    authError,
    getcanceldeletedcomponent,
    stuffAdded,
    authSuccessGetMessage,
    authLogout,
    authSuccessForNotice,
    getdeletedcomponent,
    authEmpty,
    getSuccess,
    getSuccessS,
    getSuccessT,
    getSuccessForPerticularCoursesStudent,
    authSucessForParticularSubject,
    authSuccessForParticularSubjectM,
    authSuccessForStudentTeachers,
    authSuccessForStudentA,
    authSuccessForStudentM

} from "./userSlice";

export const registerUser = (fields,currentUser) => async(dispatch) => {
    const {role} = fields;
    dispatch(authRequest());
    try{ 
        console.log("Registering user with fields:", fields);
        let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/auth/register${role}`,{
            method: "post",
            body: JSON.stringify(fields),
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${currentUser?.token}`,
            },
        });
        result = await result.json();
        if(result.email && result.rollNo){
          dispatch(stuffAdded());
        }else if (result?.email && result?.course){
          dispatch(stuffAdded());
        }else if(result.email){
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
        let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/auth/login${role}`,{
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
        let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/courses/addcourse`, {
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
        let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/students/getstudents`,{
            method:'get',
            headers:{
                Authorization: `Bearer ${currentUser?.token}`,
            },
        });
       
        result = await result.json();
        console.log(result);
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

//delete all

export const deleteAll = (currentUser,role) => async(dispatch) =>{
    dispatch(authRequest());
    try{
        let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/${role}/deleteAll`,{
            method:"put",
            headers:{
                Authorization: `Bearer ${currentUser?.token}`,
            },
        });
        result = await result.json();
        if(result[0]){
            if(role === "teachers"){
                dispatch(getSuccessT(result));
            }else if(role === "students"){
                dispatch(getSuccessT(result));
            }
        }else{
            if(role === "teachers"){
                dispatch(getSuccessT([]));
            }else if(role === "students"){
                dispatch(getSuccessS([]))
            }
        }
    }catch(error){
         dispatch(authError(error));
    }
}

//deleteone
export const deleteOne = (currentUser,role,selectedId) => async(dispatch) =>{
    dispatch(authRequest());
    try{
        const requestBody = {selectedId};
        let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/${role}/deleteOne`,{
            method:"put",
            body:JSON.stringify(requestBody),
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${currentUser?.token}`,
            },
        });
        result = await result.json();
        if(result[0])
        {
            if(role === "teachers"){
                dispatch(getSuccessT(result));
            }else if(role === "students"){
                dispatch(getSuccessS(result));
            }
        }else{
            dispatch(authEmpty());
        }
    }catch(error)
    {
        dispatch(authError(error));
    }
};


export const singleCourseStudentList =(fields,currentUser) => async(dispatch)=>{
    dispatch(authRequest());
    try{
        let result= await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/students/singlecoursestudentlist`,
        {
            method: "post",
            body: JSON.stringify(fields),
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${currentUser?.token}`,
            }
        });
        result = await result.json();
        console.log(result);
        if(result[0]){
            dispatch(getSuccessForPerticularCoursesStudent(result));
        }else{
            dispatch(getSuccessForPerticularCoursesStudent(result.message));
        }
    }catch(error){
      dispatch(authError(error));
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

//show teacher list
export const ShowTeacherList = (currentUser) => async(dispatch) =>{
    dispatch(authRequest());
    try{
        let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/teachers/getteachers`,{
            method:"get",
            headers:{
                Authorization:`Bearer ${currentUser?.token}`,
            },
        });
        result= await result.json();
    
        if(result[0]){
            dispatch(getSuccessT(result));
        }else{
            dispatch(authEmpty());
        }
    }catch(error)
    {
            dispatch(authError(error));
    }
};

export const sendNotice = (fields, currentUser) => async (dispatch) => {
    dispatch(authRequest());
    try {
        let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/notices/setnotice`, {
            method: "post",
            body: JSON.stringify(fields),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.token}`,
            },
        });
         result = await result.json();
        dispatch(stuffAdded());
    } catch (error) {
        dispatch(authError(error));
    }
};

export const gettingNotice = (collegename,currentUser) => async(dispatch) => {
    dispatch(authRequest());
    try {
      let result = await fetch(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/api/notices/getnotice/${collegename}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      result = await result.json();
      dispatch(authSuccessForNotice(result));
    } catch (error) {
      dispatch(authError(error));
    }
  
  } 

  // for getting marks of particular subject of particulr teacher
export const getMark = (fields, currentUser) => async (dispatch) => {
    dispatch(authRequest());
    try {
      let result = await fetch(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/api/mark/getmark`,
        {
          method: "post",
          body: JSON.stringify(fields, currentUser),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      result = await result.json();
      dispatch(authSuccessForParticularSubjectM(result));
    } catch (error) {
      dispatch(authError(error));
    }
  };

  // for addding marks
export const takeMark = (fields, currentUser) => async (dispatch) => {
    dispatch(authRequest());
    try {
      let result = await fetch(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/api/mark/takemark`,
        {
          method: "post",
          body: JSON.stringify(fields, currentUser),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      result = await result.json();
      dispatch(authSuccessGetMessage(result.message));
    } catch (error) {
      dispatch(authError(error));
    }
  };

  //logout 

  export const logoutUser = () => async (dispatch) => {
    dispatch(authLogout());
  };


  
//for teacherblock -->> add attendance
export const takeAttendance = (fields, currentUser) => async (dispatch) => {
    dispatch(authRequest());
    try {
      let result = await fetch(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/api/attendance/takeattendance`,
        {
          method: "post",
          body: JSON.stringify(fields, currentUser),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      result = await result.json();
      dispatch(authSuccessGetMessage(result.message));
    } catch (error) {
      dispatch(authError(error));
    }
  };
  
  // get all attendance of the particular student for particular teacher
  

  export const getAttendance = (fields, currentUser) => async (dispatch) => {
    dispatch(authRequest());
    try {
      let result = await fetch(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/api/attendance/getattendance`,
        {
          method: "post",
          body: JSON.stringify(fields, currentUser),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      result = await result.json();
      dispatch(authSucessForParticularSubject(result));
    } catch (error) {
      dispatch(authError(error));
    }
  };
  
// for student block

// getting all attendance of a student
export const totalAttendanceOfStudent =(currentUser,id) => async(dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(
      `${process.env.REACT_APP_BASE_URL_BACKEND}/api/attendanceofstudent/getattendance/${id}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    result = await result.json();
    dispatch(authSuccessForStudentA(result));
  } catch (error) {
    dispatch(authError(error));
  }

} 

// getting all mark of a student
export const totalMarkOfStudent =(currentUser,id) => async(dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(
      `${process.env.REACT_APP_BASE_URL_BACKEND}/api/markofstudent/getmark/${id}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    result = await result.json();
    dispatch(authSuccessForStudentM(result));
  } catch (error) {
    dispatch(authError(error));
  }

} 

// getting teachers of particular course details
export const totalTeachersOfStudent = (fields,currentUser) => async(dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(
      `${process.env.REACT_APP_BASE_URL_BACKEND}/api/students/getteachers`,
      {
        method: "post",
        body: JSON.stringify(fields),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    result = await result.json();
    dispatch(authSuccessForStudentTeachers(result));
  } catch (error) {
    dispatch(authError(error));
  }

} 

