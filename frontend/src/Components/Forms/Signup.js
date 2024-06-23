import React, { useEffect, useState } from 'react';
import './signup.css';
import { Avatar, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import {  CircularProgress } from '@mui/material';
import {Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../Redux/userRelated/userHandle';
import { useDispatch,useSelector} from 'react-redux';



const Signup = () => {
    const [username,setUsername]= useState("");
    const [collegename,setCollegename]= useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [profilepp,setProfilepp] = useState("");
    const [message,setMessage] = useState("");
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const {status,currentUser,response,error,currentRole,loading } =useSelector(state => state.user);
   


    useEffect(() =>{
      if(status === "success"){
        Navigate("/adminLogin");
      }
      else if(status === "failed"){
        console.log("failed");
        setMessage(response);
        setTimeout(() => setMessage(""),5000);  
      }
      else if(status === "error"){
        console.log("error");
        setMessage("server is busy try again later");
        setTimeout(() => setMessage(""),5000);
      }
    },[status,currentUser,currentRole,Navigate,error,response]);
  
    // Function to handle file upload and convert to base64
    const UploadImage = async (e) => {
      const file = e.target.files[0];
      if (file) {
          try {
              const base64 = await convertToBase64(file);
              setProfilepp(base64);
          } catch (error) {
              console.error("Error converting file to base64:", error);
          }
      }
  };

  // Function to convert file to base64
  const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
          const filereader = new FileReader();
          filereader.readAsDataURL(file);
          filereader.onload = () => {
              resolve(filereader.result);
          };
          filereader.onerror = (error) => {
              reject(error);
          };
      });
  };
  
    const role = "Admin";
    const fields = {username,collegename,email,role,password,profilepp};

    const handleRegister = async(e) =>{
      e.preventDefault();
      console.log("Fields to be submitted:", fields); 
      dispatch(registerUser(fields));
    }


    

  return (

    <div className='signupContainer'>
      <div className='registerTitle' style={{fontFamily:"sans-serif",fontSize:"55px",marginTop:"20px",}}>Register</div>
      <form onSubmit={handleRegister} className='registerForm' style={{display:"flex" ,flexDirection:"column",alignItems:"center",marginTop:"20px"}}>
            <label className='labelsign' style={{ marginRight:"12%"}}>Username</label>
            <input
               className='input_text'
               type='text'
               placeholder='Enter your name'
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               required
            />  
            <label className='labelsign'  style={{marginTop:"10px", marginRight:'10%'}}>College Name</label>
            <input
                className='input_text'
                type='text'
                placeholder='Enter your college name'
                required
                value={collegename}
                onChange={(e) => setCollegename(e.target.value)}
                />
            <label className='labelsign'  style={{marginTop:"10px",marginRight:"15%"}}>Email</label>
            <input
                className='input_text'
                type='email'
                placeholder='Enter your email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />  
            <label className='labelsign'  style={{marginTop:"10px",marginRight:"12%"}}>Password</label>
            <input
                className='input_text'
                type='password'
                placeholder='Enter your password' 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />  
            <label className='labelsign'  style={{marginTop:"10px", marginRight:"10%"}}>Profile Picture</label>
          <div className='profilepicsignup'> 
            <input
          accept="image/*"
          style={{ display: 'none' }}
          id="profile-picture"
          type="file"
          onChange={UploadImage}
            />
          <label htmlFor="profile-picture" >
          <IconButton component="span" className='profileiconcircle'>
            <Avatar>
              {profilepp ? (
                <img src={(profilepp)} alt="Profile" style={{ width: '100%', height: '100%' }} />
              ) : (
                <AccountCircle  fontSize="large" style={{ color: '#7f56da' }} />
              )}
            </Avatar>
          </IconButton>
          </label>
          </div>
          {message && <div style={{color:"red"}}>{message}</div>}
          <button className='buttonRegister' type='submit' disabled={loading}>
      
                        {loading ? <CircularProgress size={24} /> : 'Register'}
              
            </button>
      </form>
    </div>
  );
}

export default Signup;
