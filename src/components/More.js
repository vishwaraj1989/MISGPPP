import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import { Box, Card, CardContent, Typography, Button, TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const More = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [userId, setUserId] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/formRoutes/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserId(response.data.userId); // Store the logged-in user's ID
        } catch (error) {
          console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        }
      };
      fetchUserData();
    }
  }, []);

  const generateExcel = async () => {
    // Check if both dates are selected
    if (!fromDate || !toDate) {
      toast.error('Please select both From Date and To Date');
      return;
    }

    try {
      // Fetch data with date range filter and userId
      const query = new URLSearchParams({
        fromDate,
        toDate,
        userId // Pass the userId as a query parameter
      }).toString();
      const response = await axios.get(`http://localhost:5000/api/formRoutes?${query}`);
      if (response.status === 200) {
        const data = response.data;

        if (data.length === 0) {
          throw new Error('No data available');
        }

        // Convert JSON to Excel
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'masterFile.xlsx');

        toast.success('Excel file generated successfully');
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error generating Excel file:', error.message);
      toast.error('Failed to generate Excel file');
    }
  };

  const changePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }

    try {
      console.log("UserId = ", userId);
      const response = await axios.post(
        'http://localhost:5000/api/authRoutes/change-password',
        {
          userId,
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Password changed successfully');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        throw new Error('Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error.message);
      toast.error('Failed to change password');
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
          paddingTop: '60px',
          paddingLeft: '0px',
          paddingRight: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
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

        {/* Change Password Card */}
        <Card sx={{ maxWidth: 600, width: '100%', bgcolor: '#fce4ec' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              Change Password
            </Typography>
            <TextField
              label="Old Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              sx={{ width: '100%', mb: 2 }}
            />
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ width: '100%', mb: 2 }}
            />
            <TextField
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ width: '100%', mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={changePassword}
            >
              Change Password
            </Button>
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
        position="top-center"
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
