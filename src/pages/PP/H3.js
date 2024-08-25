

import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Box, TextField, Button, CircularProgress, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Sidenav from '../../components/Sidenav';
import Navbar from '../../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const H3 = () => {
  const [srNumber, setSrNumber] = useState('');
  const [consumerNumber, setConsumerNumber] = useState('');
  const [srDetails, setSrDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleInputChange = (e) => {
    setSrNumber(e.target.value);
  };

  const handleConsumerInputChange = (e) => {
    setConsumerNumber(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleFetchDetails();
    } else if (e.key === ' ') {
      e.preventDefault();
      handleSaveDetails();
    }
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setSrDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFetchDetails = useCallback(async () => {
    if (!srNumber && !consumerNumber) {
      toast.error('Please enter an SR number or Consumer number');
      return;
    }

    setLoading(true);
    try {
      const response = srNumber
        ? await axios.get(`http://localhost:5000/api/formRoutes/srDetails/${srNumber}`)
        : await axios.get(`http://localhost:5000/api/formRoutes/srDetailsByConsumer/${consumerNumber}`);
      
      if (response.status === 200) {
        const fetchedDetails = response.data;
        const dateFields = ['rcDate', 'dateOfSurvey', 'fqDate', 'tsDate', 'trDate', 'fqMrDate', 'tmnDate'];
        dateFields.forEach(field => {
          if (fetchedDetails[field]) {
            fetchedDetails[field] = new Date(fetchedDetails[field]).toISOString().split('T')[0];
          }
        });
        delete fetchedDetails.__v;
        setSrDetails(fetchedDetails);
        toast.success('Details fetched successfully');
      } else {
        toast.error('Failed to fetch details');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch details. Please check the SR number or Consumer number and try again.');
    } finally {
      setLoading(false);
    }
  }, [srNumber, consumerNumber]);

  const handleSaveDetails = async () => {
    if (!srDetails) {
      toast.error('No details to save');
      return;
    }

    if (srDetails.srStatus !== 'CLOSED') {
      toast.error('SR details can only be saved if the SR status is CLOSED');
      return;
    }

    setSaving(true);
    try {
      const { _id, ...detailsToSave } = srDetails; // Exclude _id from the update
      const response = await axios.put(`http://localhost:5000/api/formRoutes/srDetails/${srNumber}`, detailsToSave);
      if (response.status === 200) {
        toast.success('Details updated successfully');
        setSrNumber('');
        setConsumerNumber('');
        setSrDetails(null);
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

  const getInputType = (field) => {
    const numberFields = [
      'srNumber', 'load', 'regiCharge', 'tsAmount', 'tsNo', 'htLineLength',
      'ltLineLength', 'tcCapacity', 'fqNo', 'fqSd', 'fqAmountTotal', 'tmnNumber',
      'trAmount', 'consumerNumber', 'h3Number', 'h3OutwardNumber', 'firstUnit'
    ];
    const dateFields = [
      'rcDate', 'dateOfSurvey', 'tsDate', 'fqDate', 'fqMrDate', 'tmnDate', 'trDate', 'h3Date'
    ];

    if (numberFields.includes(field)) {
      return 'number';
    }
    if (dateFields.includes(field)) {
      return 'date';
    }
    return 'text';
  };

  const disabledFields = [
    'srNumber', 'category', 'srType', 'nameOfApplicant', 'address', 'tariff', 'load', 'phase',
    'regiCharge', 'rcDate', 'rcMrNo', 'dateOfSurvey', 'tsAmount','tsNo','htLineLength','ltLineLength','tcCapacity','fqNo','fqDate','','tsDate',
    'fqSd','fqAmountTotal','fqMrNo','tmnNumber','trAmount','trMrNumber', 'fqMrDate', 'tmnDate', 'trDate', 'surveyCategory'
  ];

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
            position="top-center"
            autoClose={1000}
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
            autoFocus
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
              label="Enter Consumer Number"
              value={consumerNumber}
              onChange={handleConsumerInputChange}
              onKeyPress={handleKeyPress}
              fullWidth
              size="small"
              sx={{ mt: 2 }}

            />
            <Button
              variant="contained"
              onClick={handleFetchDetails}
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </Box>
          {srDetails && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Edit SR Details</Typography>
              <Grid container spacing={2}>
                {Object.keys(srDetails).filter(field => field !== '_id' && field !== '__v').map((field) => {
                  if (field !== 'srStatus') {
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
                          InputLabelProps={{ shrink: true }}
                          disabled={disabledFields.includes(field)}
                        />
                      </Grid>
                    );
                  }
                  return null;
                })}
                <Grid item xs={12} sm={4} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="srStatus-label">SR Status</InputLabel>
                    <Select
                      labelId="srStatus-label"
                      name="srStatus"
                      value={srDetails.srStatus || ''}
                      onChange={handleDetailChange}
                      label="SR Status"
                      required
                    >
                      <MenuItem value='OPEN'>Open</MenuItem>
                      <MenuItem value='CLOSED'>Closed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                onClick={handleSaveDetails}
                sx={{ mt: 2 }}
                disabled={saving}
              >
                {saving ? <CircularProgress size={24} /> : 'Save Details'}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default H3;

