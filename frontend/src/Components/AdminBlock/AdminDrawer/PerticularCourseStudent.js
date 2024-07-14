import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { ShowStudentsList, singleCourseStudentList } from '../../../Redux/userRelated/userHandle';

const PerticularCourseStudent = () => {
    const {studentsList,currentUser,courseStudentsList ,deleteComponent,loading} = useSelector(
        (state) => state.user); 
    const [selectedId,setSelectedId] = useState();
    const params = useParams();
    const particularCourseId = params.id;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const role = "students";
    console.log(studentsList);  
    console.log(particularCourseId);
    const studentfilter = studentsList?.filter(
        (student) => student?._id === particularCourseId
    );
    const course = studentfilter?.length > 0 ? studentfilter[0]?.course : "";
    const branch = studentfilter?.length > 0 ? studentfilter[0]?.branch : "";
    const year = studentfilter?.length >0 ? studentfilter[0]?.year :"";
    const semester = studentfilter?.length>0 ? studentfilter[0]?.semester :"";
    const section = studentfilter?.length>0 ? studentfilter[0]?.section :"";
    const fields ={course,branch,year,semester,section};
    console.log(fields);

    useEffect(() =>{
        dispatch(ShowStudentsList(currentUser))
    },[deleteComponent]);

    useEffect(() =>{
        dispatch(singleCourseStudentList(fields,currentUser));
        if(deleteComponent === false){
            setSelectedId("");
        }
    },
    [deleteComponent,course,studentsList?.length]
);


        
  return (
    <>
    {!deleteComponent  && <div>
        <div className='courseDetail'>
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