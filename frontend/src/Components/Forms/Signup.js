import React, { useState } from 'react';
import './signup.css';
import { Avatar, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import {Link} from 'react-router-dom'



const Signup = () => {
    const [username,setUsername]= useState("");
    const [collagename,setCollagename]= useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [profilepp,setProfilepp] = useState("");
    const [message,setMessage] = useState("");

    const UploadImage =async(e) =>{
        const file = e.target.value
        const base64 = await convertToBase64(file)
        setProfilepp(base64)
    }

    const convertToBase64 = async(file) => {
        const filereader =new FileReader();
        filereader.readAsDataURL(file);
        
        return new Promise((resolve,reject) =>  {
            filereader.onload= () => {
                resolve(filereader.result);
            };
            filereader.onerror = (error) =>{
                reject(error);
            };
        });

    };


    

  return (

    <div className='signupContainer'>
      <div className='registerTitle' style={{fontFamily:"sans-serif",fontSize:"55px",marginTop:"20px",}}>Register</div>
      <form className='registerForm' style={{display:"flex" ,flexDirection:"column",alignItems:"center",marginTop:"20px"}}>
            <label className='labelsign' style={{ marginRight:"12%"}}>Username</label>
            <input
               className='input_text'
               type='text'
               placeholder='Enter your name'
               required
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />  
            <label className='labelsign'  style={{marginTop:"10px", marginRight:'10%'}}>College Name</label>
            <input
                className='input_text'
                type='text'
                placeholder='Enter your college name'
                required
                value={collagename}
                onChange={(e) => setCollagename(e.target.value)}
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
          {message && <div style={{color:"red"}}>{message}</div>}
          </div>
          <Link to="/adminLogin" className='link'>
          <button className='buttonRegister' type='onsubmit' >register
           
          </button>
          </Link> 
        
      </form>

    </div>
  );
}

export default Signup;
