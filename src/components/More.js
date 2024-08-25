

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import { Box, Card, CardContent, Typography, Button, TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const More = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const generateExcel = async () => {
    // Check if both dates are selected
    if (!fromDate || !toDate) {
      toast.error('Please select both From Date and To Date');
      return;
    }

    try {
      // Fetch data with date range filter
      const query = new URLSearchParams({
        fromDate,
        toDate
      }).toString();
      const response = await fetch(`http://localhost:5000/api/formRoutes?${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      if (data.length === 0) {
        throw new Error('No data available');
      }

      // Convert JSON to Excel
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'masterFile.xlsx');

      toast.success('Excel file generated successfully');
    } catch (error) {
      console.error('Error generating Excel file:', error.message);
      toast.error('Failed to generate Excel file');
    }
  };

  return (
    <Box>
      <Navbar />
      <Sidenav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: '200px',
          paddingTop: '60px', // Increased top padding
          paddingLeft: '0px', // Removed left padding
          paddingRight: '20px', // Maintain the existing padding
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2, // Add space between cards
        }}
      >
        {/* Date Selectors Card */}
        <Card sx={{ maxWidth: 600, width: '100%', bgcolor: '#e0f7fa' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              Generate Master File
            </Typography>
            <Box sx={{ mb: 2, display: 'flex', flexDirection: 'row', gap: 2 }}>
              <TextField
                label="From Date"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ width: 200 }}
              />
              <TextField
                label="To Date"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ width: 200 }}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={generateExcel}
            >
              Generate File
            </Button>
          </CardContent>
        </Card>

        {/* Second Card */}
        <Card sx={{ maxWidth: 600, width: '100%', bgcolor: '#fce4ec' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              Another Card Title
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is some content for another card. You can add more details here.
            </Typography>
          </CardContent>
        </Card>

        {/* Third Card */}
        <Card sx={{ maxWidth: 600, width: '100%', bgcolor: '#fff3e0' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              Yet Another Card Title
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This card has different content and color. Customize as needed.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Toast Container with Centered Position */}
      <ToastContainer
        position="top-center" // Use string instead of `toast.POSITION.TOP_CENTER`
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};

export default More;
