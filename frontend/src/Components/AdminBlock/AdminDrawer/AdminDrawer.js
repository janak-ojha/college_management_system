import React, { useState } from 'react'
import { Box, CssBaseline, Divider, IconButton, Toolbar, Typography,List, ListItemButton, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {Link,useLocation} from "react-router-dom";
import { styled, Drawer as MuiDrawer , AppBar as MuiAppBar } from "@mui/material";
import { Routes,Route } from 'react-router-dom';
import AdminHome from '../AdminHome/AdminHome';
import AddCourse from './AddCourse';
import AddStudent from './AddStudent.js';
import AddTeacher from './AddTeacher.js';
import ShowStudent from './ShowStudent.js';
import ShowTeacher from './ShowTeacher.js';
import ShowCourses from './ShowCourses.Js';
import Help from './Help.js';
import AdminProfile from './AdminProfile.js';
import AdminNotice from './AdminNotice.js';
import ChooseCourse from './ChooseCourse.js';
import PerticularCourseStudent from "./PerticularCourseStudent.js";
import StudentDetails from './StudentDetails.js';





const AdminDrawer = () => {
    const location = useLocation()
    const [open ,setOpen] = useState(false);
    const drawerWidth = 240;
    const toggleDrawer =() =>{
        setOpen(!open);
    };

    const styles = {
        drawerStyled:{
            display:"flex",
        },
        hideDrawer:{
            display:"flex",
            "@media(max-width:600px)":{
                display:'none'
            }
        },
        toolBarStyled:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-end',
            px:[1],

        },
        boxStyled:{
          backgroundColor:(theme) =>
            theme.palette.mode === "light"
             ? theme.palette.grey[100]
             : theme.palette.grey[900],
            flexGrow:1,
            height:"100vh",
            overflow: "auto", 
        },

    }

    const AppBar = styled(MuiAppBar,{
        shouldForwardProp:(prop) => prop !== "open",
    })(({theme,open}) =>({
        zIndex:theme.zIndex.drawer+1,
        transition:theme.transitions.create(["width","margin"],{
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft:drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition:theme.transitions.create(["width","margin"],{
                easing:theme.transitions.easing.sharp,
                duration:theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const Drawer = styled(MuiDrawer,{
        shouldForwardProp: (prop) => prop !== "open",
    })(({theme , open}) =>({
        "& .MuiDrawer-paper":{
            position:"relative",
            whiteSpace:"nowrap",
            width:drawerWidth,
            transition:theme.transitions.create("width",{
                easing:theme.transitions.easing.sharp,
                duration:theme.transitions.duration.enteringScreen,
            }),
        boxSizing:"border-box",
        overflowX:"hidden",
        ...(!open && {
            overflowX:"hidden",
            transition:theme.transitions.create("width",{
                easing:theme.transitions.easing.sharp,
                duration:theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]:{
                width: theme.spacing(9),
            },
        }),
        },
    }));


  return (
    <>
    <Box sx={{display:'flex'}}>
     <CssBaseline/>
      <AppBar open={open} position="absolute">
       <Toolbar sx={{pr: "24px"}}>
        <IconButton
           color='inherit'
           edge="start"
           aria-label='open drawer'
           onClick={toggleDrawer}
           sx={{
            marginRight:"36px",
            ...(open && {display:"none"}),
           }}
           >
            <MenuIcon/>
        </IconButton>
        <Typography
        component="h1"
        variant='h6'
        color="inherit"
        noWrap
        sx={{flexGrow:1}}
        >
          Admin Dashboard
        </Typography>
       </Toolbar>
      </AppBar>
      
      <Drawer 
      variant="permanent"
      open ={open}
      sx={open ? styles.drawerStyled : styles.hideDrawer}
      >
        <Toolbar sx={styles.toolBarStyled}>
            <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon/>
            </IconButton>
        </Toolbar>
        <Divider/>
        <List component="nav">
            <Drawer 
              variant='permanent'
              open={open}
            >
              <React.Fragment>
                <ListItemButton component={Link} to= "/adminhome">
                  <ListItemIcon>
                    <HomeIcon
                      color={
                        location.pathname === "/adminHome" || 
                        location.pathname === "/"
                        ? "primary"
                        : "inherit"
                      }
                    />
                  </ListItemIcon>  
                  <ListItemText primary="Home"/>
                </ListItemButton>
                <ListItemButton component={Link} to="/addcourse">
                  <ListItemIcon>
                    <PostAddIcon
                      style={{fontWeight:"bolder",fontSize:"23px"}}
                      color={
                        location.pathname.startsWith("/addcourse")
                        ? "primary"
                        : "inherit"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="add course"/>
                </ListItemButton>
                <ListItemButton component={Link} to ="/addstudent">
                  <ListItemIcon>
                    <PersonAddAltIcon
                       style={{fontWeight:"bolder" ,fontSize:"23px"}}
                       color={
                        location.pathname.startsWith("/addstudent")
                        ? "primary"
                        : "inherit"
                       }
                    />
                  </ListItemIcon>
                  <ListItemText primary="add Student"/>
                </ListItemButton>
                <ListItemButton component={Link} to ="/addteacher">
                <ListItemIcon>
                  <GroupAddIcon
                  style={{fontWeight:"bolder",fontSize:"23px"}}
                  color={
                    location.pathname.startsWith("/addteacher")
                    ? "primary"
                    : "inherit"
                  }
                  />
                </ListItemIcon>
                <ListItemText primary="add teacher"/>
                </ListItemButton>
                <ListItemButton component={Link} to ="/showstudent">
                  <ListItemIcon>
                    <PersonOutlineIcon
                    style={{fontWeight:"bolder", fontSize:"23px"}}
                    color={
                      location.pathname.startsWith("/showstudent")
                      ? "primary"
                      : 'inherit'
                    }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Students"/>
                </ListItemButton>
                <ListItemButton component={Link} to ="/showteacher">
                  <ListItemIcon>
                    <SupervisorAccountOutlinedIcon
                      style={{fontWeight:'bolder', fontSize:"23px"}}
                      color={
                        location.pathname.startsWith("/showteacher")
                        ? "primary"
                        : 'inherit'
                      }  
                    />
                  </ListItemIcon>
                  <ListItemText primary="Teachers"/>
                </ListItemButton>
                <ListItemButton component={Link} to="/adminnotice">
                   <ListItemIcon>
                    <NoteAltIcon
                     style={{fontWeight:"bolder", fontSize:"23px"}}
                     color ={
                      location.pathname.startsWith("/adminnotice")
                      ? "primary"
                      : "inherit"
                     }
                    />
                   </ListItemIcon>
                   <ListItemText primary="Notice"/>
                </ListItemButton>
              </React.Fragment>
              <Divider sx={{my:1}}/>
              <React.Fragment>
                <ListSubheader component="div" inset>
                  User
                </ListSubheader>
                <ListItemButton component={Link} to="/adminprofile">
                  <ListItemIcon>
                    <AccountCircleOutlinedIcon
                       color={
                        location.pathname.startsWith("/adminprofile")
                        ? "primary"
                        : "outlined"
                       }
                    />
                  </ListItemIcon>
                  <ListItemText primary="profile"/>
                </ListItemButton>
                <ListItemButton component={Link} to="/adminhelp">
                  <ListItemIcon>
                    <HelpOutlineIcon
                     color={
                      location.pathname.startsWith("/adminhelp")
                      ? "primary"
                      : "inherit"
                    }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Help"/>
                </ListItemButton>
                <ListItemButton component={Link} to="/adminlogout">
                  <ListItemIcon>
                    <ExitToAppIcon
                     color={
                      location.pathname.startsWith("/adminlogout")
                      ? 'primary'
                      : "inherit"
                     }
                     />
                  </ListItemIcon>
                  <ListItemText primary="Logout"/>
                </ListItemButton>
              </React.Fragment>
            </Drawer>
        </List>
      </Drawer>
      <Box component="main" sx={styles.boxStyled}>
        <Toolbar/>
        <Routes>
          <Route path='/adminHome' element={<AdminHome/>}/>
          <Route path='/addcourse' element={<AddCourse/>}/>
          <Route path='/addstudent' element={<AddStudent/>}/>
          <Route path='/addteacher' element={<AddTeacher/>}/>
          <Route path='/showstudent' element={<ShowStudent/>} />
          <Route path='/showteacher' element={<ShowTeacher/>} />
          <Route path='/showcourse' element={<ShowCourses/>} />
          <Route path='/adminhelp' element={<Help/>} />
          <Route path='/adminprofile' element={<AdminProfile/>} />
          <Route path='/adminnotice' element={<AdminNotice/> } />  
          <Route path='/chooseCourse/:role' element={<ChooseCourse/>}></Route>
          <Route path="/chooseaddteacher/:id" element={<AddTeacher />} />
          <Route path="/chooseaddstudent/:id" element={<AddStudent />} />
          <Route path="/perticularcoursestudent/:id" element={<PerticularCourseStudent/>}/>
          <Route path="/studentdetails/:id" element={<StudentDetails/>}/>
          
        </Routes>
      </Box>

    </Box>
    </>
  )
}

export default AdminDrawer