import React from 'react'
import "./FirstHome.css";
import student12 from "../../Assets/student12.png"
import {Navigate, link,useNavigate} from 'react-router-dom';

const FirstHome = () => {
    const Navigate = useNavigate();
    const Starter = (e) => {
        e.preventDefault();
        Navigate("/home");
    }


  return (
    <div className='FirstHomeContainer'>
        <div className='FirstHomeSide1'>
        <img src={student12} alt="student12" className='FirstHomeImage' />
        </div>
        <div className='FirstHomeSide2'>
        <h1 className='a'> Welcome  to </h1>
        <h1 className='b'> College Management </h1>
        <h1 className='c'> System</h1>
        <br></br>
        <br></br>

        <p>Streamline school Management,class organization</p>
         <p>and add student and faculty,Seamlessly track</p>
        <p>attendance ,assess,performance,and provide,feedback.</p>
        <p>Access records,view marks ,and communicate effortlessly.</p>

        <button onClick={Starter} className='firstHomeButton'>Lets Go</button>

        </div>


    </div>
  )
}

export default FirstHome