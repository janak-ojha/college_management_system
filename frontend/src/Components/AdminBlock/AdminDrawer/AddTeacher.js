import React, { useEffect, useState } from 'react'
import "./AddStudent.css"

import { useDispatch, useSelector } from 'react-redux';
import { totalCourses } from '../../../Redux/CourseRelated/CourseHandle';
import { cancelDelete, registerUser } from '../../../Redux/userRelated/userHandle';
import AddedSuccesfulle from "../../Toast/AddedSuccesfully";



const AddTeacher = () => {
  const [username,setUsername] = useState("");
  const [courseOption,setCourseOption] = useState("");
  const [ addedTeacher,setAddedTeacher] = useState(false);
  const [emailExist,setEmailExist] = useState("");
  const [course,setCourse]= useState("");
  const [email,setEmail] = useState(""); 
  const [password,setPassword] = useState("");
  const [loader,setLoader] = useState("");
  const [subject,setSubject] = useState("");
  const dispatch = useDispatch();
  const {currentUser,status,loading,response} = useSelector((state) =>state.user);
  const {coursesList} = useSelector( (state) =>state.course);
  const role = "Teacher";

  const addTeacherHandler =(e) =>{
    const fields = {
      username,
      role,
      course,
      subject,
      email,
      password
    };
    e.preventDefault();
    dispatch(registerUser(fields,currentUser))
  };

  useEffect(() =>{
    if(status === "added"){
      setAddedTeacher(true);
      setLoader(false);
      const timeout = setTimeout(() => {
        setAddedTeacher(false);
        
      }, 1500);
      return() => clearTimeout(timeout);
    }else{
      setLoader(false);
    }
    if(response === "Teacher with same email already exist"){
      setEmailExist(true);
      const timeout = setTimeout(() => {
        setEmailExist(false);
        dispatch(cancelDelete);
      }, 1500);
      return () => clearTimeout(timeout);
    }
    if(loading){
      setLoader(true);
    }
  }, [status, response, loading, dispatch]);
  
  useEffect(() =>{
    dispatch(totalCourses(currentUser))
  } ,[dispatch, currentUser]);



  return (
    <div className='addStudent' style={{marginTop:'70px'}}>
      {addedTeacher && <AddedSuccesfulle/>}
      <div className='addStudentInside'>
        <span className='loginTitle'>Register Teacher</span>
        <form className='addStudentForm' onSubmit={addTeacherHandler}>
          <div className='addStudentInput'>
            {" "}
            <label style={{fontSize:'20px'}}>Name</label>
            <input
              className='AsloginInput'
              type='text'
              placeholder='Enter teacher name'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='addStudentInput'>
            <label style={{fontSize:"20px"}}>Course details*(course,branch,year,sem,section)</label>
            <select
            className='AsloginInput'
            value={courseOption}
            onChange={(e)=>{
              setCourseOption(e.target.value)
              const selectedIndex = e.target.selectedIndex -1;
              const selectedId = coursesList[selectedIndex]?._id;
              setCourse(selectedId);
            }}
            required
            >
            <option value="Select class">Select Course</option>
            {coursesList.map((co,_id) =>(
              <option
                key={_id}
                value={`${co.course},${co?.branch},${co.year} ,${co.semester},${co.section}`}
              >
                {co.course},{co.branch},{co.year},{co.semester},{" "}
                {co.section}
              </option>
            ))}
            </select>
          </div>
          <div className='addStudentInput'>
            <label style={{fontSize:"20px"}}>Subject</label>
            <input
              className='AsloginInput'
              type='text'
              placeholder='Enter the subject'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className='addStudentInput'>
            <label style={{fontSize:"20px"}}>Email</label>
            <input
              className='AsloginInput'
              type='email'
              placeholder='Enter the teacher email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailExist && <p style={{color:"red"}}>{response}</p>}
          </div>
          <div className='addStudentInput'>
            <label style={{fontSize:"20px"}}>Password</label>
            <input
             className='AsloginInput'
             type='password'
             placeholder='Enter the password'
             value={password}
             onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='addTeacherButton' type='submit'>
            {loader ? <div className='load'></div>:'Add Teacher'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddTeacher