
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, TextField, Button, CircularProgress, Typography, Grid} from '@mui/material';
import Sidenav from './Sidenav';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WO = () => {
  const [srNumber, setSrNumber] = useState('');
  const [srDetails, setSrDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const srNumberInputRef = useRef(null);  // Create a reference for the input field

  useEffect(() => {
    srNumberInputRef.current.focus();  // Set focus to the input field when the component mounts
  }, []);

  // Handle SR number input change
  const handleInputChange = (e) => {
    setSrNumber(e.target.value);
  };

  // Handle key press for fetching and saving details
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();  // Prevent default behavior
      handleFetchDetails();
    } else if (e.key === ' ') {
      e.preventDefault();  // Prevent default behavior
      handleSaveDetails();
    }
  };

  // Handle changes in SR details fields
  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setSrDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Fetch SR details from the backend
  const handleFetchDetails = async () => {
    if (!srNumber) {
      toast.error('Please enter an SR number');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/formRoutes/srDetails/${srNumber}`);
      if (response.status === 200) {
        const fetchedDetails = response.data;
        // Ensure date fields are formatted properly
        const dateFields = ['rcDate', 'dateOfSurvey', 'fqDate', 'tsDate', 'trDate', 'fqMrDate', 'tmnDate', 'workOrderDate'];
        dateFields.forEach(field => {
          if (fetchedDetails[field]) {
            fetchedDetails[field] = new Date(fetchedDetails[field]).toISOString().split('T')[0];
          }
        });
        // Remove the _v field if it exists
        delete fetchedDetails.__v;

        // Ensure trAmount is included and handled correctly
        if (fetchedDetails.trAmount !== undefined && fetchedDetails.trAmount !== null) {
          fetchedDetails.trAmount = fetchedDetails.trAmount.toString();
        }

        setSrDetails(fetchedDetails);
        toast.success('Details fetched successfully');
      } else {
        toast.error('Failed to fetch details');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch details. Please check the SR number and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Save updated SR details to the backend
  const handleSaveDetails = async () => {
    if (!srDetails) {
      toast.error('No details to save');
      return;
    }

    setSaving(true);
    try {
      const response = await axios.put(`http://localhost:5000/api/formRoutes/srDetails/${srNumber}`, srDetails);
      if (response.status === 200) {
        toast.success('Details updated successfully');
        setSrNumber('');
        setSrDetails(null);  // Clear the details
      } else {
        toast.error('Failed to update details');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update details. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Determine input type based on field name
  const getInputType = (field) => {
    const numberFields = [
      'srNumber', 'load', 'regiCharge', 'tsAmount', 'tsNo', 'htLineLength',
      'ltLineLength', 'tcCapacity', 'fqNo', 'fqSd', 'fqAmountTotal', 'tmnNumber', 'trAmount',
      'consumerNumber', 'workOrderOutwardNo'
    ];
    const dateFields = [
      'rcDate', 'dateOfSurvey', 'tsDate', 'fqDate', 'fqMrDate', 'tmnDate', 'trDate', 'workOrderDate'
    ];

    if (numberFields.includes(field)) {
      return 'number';
    }
    if (dateFields.includes(field)) {
      return 'date';
    }
    return 'text';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ToastContainer
            position="top-center" // Center the toast messages
            autoClose={1000}     // Duration for which the toast is visible (in milliseconds)
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <TextField
            label="Enter SR Number"
            value={srNumber}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            fullWidth
            size="small"
            inputRef={srNumberInputRef}  // Attach the reference to the input field
          />
          <Button
            variant="contained"
            onClick={handleFetchDetails}
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
          {srDetails && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Edit SR Details</Typography>
              <Grid container spacing={2}>
                {Object.keys(srDetails).filter(field => field !== '_id' && field !== '__v' && field !== 'h3Number' && field !== 'h3OutwardNumber' && field !== 'h3Date' && field !== 'firstUnit').map((field) => {
                  const isDisabled = true; // Disable all fields by default
                  return (
                    <Grid item xs={12} sm={6} md={2} key={field}>
                      <TextField
                        label={field}
                        name={field}
                        value={srDetails[field] || ''}
                        onChange={handleDetailChange}
                        fullWidth
                        size="small"
                        type={getInputType(field)}
                        InputLabelProps={{ shrink: true, sx: { color: 'green' } }}
                        disabled={isDisabled}
                      />
                    </Grid>
                  );
                })}
              </Grid>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Contractor Name"
                    name="contractorName"
                    value={srDetails.contractorName || ''}
                    onChange={handleDetailChange}
                    fullWidth
                    size="small"
                    type="text"
                    InputLabelProps={{ shrink: true, sx: { color: 'green' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Work Order Outward No"
                    name="workOrderOutwardNo"
                    value={srDetails.workOrderOutwardNo || ''}
                    onChange={handleDetailChange}
                    fullWidth
                    size="small"
                    type="number"
                    InputLabelProps={{ shrink: true, sx: { color: 'green' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Work Order Date"
                    name="workOrderDate"
                    value={srDetails.workOrderDate || ''}
                    onChange={handleDetailChange}
                    fullWidth
                    size="small"
                    type="date"
                    InputLabelProps={{ shrink: true, sx: { color: 'green' } }}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                onClick={handleSaveDetails}
                sx={{ mt: 2 }}
                disabled={saving}
              >
                {saving ? <CircularProgress size={24} /> : 'Save'}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default WO;
