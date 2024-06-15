import React from 'react';
import { Link } from "react-router-dom";


const Homes = () => {


  return (
    <div className='HomeDiv'>
      <Link to="/adminlogin" className='link'>
      <div  className='HomeDiv1'>Admin
      </div>
      </Link>
      <Link to="/studentlogin" className='link'>
      <div className='HomeDiv2'>Student</div>
      </Link>
      <Link to="/facultylogin" className='link'>
      <div className='HomDiv3'>Faculty</div>
      </Link>
    </div>
  )
}

export default Homes