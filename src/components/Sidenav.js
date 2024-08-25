


import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Toolbar, Typography } from '@mui/material';
import { MenuBook as MenuBookIcon } from '@mui/icons-material';

const drawerWidth = 240;

const Sidenav = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'RGPR-GP', icon: <MenuBookIcon style={{ color: 'orange' }} />, path: '/rgpr-gp' },
    { text: '1Q-MSI-GP', icon: <MenuBookIcon style={{ color: 'orange' }} />, path: '/1q-msi-gp' },
    { text: '3Q-MSI-GP', icon: <MenuBookIcon style={{ color: 'orange' }} />, path: '/3q-msi-gp' },
    { text: 'AG-GP', icon: <MenuBookIcon style={{ color: 'orange' }} />, path: '/ag-gp' },
    { text: 'GLP&SL-GP', icon: <MenuBookIcon style={{ color: 'orange' }} />, path: '/glpsl-gp' },
    { text: 'TMP-GP', icon: <MenuBookIcon style={{ color: 'orange' }} />, path: '/tmp-gp' },
  ];

  const additionalMenuItems = [
    { text: 'RGPR-PP', icon: <MenuBookIcon style={{ color: 'red' }} />, path: '/rgpr-pp' },
    { text: '1Q-MSI-PP', icon: <MenuBookIcon style={{ color: 'red' }} />, path: '/1q-msi-pp' },
    { text: '3Q-MSI-PP', icon: <MenuBookIcon style={{ color: 'red' }} />, path: '/3q-msi-pp' },
    { text: 'AG-PP', icon: <MenuBookIcon style={{ color: 'red' }} />, path: '/ag-pp' },
    { text: 'GLP&SL-PP', icon: <MenuBookIcon style={{ color: 'red' }} />, path: '/glpsl-pp' },
    { text: 'TMP-PP', icon: <MenuBookIcon style={{ color: 'red' }} />, path: '/tmp-pp' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            color: 'blue',
            marginLeft: 0, // Remove left margin
            marginRight: 0, // Remove right margin
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ minHeight: '48px' }} /> {/* Adjust Toolbar height */}
        <Divider />
        <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleNavigation(item.path)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
          {additionalMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleNavigation(item.path)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 0, marginLeft: 0, marginRight: 0 }} // Remove left and right margins
      >
        <Toolbar sx={{ minHeight: '48px' }} /> {/* Adjust Toolbar height */}
        <Typography variant="h6" noWrap component="div"></Typography>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Sidenav;
