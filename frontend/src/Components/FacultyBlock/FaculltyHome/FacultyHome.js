import React from 'react'
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import Students from "../../../Assets/student12.png";
import { useEffect } from "react";
import {
  singleCourseStudentList,
} from "../../../Redux/userRelated/userHandle";
import ShowNotice from "../../Toast/ShowNotices";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));


const FacultyHome = () => {
    const {currentUser,courseStudentsList,loading} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const course = currentUser?.course;
  const branch = currentUser?.branch;
  const year = currentUser?.year;
  const semester = currentUser?.semester;
  const section = currentUser?.section;
  let collegename = currentUser?.collegeid; 
  const fields = {course, branch, year, semester, section,collegename};

  useEffect(() => {
    dispatch(singleCourseStudentList(fields,currentUser));
  },[])
  
  return (
    <>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} lg={3}>
          <StyledPaper>
            <Image src={Students} alt="Students" />
            <Title>Total Students</Title>
            <Data start={0} end={courseStudentsList?.length} duration={1.5} />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <ShowNotice />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </>
  )
};

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Image = styled.img`
  width: 80px; 
  height: 80px; 
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: green;
`;

export default FacultyHome