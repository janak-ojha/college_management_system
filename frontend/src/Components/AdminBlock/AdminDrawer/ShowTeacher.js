import React from 'react'
import { useSelector } from 'react-redux'

const ShowTeacher = () => {
  const {currentUser,teachersList,deleteComponent,loading} = useSelector((state) =>state.user);
  
  return (
    
    <div>
      
      hello teacher
    </div>
  )
}

export default ShowTeacher