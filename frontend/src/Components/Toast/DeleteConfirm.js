import React from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { deleteOneCourse } from '../../Redux/CourseRelated/CourseHandle';
import { deleteOne,cancelDelete,deleteAll} from "../../Redux/userRelated/userHandle";


const DeleteConfirm = ({role,selectedId}) => {
    const {currentUser} =   useSelector((state) =>state.user);
    const dispatch = useDispatch();

    const deleteAccount = async() =>{
        if(selectedId === null || selectedId === "")
        {
            dispatch(deleteAll(currentUser,role));
            dispatch(cancelDelete());
            console.log("null");
        }else{
            if(role === "courses"){
                dispatch(deleteOneCourse(currentUser,role,selectedId));
                console.log(selectedId);
                dispatch(cancelDelete);
            }else{
                dispatch(deleteOne(currentUser,role,selectedId));
                console.log(selectedId);
                dispatch(cancelDelete())
            }
        }
    }
    
    const cancel = () => {
        dispatch(cancelDelete());
    }

  return (
    <div className='logout1'>
        <div className='logout'>
            <h1 className='h1'>Confirm to delete</h1>
            <div className='buttons'> 
                <button onClick={deleteAccount}>ok</button>
                <button onClick={cancel}>cancel</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteConfirm