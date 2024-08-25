import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidenav from '../../components/Sidenav';
import { Box } from '@mui/material';
import ThreeQMSIGP from './ThreeQMSIGP';
import SingleQMSIGP from './SingleQMSIGP';
import TmpGP from './TmpGP';
import RgprGP from './RgprGP';

export default function Settings() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Side Navigation */}
      <Sidenav />
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, display: 'flex', flexDirection: 'column' }}
      >
        {/* Routes for different settings components */}
        <Routes>
          <Route path="/rgpr-gp" element={<RgprGP />} />
          <Route path="/1q-msi-gp" element={<SingleQMSIGP />} />
          <Route path="/3q-msi-gp" element={<ThreeQMSIGP />} />
          <Route path="/tmp-gp" element={<TmpGP />} />
        </Routes>
      </Box>
    </Box>
  );
}
