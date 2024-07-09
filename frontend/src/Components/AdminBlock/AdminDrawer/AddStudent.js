import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { totalCourses } from '../../../Redux/CourseRelated/CourseHandle';
import { cancelDelete, registerUser } from '../../../Redux/userRelated/userHandle';
import "./AddStudent.css";
import AddedSuccessfully from '../../Toast/AddedSuccesfully';

const AddStudent = () => {
  const { currentUser, status, response } = useSelector((state) => state.user);
  const { courseList = [] } = useSelector((state) => state.course);
  const [username, setUsername] = useState("");  
  const [loader,setLoader] = useState(false);
  const [rollno, setRollno] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [ semester,setSemester] =useState("");
  const [section, setSection] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const role = "Student"



  const uniqueCourses = [
    ...new Set(courseList.map((co) => co.course.toUpperCase())),
  ];

  const uniqueYears =[
    ...new Set(courseList.map((yo) => yo.year.toUpperCase())),
  ];

  const uniqueBranch = [
    ...new Set(courseList.map((bran) => bran.branch.toUpperCase())),
  ];

  const uniqueSemester =[
    ...new Set(courseList.map((sem) => sem.semester.toUpperCase())),
  ];

  const uniqueSection = [
    ...new Set(courseList.map((sec) => sec.section.toUpperCase())),
  ];

  const addStudentHandler = async(e) => {
    const fields = {
      username,
      role,
      rollno,
      course,
      branch,
      year,
      semester,
      section,
      email,
      password,

    };
    e.preventDefault();
    dispatch(registerUser(fields,currentUser));
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(totalCourses(currentUser));
    }
  }, [dispatch, currentUser]);  

  React.useEffect(() =>{
    if(status === "added" || response === "Roll Number already exists" || response === "Student with this email already exist"){
      const timeout = setTimeout(() => {
        dispatch(cancelDelete())
      }, 1500);
      return() =>clearTimeout(timeout);
    }
  },[status,response])

  return (
    <div className='addStudent' style={{ marginTop: "65px" }}>
      <div className='addStudentInside'>
        <span className='addStudentLogintitle'>Register Student</span>
        <form className='addStudentForm' onSubmit={addStudentHandler}>
          <div className='addStudentInput'>
            <label style={{ fontSize: "20px" }}>Name</label>
            <input
              className='AsloginInput'
              type='text'
              placeholder='Enter the student name'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='addStudentInput'>
            <label style={{ fontSize: "20px" }}>Rollno</label>
            <input
              className='AsloginInput'
              type='text'
              placeholder='Enter a student rollno...'
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
              required
            />
          </div>
          <div className='addStudentInput'>
            <label style={{ fontSize: "20px" }}>Course</label>
            <select
              className='AsloginInput'
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            >
              <option value="Select Class">Select course</option>
              {uniqueCourses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
          <div className='addStudentInput'>
            <label style={{fontSize:"20px"}}>Branch</label>
            <select
             className='AsloginInput'
             value={branch}
             onChange={(e) => setBranch(e.target.value)}
             required
            >
              <option value="Select Branch">Select Branch</option>
              {uniqueBranch.map((branch,index) =>(
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
          <div className='addStudentInput'>
            <label style={{fontSize:"20px"}}>Year</label>
            <select
             className='AsloginInput' 
             value={year}
             onChange={(e) => setYear(e.target.value)}
             required
            >
              <option value="Select Year">Select Year</option>
              {uniqueYears.map((year,index) =>(
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className='addStudentInput'>
            <label style={{fontSize:"20px"}}>Semester</label>
            <select
            className='AsloginInput'
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
            >
             <option>Select Semester</option>
             {uniqueSemester.map((semester,index)=>(
              <option key={index} value={semester}>
                {semester}
              </option>
             ))}
            </select>
          </div>
          <div className='addStudentInput'>
            <label style={{fontSize:"20px"}}>Section</label>
            <select
            className='AsloginInput'
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
            >
             <option>Select Section</option>
             {uniqueSection.map((section,index) =>(
              <option key={index} value={section}>
                {section}
              </option>
             ))}
            </select>
          </div>
          <div className='addStudentInput'>
            <label style={{fontSize:"20px"}}>Email</label>
            <input
            className='AsloginInput'
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            required
            type='email'
            placeholder='Enter the email'
            />
          </div>
          <div className='AsloginInput'>
            <label style={{fontSize:"20px"}}>Password</label>
            <input
            className='AsloginInput'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Enter the email'
            required
            />
          </div>
          <button className='addStudentbutton' type='submit'>
            {loader? <div className='load'></div>:"Add Student"}
          </button>
          <div className='courseDetail'>
            {status === "added"?<AddedSuccessfully/>:""}
            {(response === "Roll Number already exists"|| response === "Student with this email id exist")?<p style={{color:"red"}}>{response}</p>:""}

          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
