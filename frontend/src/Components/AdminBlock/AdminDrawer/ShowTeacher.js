import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDeletedComponents, ShowTeacherList } from '../../../Redux/userRelated/userHandle';
import TableCell ,{tableCellClasses} from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { TableContainer, TableRow,Table, TableHead ,TableBody } from '@mui/material';
import Paper from '@mui/material/Paper';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PlaygroundSpeedDial from '../../Toast/SpeeddDial';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';

import DeleteConfirm from '../../Toast/DeleteConfirm';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ShowTeacher = () => {
  const dispatch = useDispatch();
  const[selectedId,setSelectedId] = useState();
  const {currentUser,teachersList,deleteComponent,loading} = useSelector((state) =>state.user);
  console.log(currentUser);
  console.log(teachersList);
  const role = "teachers"
  const navigate = useNavigate();


  useEffect(() =>{
    dispatch(ShowTeacherList(currentUser));
    if(deleteComponent === false){
      setSelectedId("");
    }

  },[deleteComponent,currentUser,dispatch]);
  
  const singleDeleteHandler =(id) =>{
    dispatch(setDeletedComponents());
    setSelectedId(id);
  }

  const actions = [
    {
        icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Teacher',
        action: () => navigate(`/ChooseCourse/${role}`)
    },
    {
        icon: <PersonRemoveIcon color="error" />, name: 'Delete All Teachers',
        action: () => deleteHandler()
    },
];

 const deleteHandler =() =>{
  dispatch(setDeletedComponents());
 }

  
  return (
    
    <>
      {!loading? <>
      {!deleteComponent && <TableContainer component={Paper}>
        <Table sx={{minWidth:700}} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Course</StyledTableCell>
              <StyledTableCell align='right'>Branch</StyledTableCell>
              <StyledTableCell align='right'>Year&nbsp;(yrs)</StyledTableCell>
              <StyledTableCell align='right'>Semester&nbsp;(sem)</StyledTableCell>
              <StyledTableCell align='right'>Section&nbsp;(sec)</StyledTableCell>
              <StyledTableCell align='right'>Subject&nbsp;(sub)</StyledTableCell>
              <StyledTableCell align='right'>Teacher Name &nbsp;(nam)</StyledTableCell>
              <StyledTableCell align='right'>Action&nbsp;(act)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {teachersList?.map((teacher) => (
           <StyledTableRow key={teacher._id}>
             <StyledTableCell component="th" scope="row">{teacher?.course?.course}</StyledTableCell>
             <StyledTableCell align="right">{teacher?.course?.branch}</StyledTableCell>
             <StyledTableCell align="right">{teacher?.course?.year}</StyledTableCell>
             <StyledTableCell align="right">{teacher?.course?.semester}</StyledTableCell>
             <StyledTableCell align="right">{teacher?.course?.section}</StyledTableCell>
             <StyledTableCell align="right">{teacher?.subject}</StyledTableCell>
             <StyledTableCell align="right">{teacher?.username}</StyledTableCell>
             <StyledTableCell align='right'>
              <PersonRemoveIcon color="error"
              onClick={(e) => singleDeleteHandler(teacher?._id)}
              style={{cursor:"pointer",padding:"1px"}} 
              className='singleDeleteIcon' />
             </StyledTableCell>
           </StyledTableRow>
           ))}
          </TableBody>
        </Table>
        </TableContainer>}
        <PlaygroundSpeedDial actions={actions}/>
        {teachersList?.length === 0 || !teachersList ? (
          <h1 style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            No teacher added till now
            </h1>
        ):null}
        {deleteComponent && <DeleteConfirm role={role} selectedId={selectedId}/>}
      </>: <h1 className='courseDetail' style={{marginTop:"50px"}}>Loading...</h1>
      }
    </>
  )
}

export default ShowTeacher