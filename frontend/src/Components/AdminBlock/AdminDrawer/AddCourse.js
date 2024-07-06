import React from 'react'
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline ,Box, Typography, TextField, Button} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse,cancelDelete } from '../../../Redux/userRelated/userHandle';
const defaultTheme = createTheme();

const CourseSignIN = () => {
  const dispatch = useDispatch();
  const {currentUser,status,response} = useSelector((state) =>state.user);
  const handleSubmit=(event) =>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let course= data.get('Course');
    let branch = data.get('Branch');
    let year = data.get('Year');
    let semester = data.get("Semester");
    let section = data.get("Section");
    const fields ={course,branch,year,semester,section}
    dispatch(addCourse(fields,currentUser));
  };
  
  React.useEffect(() =>{
    if(status === "added" || response === "Course already exist"){
      const timeout = setTimeout(() =>{
        dispatch(cancelDelete())
      },1500);
      return() => clearTimeout(timeout);
    }
  },[status,response,dispatch]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box
        sx={{
          marginTop:8,
          display:'flex',
          flexDirection:'column',
          alignItems:"center",
        }}
        >
          <Typography
          component="h1"
          variant='h5'
          >
            AddCourse
          </Typography>
          <Box
            component="form" onSubmit={handleSubmit} sx={{mt:1}}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id="Course"
              name='Course'
              label="Course"
              autoComplete='Course'
              autoFocus
            />
            <TextField
             margin='normal'
             fullWidth
             id="Branch"
             label="Branch"
             name="Branch"
             type='Branch'
             autoComplete='current-Branch'
            />
            <TextField
             margin='normal'
             required
             fullWidth
             id='Year'
             label="Year"
             name='Year'
             type='Year'
             autoComplete='current-Year'
            />
            <TextField
             margin='normal'
             required
             fullWidth
             name='Semester'
             label="Semester"
             type='Semester'
             id="Semester"
             autoComplete='current-Semester'
            />
            <TextField
             margin='normal'
             required
             fullWidth
             name='Section'
             label="Section"
             type='Section'
             id='Section'
             autoComplete='current-Section'
            />
            <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{mt:3, mb:2}}
            >
              Create Course
            </Button>
          </Box>
            
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default CourseSignIN