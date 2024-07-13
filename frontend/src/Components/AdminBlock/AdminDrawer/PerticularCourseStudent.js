import React from 'react'
import { useSelector } from 'react-redux'

const PerticularCourseStudent = () => {
    const {studentsList,currentUser,courseStudentsList ,deleteComponent,loading} = useSelector(
        (state) => state.user
    );
  return (
    <>
    {!deleteComponent  && <div>
        <div>
            <h1>Course Detail</h1>
            <h2>
                Course:{course},Branch:{branch},Year:{year},Semester:{semester},
                Section:{section}
            </h2>
        </div>
    </div>
    }
    </>
  )
}

export default PerticularCourseStudent