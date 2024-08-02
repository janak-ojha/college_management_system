import React from 'react'
import { useSelector } from "react-redux";
 import "../AdminHome/AdminHome.css";

const AdminProfile = () => {
  const {currentUser} = useSelector(state => state.user);
  return (
    <>
    <div className="adminhome" style={{marginTop:'50px'}}>
      <h1>Admin</h1>
      <div>
        <div className="adminImg">
          <img src={currentUser?.profileDP} alt="img" />
        </div>
        <div className="adminName">{currentUser?.username}</div>
        <div className="adminName">CollgeName: {currentUser?.collegename}</div>
      </div>
    </div>
  </>
  )
}

export default AdminProfile