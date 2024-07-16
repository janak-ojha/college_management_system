import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setDeletedComponents, ShowStudentsList, singleCourseStudentList } from '../../../Redux/userRelated/userHandle';
import { TableContainer, Table, TableHead, TableRow, TableBody, Button } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import PlaygroundSpeedDial from "../../Toast/SpeeddDial";
import Paper from '@mui/material/Paper';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const PerticularCourseStudent = () => {
  const { studentsList, currentUser, courseStudentsList, deleteComponent, loading } = useSelector(
    (state) => state.user
  );
  const [selectedId, setSelectedId] = useState();
  const params = useParams();
  const particularCourseid = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = 'students';

  const studentfilter = studentsList?.filter(
    (student) => student?._id === particularCourseid
  );

  const course = studentfilter?.length > 0 ? studentfilter[0]?.course : '';
  const branch = studentfilter?.length > 0 ? studentfilter[0]?.branch : '';
  const year = studentfilter?.length > 0 ? studentfilter[0]?.year : '';
  const semester = studentfilter?.length > 0 ? studentfilter[0]?.semester : '';
  const section = studentfilter?.length > 0 ? studentfilter[0]?.section : '';

  useEffect(() => {
    if (!studentsList || studentsList.length === 0) {
      dispatch(ShowStudentsList(currentUser));
    }
  }, [deleteComponent, dispatch, currentUser]);

  useEffect(() => {
    if (course && branch && year && semester && section) {
      const fields = { course, branch, year, semester, section };
      dispatch(singleCourseStudentList(fields, currentUser));
      if (!deleteComponent) {
        setSelectedId('');
      }
    }
  }, [deleteComponent, course, branch, year, semester, section, studentsList?.length, currentUser, dispatch]);

  const actions = [
    {
      icon: <PersonAddAlt1Icon color='primary' />,
      name: 'Add New Student',
      action: () => navigate(`/ChooseCourse/${role}`)
    },
  ];

  const singleDeleteHandler = (id) => {
    setSelectedId(id);
    dispatch(setDeletedComponents());
  };

  const viewHandler = (id) => {
    navigate(`/studentdetails/${id}`);
  };

  return (
    <>
      {!deleteComponent && (
        <div>
          <div className='courseDetail'>
            <h1>Course Detail</h1>
            <h2>
              Course: {course}, Branch: {branch}, Year: {year}, Semester: {semester},
              Section: {section}
            </h2>
          </div>
          {!loading && courseStudentsList && courseStudentsList.length > 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Student Name</StyledTableCell>
                      <StyledTableCell align='right'>Action&nbsp;(Ac)</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {courseStudentsList.length !== 0 && courseStudentsList.map((student) => (
                      <StyledTableRow key={student._id}>
                        <StyledTableCell component='th' scope='row'>{student.username}</StyledTableCell>
                        <StyledTableCell align='right'>
                            {" "}
                          <PersonRemoveIcon
                            color='error'
                            onClick={() => singleDeleteHandler(student._id)}
                            style={{ cursor: 'pointer', padding: '1px', marginRight: '10px',}}
                            className='singleDeleteIcon'
                          />
                          <Button variant='contained' className='viewButton' style={{marginBottom:"10px"}} onClick={() => viewHandler(student._id)}>
                            View
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <PlaygroundSpeedDial actions={actions} />
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '50px',
              }}
            >
              Loading...
            </div>
          )}
        </div>
      )}
      {deleteComponent && <DeleteConfirm role={role} selectedId={selectedId} />}
    </>
  );
};

export default PerticularCourseStudent;
