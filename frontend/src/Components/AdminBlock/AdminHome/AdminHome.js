import Container from '@mui/material/Container';
import Grid  from '@mui/material/Grid';
import React from 'react';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import Classes_img from "../../../Assets/classes_img.jpg";
import Teachers from "../../../Assets/Faculty.jpeg";
import Fees from "../../../Assets/Fees.png";
import Students from "../../../Assets/Student.jpg";
import './AdminHome.css';
import ShowNotice from '../../Toast/ShowNotice';
const AdminHome = () => {
  return (
    <>
    <Container className='adminhome' maxWidth="lg" sx={{mt:4,mb:4}}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} lg={3}>
          <StyledPaper>
            <Image src={Classes_img} alt="Classes_img"/>
            <Title> Total Classes/Sections</Title>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <StyledPaper>
            <Image src={Teachers} alt='Teachers'/>
            <Title>Total Faculties</Title>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <StyledPaper>
            <Image src={Students} alt='Students'/>
            <Title>Total Students</Title>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <StyledPaper>
            <Image src={Fees} alt="Fees"/>
            <Title>Fees collections</Title>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper sx={{p:2 ,display:"flex" ,flexDirection:"column"}}>
            <ShowNotice/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
   
    </>
  );
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
  width: 80px; /* Adjust the width as needed */
  height: 80px; /* Adjust the height as needed */
`;


const Title= styled.p`
font-size:1.25rem;
`

export default AdminHome