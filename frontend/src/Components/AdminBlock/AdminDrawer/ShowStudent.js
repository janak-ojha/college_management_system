import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TableContainer } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ShowStudentsList,setDeletedComponents } from '../../../Redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt';
import {tableCellClasses} from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import PlayGroundSpeedDial from "../../Toast/SpeeddDial";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ShowStudent = () => {
  const { currentUser, studentsList, deleteComponent, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState("");
  const role = "students";




  const groupedData = Array.from(
    new Set(
      studentsList?.map(
        (item) =>
          `${item.course}-${item.branch}-${item.year}-${item.semester}-${item.section}`
      )
    )
  ).map((key) => { 
    const matchingItems = studentsList?.filter(
      (item) =>
        `${item.course}-${item.branch}-${item.year}-${item.semester}-${item.section}` === key
    );
    const noOfStudents = matchingItems.length;
  
  
    return {
      ...matchingItems[0],
      noOfStudents,
    };
    
  });
 

  useEffect(() => {
    dispatch(ShowStudentsList(currentUser));
    if (deleteComponent === false) {
      setSelectedId("");
    }
  }, [deleteComponent,dispatch,currentUser]);

  const actions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />,
      name: "Add New Student",
      action: () => navigate(`/Choose/Course/${role}`)
    },
    {
      icon: <PersonAddAlt1Icon color="error" />,
      name: 'Delete all student',
      action: () => deleteHandler()
    }
  ];

  const deleteHandler = () => {
    dispatch(setDeletedComponents());
  };

  const viewHandler = (e, id) => {
    navigate(`/perticularcoursestudents/${id}`);
    e.preventDefault();
  };

  return (
    <>
    {!loading ?<>
    {!deleteComponent  && <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Course</StyledTableCell>
            <StyledTableCell align='right'>Branch</StyledTableCell>
            <StyledTableCell align='right'>Year&nbsp;(yrs)</StyledTableCell>
            <StyledTableCell align='right'>Semester&nbsp;(sem)</StyledTableCell>
            <StyledTableCell align='right'>Section&nbsp;(sec)</StyledTableCell>
            <StyledTableCell align='right'>No.of.Students&nbsp;(num)</StyledTableCell>
            <StyledTableCell align='right'>Action&nbsp;(Ac)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupedData?.map((student) => (
            <StyledTableRow key={student?._id || student.course + student.branch + student.year + student.semester + student.section}>
              <StyledTableCell component="th" scope='row'>{student?.course}</StyledTableCell>
              <StyledTableCell align='right'>{student.branch}</StyledTableCell>
              <StyledTableCell align='right'>{student.year}</StyledTableCell>
              <StyledTableCell align='right'>{student.semester}</StyledTableCell>
              <StyledTableCell align='right'>{student.section}</StyledTableCell>
              <StyledTableCell align='right'>{student.noOfStudents}</StyledTableCell>
              <StyledTableCell align='right'>
                <Button variant='contained' className='viewButton' onClick={(e) => viewHandler(e, student._id)}>
                  View
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>}
      <PlayGroundSpeedDial action={actions}/>
      {studentsList?.length === 0 || !studentsList ?(
        <h1 style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          No student are added till now</h1>
      ):null}
      {deleteComponent && <DeleteConfirm role={role} selectedId={selectedId}/>}
      </>: <h1 className='"courseDetail' style={{marginTop:"50px"}}>loading...</h1> }
    </>
  );
};

export default ShowStudent;
