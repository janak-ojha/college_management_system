import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirm from "../../Toast/DeleteConfirm";
import PlaygroundSpeedDial from "../../Toast/SpeeddDial"; // Check the correct path
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from "react-router-dom";
import { setDeletedComponents } from "../../../Redux/userRelated/userHandle";
import { totalCourses } from "../../../Redux/CourseRelated/CourseHandle";
import Box from "@mui/material/Box"; // Correct import for Box

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

const ShowCourse = () => {
  const { currentUser, deleteComponent } = useSelector((state) => state.user);
  const { coursesList, loading, response, error } = useSelector((state) => state.course);
  const [selectedId, setSelectedId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = "courses";
  console.log(coursesList);

  useEffect(() => {
    dispatch(totalCourses(currentUser));
    if (deleteComponent === false) {
      setSelectedId("");
    }
  }, [deleteComponent, currentUser, dispatch]);

  const actions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />,
      name: 'Add New Course Detail',
      action: () => navigate(`/addcourse`)
    },
  ];

  const singleDeleteHandler = (id) => {
    dispatch(setDeletedComponents());
    setSelectedId(id);
  }

  return (
    <>
      {!loading ? 
        <>
          {!deleteComponent && 
            <Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Course</StyledTableCell>
                      <StyledTableCell align="right">Branch</StyledTableCell>
                      <StyledTableCell align="right">Year&nbsp;(yrs)</StyledTableCell>
                      <StyledTableCell align="right">Semester&nbsp;(sem)</StyledTableCell>
                      <StyledTableCell align="right">Section&nbsp;(sec)</StyledTableCell>
                      <StyledTableCell align="right">Action&nbsp;(Ac)</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {coursesList?.map((course) => (
                      <StyledTableRow key={course._id}>
                        <StyledTableCell component="th" scope="row">
                          {course.course}
                        </StyledTableCell>
                        <StyledTableCell align="right">{course.branch}</StyledTableCell>
                        <StyledTableCell align="right">{course.year}</StyledTableCell>
                        <StyledTableCell align="right">{course.semester}</StyledTableCell>
                        <StyledTableCell align="right">{course.section}</StyledTableCell>
                        <StyledTableCell align="right">
                          <DeleteIcon
                            color="error"
                            onClick={() => singleDeleteHandler(course._id)}
                            style={{ cursor: "pointer", padding: "1px" }}
                            className="singleDeleteIcon" // Make sure this class is defined
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <PlaygroundSpeedDial actions={actions} /> {/* Check import path */}
            </Box>
          }
          {deleteComponent && <DeleteConfirm role={role} selectedId={selectedId} />}
        </>
       : 
        <h1 className="courseDetail" style={{ marginTop: "50px" }}> loading... </h1>
      }
    </>
  );
};

export default ShowCourse;
