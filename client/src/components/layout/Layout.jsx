import React from 'react'
import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {

    const drawerWidth = 340

    const navData = [
        {name: 'Dashboard', path: '/'},
        {name: 'Transactions', path: '/charts'},
        {name: 'Charts', path: '/charts'},
        {name: 'Profile', path: '/profile'},
    ]

  return (
    <Box sx={{display: 'flex'}}>
      <AppBar position='fixed' sx={{zIndex: 1201, backgroundColor: 'white', color: 'black'}}>
        <Toolbar>
            <Typography>
                My APP
            </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
       variant="permanent"
       sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
      >
         <Toolbar />
         <List>
          {
            navData.map((index) => (
                <ListItem key={index.key}>
                <ListItemText primary={index.name} />
            </ListItem>
            ))
          }
         </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
