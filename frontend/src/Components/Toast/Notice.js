import { Button, Container, CssBaseline, TextField, Typography } from '@mui/material'
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from "@mui/material/Box"
import {useDispatch,useSelector} from "react-redux";
const defaultTheme = createTheme();

const Notice = ({role}) => {
    const dispatch = useDispatch();
    const {currentUser,status,response} = useSelector((state) => state.user);

    const handleSubmit =(event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let notice = data.get("Notice");
        let collegeid;
        if(role === "Admin"){
            collegeid = currentUser?._id;
        }else if(role === "Teacher"){
            collegeid = currentUser?.collegeid
        }else{
            console.log("Not for student");
        }

        let fields = {notice , role , collegeid};
        dispatch(sendNotice(fields,currentUser));
    };

  return (
     <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md" style={{marginTop:"50px"}}>
            <CssBaseline/>
            <Box
             md= {{
                marginTop:8,
                display:"flex",
                flexDirection:"column",
                alignItem:"center",
             }}
            >
                <Typography component="h1" variant='h5'>
                    Add Notice
                </Typography>
                <Box component="form" onSubmit={handleSubmit} md={{mt:1}}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      id="Notice"
                      label="Notice"
                      autoComplete='Notice'
                      autoFocus
                      multiline
                      rows={15}
                    />
                    <Button
                     type='submit'
                     fullWidth
                     variant='contained'
                     sx={{ mt: 3, mb: 2}}
                    >
                        Send Notice
                    </Button>
                </Box>
            </Box>
        </Container>
     </ThemeProvider>
  )
}

export default Notice