import React from 'react';
import {link,useNavigate} from "react-router-dom";


const Homes = () => {

  const Navigate = useNavigate();
    const Adminblockentry = (e) => {
        e.preventDefault();
        Navigate("/adminhome");
    }
  return (
    <div className='HomeDiv'>
      <div onClick={Adminblockentry} className='HomeDiv1'>Admin

      </div>
      <div className='HomeDiv2'>Student</div>
      <div className='HomDiv3'>Faculty</div>
    </div>
  )
}

export default Homes