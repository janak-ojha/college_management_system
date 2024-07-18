import React from 'react'
import Notice from "../../Toast/Notice";

const AdminNotice = () => {
  let role= "Admin";
  return (
    <div>
      <Notice role ={role}/>
    </div>
  )
}

export default AdminNotice