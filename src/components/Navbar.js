// import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { styled, alpha } from '@mui/material/styles';
// import MuiAppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import AnchorIcon from '@mui/icons-material/Anchor';
// import HomeIcon from '@mui/icons-material/Home';
// import NoteAddIcon from '@mui/icons-material/NoteAdd';
// import ExtensionIcon from '@mui/icons-material/Extension';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import WorkIcon from '@mui/icons-material/Work';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Import the ExitToApp icon
// import { Button } from '@mui/material';

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme }) => ({
//   zIndex: theme.zIndex.drawer + 1,
// }));

// const SRLookupButton = styled(IconButton)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   gap: theme.spacing(1),
//   color: 'inherit',
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//   },
//   margin: '0 16px',
// }));

// export default function Navbar() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const navigate = useNavigate();
//   const isMenuOpen = Boolean(anchorEl);

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleH3Click = () => {
//     navigate('/h3-pp');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Clear token from local storage
//     navigate('/home'); // Redirect to login page
//   };

//   const menuId = 'primary-search-account-menu';
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{
//         vertical: 'top',
//         horizontal: 'left',
//       }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'left',
//       }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem component={Link} to="/SRDetailsLookup" onClick={handleMenuClose}>
//         SR Details
//       </MenuItem>
//       <MenuItem component={Link} to="/RegisterForm" onClick={handleMenuClose}>
//         Register Form
//       </MenuItem>
//       <MenuItem component={Link} to="/WO" onClick={handleMenuClose}>
//         WO
//       </MenuItem>
//     </Menu>
//   );

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="fixed">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="logo"
//             component={Link}
//             to="/"
//             sx={{ margin: '0 16px' }}
//           >
//             <img src="/MGVCL-LOGO.png" alt="MGVCL Logo" style={{ height: 40 }} />
//           </IconButton>
//           <IconButton
//             size="large"
//             edge="end"
//             color="inherit"
//             aria-label="home"
//             component={Link}
//             to="/"
//             sx={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}
//           >
//             <HomeIcon sx={{ marginRight: 1 }} />
//             <Typography variant="body2">Home</Typography>
//           </IconButton>
//           <IconButton
//             size="large"
//             edge="end"
//             color="inherit"
//             aria-label="H3"
//             sx={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}
//             onClick={handleH3Click}
//           >
//             <AnchorIcon sx={{ marginRight: 1 }} />
//             <Typography variant="body2">H3</Typography>
//           </IconButton>
//           <Button
//             color="inherit"
//             component={Link}
//             to="/RegisterForm"
//             sx={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}
//           >
//             <NoteAddIcon sx={{ marginRight: 1 }} />
//             Register Form
//           </Button>
//           <Button
//             color="inherit"
//             component={Link}
//             to="/LeLr"
//             sx={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}
//           >
//             <ExtensionIcon sx={{ marginRight: 1 }} />
//             LE/LR
//           </Button>
//           <SRLookupButton
//             size="large"
//             aria-label="SR Details Lookup"
//             component={Link}
//             to="/SRDetailsLookup"
//             sx={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}
//           >
//             <SearchIcon sx={{ marginRight: 1 }} />
//             <Typography variant="body2">SR Details</Typography>
//           </SRLookupButton>
//           <Button
//             color="inherit"
//             component={Link}
//             to="/WO"
//             sx={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}
//           >
//             <WorkIcon sx={{ marginRight: 1 }} />
//             WO
//           </Button>
//           <IconButton
//             size="large"
//             edge="end"
//             color="inherit"
//             aria-label="more"
//             component={Link}
//             to="/more"
//             sx={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}
//           >
//             <MoreHorizIcon sx={{ marginRight: 1 }} />
//             <Typography variant="body2">More</Typography>
//           </IconButton>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1 }}
//           >
//           </Typography>
//           <Button
//             color="inherit"
//             onClick={handleLogout}
//             sx={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}
//           >
//             <ExitToAppIcon sx={{ marginRight: 1 }} />  {/* Added Logout icon */}
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>
//       {renderMenu}
//     </Box>
//   );
// }


import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AnchorIcon from '@mui/icons-material/Anchor';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ExtensionIcon from '@mui/icons-material/Extension';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import WorkIcon from '@mui/icons-material/Work';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Import the ExitToApp icon
import DashboardIcon from '@mui/icons-material/Dashboard'; // Import the Dashboard icon
import { Button } from '@mui/material';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const SRLookupButton = styled(IconButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: 'inherit',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  margin: '0 16px',
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleH3Click = () => {
    navigate('/h3-pp');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage
    navigate('/'); // Redirect to login page
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to="/SRDetailsLookup" onClick={handleMenuClose}>
        SR Details
      </MenuItem>
      <MenuItem component={Link} to="/RegisterForm" onClick={handleMenuClose}>
        Register Form
      </MenuItem>
      <MenuItem component={Link} to="/WO" onClick={handleMenuClose}>
        WO
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            component={Link}
            to="/Dashboard"
            sx={{ margin: '0 16px' }}
          >
            <img src="/MGVCL-LOGO.png" alt="MGVCL Logo" style={{ height: 40 }} />
          </IconButton>
          <Button
            color="inherit"
            component={Link}
            to="/Dashboard" // Link to the dashboard
            sx={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}
          >
            <DashboardIcon sx={{ marginRight: 1 }} /> {/* Dashboard icon */}
            Dashboard
          </Button>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="H3"
            sx={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}
            onClick={handleH3Click}
          >
            <AnchorIcon sx={{ marginRight: 1 }} />
            <Typography variant="body2">H3</Typography>
          </IconButton>
          <Button
            color="inherit"
            component={Link}
            to="/RegisterForm"
            sx={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}
          >
            <NoteAddIcon sx={{ marginRight: 1 }} />
            Register Form
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/LeLr"
            sx={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}
          >
            <ExtensionIcon sx={{ marginRight: 1 }} />
            LE/LR
          </Button>
          <SRLookupButton
            size="large"
            aria-label="SR Details Lookup"
            component={Link}
            to="/SRDetailsLookup"
            sx={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}
          >
            <SearchIcon sx={{ marginRight: 1 }} />
            <Typography variant="body2">SR Details</Typography>
          </SRLookupButton>
          <Button
            color="inherit"
            component={Link}
            to="/WO"
            sx={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}
          >
            <WorkIcon sx={{ marginRight: 1 }} />
            WO
          </Button>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="more"
            component={Link}
            to="/more"
            sx={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}
          >
            <MoreHorizIcon sx={{ marginRight: 1 }} />
            <Typography variant="body2">More</Typography>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1 }}
          >
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}
          >
            <ExitToAppIcon sx={{ marginRight: 1 }} />  {/* Added Logout icon */}
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
