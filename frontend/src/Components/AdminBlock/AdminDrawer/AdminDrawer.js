import React, { useState } from 'react'
import { Box, CssBaseline, Divider, IconButton, Toolbar, Typography,List, ListItemButton, ListItemIcon} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import {Link,useLocation} from "react-router-dom";
import { styled, Drawer as MuiDrawer , AppBar as MuiAppBar } from "@mui/material";




const AdminDrawer = () => {
    const location = useLocation()
    const [open ,setOpen] = useState(false);
    const drawerWidth = 245;
    const toggleDrawer =() =>{
        setOpen(!open);
    };

    const styles = {
        drawerStyled:{
            display:"flex",
        },
        hideDrawer:{
            display:"flex",
            "@media(max-width:600px":{
                display:'none'
            }
        },
        toolBarStyled:{
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-end',
            px:[1]

        }

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
        " & .MuiDrawer-paper":{
            position:"relative",
            whiteSpace:"nowrap",
            width:drawerWidth,
            transition:theme.transitions.create("width",{
                easing:theme.transitions.easing.sharp,
                duration:theme.transitions.duration.enteringScreen,
            }),
        boxSizing:"borderbox",
        ...(!open && {
            oveflowX:"hidden",
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
       <Toolbar sx={{pr: "25px"}}>
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
                <ListItemButton component={Link} to= "/">
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
                </ListItemButton>
              </React.Fragment>
            </Drawer>
        </List>
      </Drawer>

    </Box>
    </>
  )
}

export default AdminDrawer