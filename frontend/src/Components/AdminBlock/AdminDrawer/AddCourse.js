import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


import { useDispatch, useSelector } from 'react-redux';
import { addCourse, cancelDelete } from '../../../Redux/userRelated/userHandle';
import AddedSuccessfu from "../../Toast/AddedSuccesfully"

const defaultTheme = createTheme();

const CourseSignIN = () => {
  const dispatch = useDispatch();
  const { currentUser, status, response } = useSelector((state) => state.user);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let course = data.get('Course');
    let branch = data.get('Branch');
    let year = data.get('Year');
    let semester = data.get('Semester');
    let section = data.get('Section');
    const fields = { course, branch, year, semester, section };
    dispatch(addCourse(fields, currentUser));
  };

  useEffect(() => {
    if (status === "added" || response === "Course already exists") {
      const timeout = setTimeout(() => {
        dispatch(cancelDelete());
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [status, response, dispatch]);



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container style={{borderRadius:"10px"}} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add Course
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Course"
              name="Course"
              label="Course"
              autoComplete="Course"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="Branch"
              label="Branch"
              name="Branch"
              type="Branch"
              autoComplete="current-Branch"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Year"
              label="Year"
              name="Year"
              type="Year"
              autoComplete="current-Year"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Semester"
              label="Semester"
              type="Semester"
              id="Semester"
              autoComplete="current-Semester"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Section"
              label="Section"
              type="Section"
              id="Section"
              autoComplete="current-Section"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Course
            </Button>
          </Box>
          {status === "added"? <AddedSuccessfu/>:""}
          {response === "Course already exists"?<p style={{color:"red"}}>{response}</p>:""}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CourseSignIN;
//hello/
