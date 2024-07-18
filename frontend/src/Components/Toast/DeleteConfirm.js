import React from 'react'
import './DeleteConfirm.css'
import { useDispatch, useSelector } from 'react-redux'
import { cancelDelete, deleteAll, deleteOne } from '../../Redux/userRelated/userHandle';
import { deleteOneCourse } from '../../Redux/CourseRelated/CourseHandle';

const DeleteConfirm = ({role, selectedId}) => {
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch();

    console.log(selectedId);

    const deleteAccount = async() => {
        console.log(selectedId);
        if (selectedId === null || selectedId === "") {
          dispatch(deleteAll(currentUser, role));
        } else {
          if(role === "courses"){
             dispatch(deleteOneCourse(currentUser, role, selectedId));
          } else {
             dispatch(deleteOne(currentUser, role, selectedId));
          }
        }
        dispatch(cancelDelete());
    }

    const cancel = () => {
        dispatch(cancelDelete());
    }

    return (
        <div className="logouts1">
            <div className='logout'>
                <h1 className='h1'>Confirm to delete.</h1>
                <div className="buttons">
                    <button onClick={deleteAccount} className='ok'>Ok</button>
                    <button onClick={cancel} className='cancel'>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirm;
