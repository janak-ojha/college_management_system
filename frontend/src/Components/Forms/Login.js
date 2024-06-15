import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Grid, Paper, Box, Typography, TextField, IconButton, InputAdornment, FormControlLabel,Checkbox, Button, CircularProgress } from '@mui/material';
import {  Visibility, VisibilityOff } from '@mui/icons-material';
import styled from 'styled-components';
import Students from "../../Assets/Student.jpg";
import Facultys from "../../Assets/Faculty.jpeg";
import Admins from "../../Assets/Admin.jpg";

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;


const defaultTheme = createTheme();

const Login = ({ role }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toggle, setToggle] = useState(false);
    const [message,setMessage] =useState(false);
    const [loginClicked, setLoginClicked] = useState(false);
    const [loader,setLoader] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    const GuestHandler =(e) =>{
        e.preventDefault();
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
                            {role} Login
                        </Typography>
                        <Typography variant='h7'>
                            Welcome back! Please enter your details.
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Enter your Email"
                                name="email"
                                autoComplete='email'
                                autoFocus
                                error={loginClicked && email === ""}
                                helperText={loginClicked && email === "" && 'Email is required'}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id="password"
                                label="Enter your Password"
                                type={toggle ? 'text' : 'password'}
                                name="password"
                                autoComplete="current-password"
                                autoFocus
                                error={loginClicked && password === ""}
                                helperText={loginClicked && password === "" && "Password is required"}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setToggle(!toggle)}
                                                edge="end"
                                            >
                                                {toggle ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {message && <p className='errorlogin courseDetail' style={{color:"red",marginTop:"5px"}}>{message}</p>}
                            <Grid container sx={{ display:"flex", justifyContent:"space-between"}}>
                                <FormControlLabel
                                     control={<Checkbox value="remember" color='primary'/>}
                                     label="Remember me"
                                />
                                <StyledLink to ={`/resetpassword/${role}`}>
                                   Forget password? 
                                </StyledLink>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant='contained'
                                sx={{mt:3}}
                            >
                                {loader ?
                                  <CircularProgress size={24} color='inherit'/>
                                  :"Login"
                                }
                            </Button>
                            <Button
                            type='submit'
                            fullWidth
                            variant='outlined'
                            onClick={GuestHandler}
                            sx={{ mt: 2, mb:3,color:'#7F56DA' ,borderColor:"#7F56DA"}}
                            >
                                login as guest
                            </Button>
                            {role === "Admin" &&
                            <Grid container>
                                <Grid>
                                    Don't have an account
                                </Grid>
                                <Grid item sx={{ml:2}}>
                                    <StyledLink to="registerAdmin">
                                        Sign up 
                                    </StyledLink>

                                </Grid>
                            </Grid>}
                        </Box>
                    </Box>
                </Grid>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${
                        role === "Admin"
                        ? Admins
                        : role === "Faculty"
                        ? Facultys
                        : Students
                    })`,
                    backgroundRepeat:"no-repeat",
                    backgroundColor: (t) =>
                        t.palette.mode === 'ligth' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize:"cover",
                    backgroundPosition:"center",

                    
                }}
           />

            </Grid>
        </ThemeProvider>
    );
};

export default Login;
