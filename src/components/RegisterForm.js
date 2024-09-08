import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Typography,
} from '@mui/material';
import Sidenav from './Sidenav';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    srNumber: '',
    category: '',
    srType: '',
    nameOfApplicant: '',
    address: '',
    tariff: '',
    load: '',
    phase: 'Single Phase',
    rcDate: '',
    rcMrNo: '',
    regiCharge: '',
    ggrc: '',
    surveyCategory: '',
    dateOfSurvey: '',
    tsAmount: '',
    tsNo: '',
    tsDate: '',
    htLineLength: '',
    ltLineLength: '',
    tcCapacity: '',
    fqNo: '',
    fqDate: '',
    fqSd: '',
    fqAmountTotal: '',
    fqMrNo: '',
    fqMrDate: '',
    tmnNumber: '',
    tmnDate: '',
    trAmount: '',
    trMrNumber: '',
    trDate: '',
    dateOfRelease: '',
    consumerNumber: '',
    srStatus: 'OPEN',
    remark: '',
    h3Number: '',
    h3OutwardNumber: '',
    h3Date: '',
    firstUnit: '',
    userId: '' // Add userId to form data
  });

  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
  console.log ("token", token);
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/formRoutes/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData((prevData) => ({
          ...prevData,
          userId: response.data.userId, // Make sure this matches your backend response
          
        }));
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      }
    };
  
    fetchUserData();
  }, []);
  
  
  
  // Define options for the select fields
  const tariffOptions = {
    default: [{ value: 'OTHER', label: 'OTHER' }],
    residential: [
      { value: 'RGPR', label: 'RGPR' },
      { value: 'RGPU', label: 'RGPU' },
    ],
    manufacturingServiceIndustries: [
      { value: 'NRGP', label: 'NRGP' },
      { value: 'LTMD', label: 'LTMD' },
      { value: 'NRGPN', label: 'NRGPN' },
      { value: 'LTMDN', label: 'LTMDN' },
      { value: 'EVCS', label: 'ELECTRIC VEHICLE CHARGING STATION' },
    ],
    agricultural: [
      { value: 'A1', label: 'Agricultural Un Metered' },
      { value: 'A2', label: 'Agricultural Metered' },
      { value: 'A3', label: 'Agricultural Tatkal' },
      { value: 'A4', label: 'Agricultural Surface' },
      { value: 'A5', label: 'Agricultural 50PS' },
    ],
    generallightingpurpose: [
      { value: 'GLP', label: 'GLP' },
      { value: 'GLP.SL', label: 'Street Light for Public' },
      { value: 'GLP.SP', label: 'Street Light for Private' },
    ],
    streetlight: [
      { value: 'SL.PR', label: 'Street Light for Private' },
      { value: 'SL.PU', label: 'Street Light for Public' },
    ],
    waterWorks: [
      { value: 'WW.GP', label: 'Water Works for Gram Panchayat' },
      { value: 'WW.MU', label: 'Water Works for Municipal Corporation' },
      { value: 'WW.NP', label: 'Water Works for Nagar Panchayats/Palikas' },
      { value: 'WW.PR', label: 'Water Works for Private' },
    ],
    temporary: [
      { value: 'TMP', label: 'TMP' },
    ],
  };

  const regiChargeOptions = [
    { value: '47.20', label: '47.20' },
    { value: '118', label: '118' },
    { value: '472', label: '472' },
    { value: '236', label: '236' },
    { value: '0', label: '0' },
  ];
  console.log('Form Data:', formData);
  console.log('userId', formData.userId);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
  
    if (!formData.userId) {
      toast.error('UserId is required. Login Again', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          backgroundColor: '#ff4444',
          color: '#fff'
        }
      });
      return;
    }
  
    setLoading(true);
  
    try {
      const srNumberExists = await checkSrNumberExists(formData.srNumber);
  
      if (srNumberExists) {
        toast.error('SR Number already exists. Please enter a different SR Number.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: {
            backgroundColor: '#ff4444',
            color: '#fff'
          }
        });
        setLoading(false);
        return;
      }
  
      const response = await axios.post('http://localhost:5000/api/formRoutes', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        toast('Form submitted successfully!');
        setFormData({
          srNumber: '',
          category: '',
          srType: '',
          nameOfApplicant: '',
          address: '',
          tariff: '',
          load: '',
          phase: 'Single Phase',
          rcDate: '',
          rcMrNo: '',
          regiCharge: '',
          ggrc: '',
          surveyCategory: '',
          dateOfSurvey: '',
          tsAmount: '',
          tsNo: '',
          tsDate: '',
          htLineLength: '',
          ltLineLength: '',
          tcCapacity: '',
          fqNo: '',
          fqDate: '',
          fqSd: '',
          fqAmountTotal: '',
          fqMrNo: '',
          fqMrDate: '',
          tmnNumber: '',
          tmnDate: '',
          trAmount: '',
          trMrNumber: '',
          trDate: '',
          dateOfRelease:'',
          consumerNumber: '',
          srStatus: 'OPEN',
          remark: '',
          h3Number: '',
          h3OutwardNumber: '',
          h3Date: '',
          firstUnit: '',
          userId: '' // Clear userId as well
        });
      } else {
        alert('Failed to submit form. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit form. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle Enter key press to submit the form
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'nameOfApplicant' || name === 'address' || name === 'rcMrNo' || name === 'ggrc' || name === 'remarks' || name === 'fqMrNo' || name === 'trMrNumber'
        ? value.toUpperCase()
        : value,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    if (formData.srNumber === '' || formData.nameOfApplicant === '') {
      alert('SR Number and Name of Applicant are required fields.');
      return false;
    }
    return true;
  };

  // Check if SR Number exists
  const checkSrNumberExists = async (srNumber) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/formRoutes/srDetails/${srNumber}`);
      return response.status === 200; // SR Number exists
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return false; // SR Number does not exist
      }
      throw error; // Other errors should be thrown to be caught in handleSubmit
    }
  };

  // Get tariff options based on category
  const getTariffOptions = () => {
    const { category } = formData;
    if (category === 'Residential') {
      return tariffOptions.residential;
    } else if (category === 'Manufacturing & Service Industries') {
      return tariffOptions.manufacturingServiceIndustries;
    } else if (category === 'Agricultural') {
      return tariffOptions.agricultural;
    } else if (category === 'General Lighting Purpose') {
      return tariffOptions.generallightingpurpose;
    } else if (category === 'Street Light') {
      return tariffOptions.streetlight;
    } else if (category === 'Water Works') {
      return tariffOptions.waterWorks;
    } else if (category === 'Temporary') {
      return tariffOptions.temporary;
    } else {
      return tariffOptions.default;
    }
  };

return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography>
     In  A Type Survey FQ Amount Total is Fixed Charge
    </Typography>
  </Box>

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
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="SR Number"
                  name="srNumber"
                  type="number"
                  value={formData.srNumber}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{ shrink: true, style: { color: 'green' } }}

                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                <InputLabel id="category-label" style={{ color: 'green' }}>Category</InputLabel>
                <Select
                    labelId="category-label"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="SR Type"
                    required
                    onKeyDown={handleKeyPress}

                  >
                    <MenuItem value="Residential">Residential</MenuItem>
                    <MenuItem value="Manufacturing & Service Industries">Manufacturing & Service Industries</MenuItem>
                    <MenuItem value="Agricultural">Agricultural</MenuItem>
                    <MenuItem value="General Lighting Purpose">General Lighting Purpose</MenuItem>
                    <MenuItem value="Street Light">Street Light</MenuItem>
                    <MenuItem value="Water Works">Water Works</MenuItem>
                    <MenuItem value="Temporary">Temporary</MenuItem>

                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <FormControl fullWidth size="small">
                <InputLabel id="tariff-label" style={{ color: 'green' }}>Tarrif</InputLabel>
                <Select
                    labelId="tariff-label"
                    name="tariff"
                    value={formData.tariff}
                    onChange={handleChange}
                    label="Tariff"
                    required
                    onKeyDown={handleKeyPress}

                  >
                    {getTariffOptions().map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth size="small">
                <InputLabel id="srType-label" style={{ color: 'green' }}>SR Type</InputLabel>
                <Select
                    labelId="srType-label"
                    name="srType"
                    value={formData.srType}
                    onChange={handleChange}
                    label="SR Type"
                    required
                    onKeyDown={handleKeyPress}
                  >
                    <MenuItem value="New Connection LT">New Connection LT</MenuItem>
                    <MenuItem value="Change of Load for LT Addition">Change of Load for LT Addition</MenuItem>
                    <MenuItem value="Change of Load for LT Reduction">Change of Load for LT Reduction</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="Name of Applicant"
                  name="nameOfApplicant"
                  type="text"
                  value={formData.nameOfApplicant}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{  style: { color: 'green' } }}
                  inputProps={{ style: { textTransform: 'uppercase' } }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="Address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{ style: { color: 'green' } }}
                  inputProps={{ style: { textTransform: 'uppercase' } }}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="Load"
                  name="load"
                  type="number"
                  value={formData.load}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{ style: { color: 'green' } }}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel id="phase-select-label" style={{ color: 'green' }}>Phase</InputLabel>
                  <Select
                    labelId="phase-select-label"
                    name="phase"
                    value={formData.phase}
                    onChange={handleChange}
                    label="Phase"
                    required
                    
                  >
                    <MenuItem value="Single Phase">Single Phase</MenuItem>
                    <MenuItem value="Three Phase">Three Phase</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="RC Date"
                  name="rcDate"
                  type="date"
                  value={formData.rcDate}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true, style: { color: 'green' } }}
                  size="small"
                  onKeyDown={handleKeyPress}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="RC MR No."
                  name="rcMrNo"
                  type="text"
                  value={formData.rcMrNo}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{ style: { color: 'green' } }}
                  inputProps={{ style: { textTransform: 'uppercase' } }}
                />
              </Grid>
 <Grid item xs={12} sm={4} md={2}>
<FormControl fullWidth size="small" required>
<InputLabel id="regiCharge-label" style={{ color: 'green' }}>Registration Charge</InputLabel>
<Select
    labelId="regiCharge-label"
    name="regiCharge"
    value={formData.regiCharge}
    onChange={handleChange}
    label="Registration Charge"
    onKeyDown={handleKeyPress}
  >
    {regiChargeOptions.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </Select>
</FormControl>
</Grid>

              {formData.category === 'Agricultural' && (
                <Grid item xs={12} sm={4} md={2}>
                  <TextField
                    label="GGRC"
                    name="ggrc"
                    type="text"
                    value={formData.ggrc}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    onKeyDown={handleKeyPress}
                    inputProps={{ style: { textTransform: 'uppercase' } }}

                  />
                </Grid>
              )}

              <Grid item xs={12} sm={4} md={2}>
                 <FormControl fullWidth size="small">
                   <InputLabel id="surveyCategory-label" style={{ color: 'green' }}>Survey Category</InputLabel>
                   <Select
                     labelId="surveyCategory-label"
                     name="surveyCategory"
                     value={formData.surveyCategory}
                     onChange={handleChange}
                     label="Survey Category"
                     
                   >
                     <MenuItem value="A">A</MenuItem>
                     <MenuItem value="B">B</MenuItem>
                     <MenuItem value="C">C</MenuItem>
                     <MenuItem value="D">D</MenuItem>
                   </Select>
                 </FormControl>
               </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="Date of Survey"
                  name="dateOfSurvey"
                  type="date"
                  value={formData.dateOfSurvey}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{ shrink: true, style: { color: 'green' } }}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="TS Amount"
                  name="tsAmount"
                  type="number"
                  value={formData.tsAmount}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{ style: { color: 'green' } }}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="TS No."
                  name="tsNo"
                  type="number"
                  value={formData.tsNo}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{ style: { color: 'green' } }}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="TS Date"
                  name="tsDate"
                  type="date"
                  value={formData.tsDate}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true, style: { color: 'green' } }}
                  size="small"
                  onKeyDown={handleKeyPress}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="HT Line Length"
                  name="htLineLength"
                  type="number"
                  value={formData.htLineLength}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{ style: { color: 'green' } }}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="LT Line Length"
                  name="ltLineLength"
                  type="number"
                  value={formData.ltLineLength}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{ style: { color: 'green' } }}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="TC Capacity"
                  name="tcCapacity"
                  type="number"
                  value={formData.tcCapacity}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{ style: { color: 'green' } }}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="FQ No."
                  name="fqNo"
                  type="number"
                  value={formData.fqNo}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{  style: { color: 'green' } }}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="FQ Date"
                  name="fqDate"
                  type="date"
                  value={formData.fqDate}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{shrink: true, style: { color: 'green' } }}
                  size="small"
                  onKeyDown={handleKeyPress}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="FQ SD"
                  name="fqSd"
                  type="number"
                  value={formData.fqSd}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{ style: { color: 'green' } }}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="FQ Amount Total"
                  name="fqAmountTotal"
                  type="number"
                  value={formData.fqAmountTotal}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{ style: { color: 'green' } }}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="FQ MR No."
                  name="fqMrNo"
                  type="text"
                  value={formData.fqMrNo}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{ style: { color: 'green' } }}
                  inputProps={{ style: { textTransform: 'uppercase' } }}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="FQ MR Date"
                  name="fqMrDate"
                  type="date"
                  value={formData.fqMrDate}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true,style: { color: 'green' } }}
                  size="small"
                  onKeyDown={handleKeyPress}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="TMN No."
                  name="tmnNumber"
                  type="number"
                  value={formData.tmnNumber}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{ style: { color: 'green' } }}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="TMN Date"
                  name="tmnDate"
                  type="date"
                  value={formData.tmnDate}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{shrink: true, style: { color: 'green' } }}
                  size="small"
                  onKeyDown={handleKeyPress}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                 <FormControl fullWidth size="small">
                   <InputLabel id="trAmount-label" style={{ color: 'green' }}>TR Amount</InputLabel>
                   <Select
                     labelId="trAmount-label"
                     name="trAmount"
                     value={formData.trAmount}
                     onChange={handleChange}
                     label="TR Amount"
                     >
                     <MenuItem value="23.60">23.60</MenuItem>
                     <MenuItem value="0">0</MenuItem>
                    </Select>
                 </FormControl>
               </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="TR MR Number"
                  name="trMrNumber"
                  type="text"
                  value={formData.trMrNumber}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{ style: { color: 'green' } }}
                  inputProps={{ style: { textTransform: 'uppercase' } }}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="TR Date"
                  name="trDate"
                  type="date"
                  value={formData.trDate}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true,style: { color: 'green' } }}
                  size="small"
                  onKeyDown={handleKeyPress}

                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  label="Remark"
                  name="remark"
                  type="text"
                  value={formData.remark}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  onKeyDown={handleKeyPress}
                  InputLabelProps={{ style: { color: 'green' } }}
                  inputProps={{ style: { textTransform: 'uppercase' } }}

                />
              </Grid>
              <Grid item xs={12}>
                 <Button
                   type="submit"
                   variant="contained"
                   color="primary"
                   disabled={loading}
                   fullWidth
                 >
                   {loading ? <CircularProgress size={24} /> : 'Submit'}
                 </Button>
               </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
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
              theme="light"
      />
    </Box>
  );
};

export default RegisterForm;
