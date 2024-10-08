// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Box, TextField, Button, CircularProgress, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import Sidenav from './Sidenav';
// import Navbar from './Navbar';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const SRDetailsLookup = () => {
//   const [srNumber, setSrNumber] = useState('');
//   const [srDetails, setSrDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const srNumberInputRef = useRef(null);

//   useEffect(() => {
//     srNumberInputRef.current.focus();
//   }, []);

//   const handleInputChange = (e) => {
//     setSrNumber(e.target.value);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleFetchDetails();
//     } else if (e.key === ' ') {
//       e.preventDefault();
//       handleSaveDetails();
//     }
//   };

//   const handleDetailChange = (e) => {
//     const { name, value } = e.target;
//     setSrDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleFetchDetails = async () => {
//     if (!srNumber) {
//       toast.error('Please enter an SR number');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:5000/api/formRoutes/srDetails/${srNumber}`);
//       if (response.status === 200) {
//         const fetchedDetails = response.data;
//         const dateFields = ['rcDate', 'dateOfSurvey', 'fqDate', 'tsDate', 'trDate', 'fqMrDate', 'tmnDate', 'dateOfRelease'];
//         dateFields.forEach(field => {
//           if (fetchedDetails[field]) {
//             fetchedDetails[field] = new Date(fetchedDetails[field]).toISOString().split('T')[0];
//           }
//         });
//         const fieldsToExclude = ['_id', '__v', 'h3Number', 'h3OutwardNumber', 'h3Date', 'firstUnit', 'userId'];
//         fieldsToExclude.forEach(field => {
//           delete fetchedDetails[field];
//         });
//         setSrDetails(fetchedDetails);
//         toast.success('Details fetched successfully');
//       } else {
//         toast.error('Failed to fetch details');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Failed to fetch details. Please check the SR number and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveDetails = async () => {
//     if (!srDetails) {
//       toast.error('No details to save');
//       return;
//     }

//     if (srDetails.srStatus === 'CLOSED') {
//       const requiredFields = ['surveyCategory', 'dateOfSurvey', 'fqSd', 'fqAmountTotal', 'fqMrNo', 'trMrNumber', 'trDate'];
//       const missingFields = requiredFields.filter(field => !srDetails[field]);

//       if (missingFields.length > 0) {
//         toast.error(`Please fill in the following fields: ${missingFields.join(', ')}`);
//         return;
//       }
//     }

//     setSaving(true);
//     try {
//       const response = await axios.put(`http://localhost:5000/api/formRoutes/srDetails/${srNumber}`, srDetails);
//       if (response.status === 200) {
//         toast.success('Details updated successfully');
//         setSrNumber('');
//         setSrDetails(null);
//       } else {
//         toast.error('Failed to update details');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Failed to update details. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const getInputType = (field) => {
//     const numberFields = [
//       'srNumber', 'load', 'regiCharge', 'tsAmount', 'tsNo', 'htLineLength',
//       'ltLineLength', 'tcCapacity', 'fqNo', 'fqSd', 'fqAmountTotal', 'tmnNumber',
//       'trAmount', 'consumerNumber'
//     ];
//     const dateFields = [
//       'rcDate', 'dateOfSurvey', 'tsDate', 'fqDate', 'fqMrDate', 'tmnDate', 'trDate', 'dateOfRelease'
//     ];

//     if (numberFields.includes(field)) {
//       return 'number';
//     }
//     if (dateFields.includes(field)) {
//       return 'date';
//     }
//     return 'text';
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       <Navbar />
//       <Box sx={{ display: 'flex' }}>
//         <Sidenav />
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             bgcolor: 'background.default',
//             p: 3,
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <ToastContainer
//             position="top-center"
//             autoClose={5000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//           />
//           <TextField
//             label="Enter SR Number"
//             value={srNumber}
//             onChange={handleInputChange}
//             onKeyPress={handleKeyPress}
//             fullWidth
//             size="small"
//             inputRef={srNumberInputRef}
//           />
//           <Button
//             variant="contained"
//             onClick={handleFetchDetails}
//             sx={{ mt: 2 }}
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} /> : 'Submit'}
//           </Button>
//           {srDetails && (
//             <Box sx={{ mt: 4 }}>
//               <Typography variant="h6">Edit SR Details</Typography>
//               <Grid container spacing={2}>
//                 {Object.keys(srDetails).filter(field => field !== '_id' && field !== '__v' && field !== 'h3Number' && field !== 'h3OutwardNumber' && field !== 'h3Date' && field !== 'firstUnit' && field !== 'userId').map((field) => {
//                   const isDisabled = ['srNumber', 'category', 'srType', 'tariff', 'phase', 'regiCharge'].includes(field);
//                   if (field === 'srStatus') {
//                     return (
//                       <Grid item xs={12} sm={4} md={2} key={field}>
//                         <FormControl fullWidth size="small">
//                           <InputLabel id="srStatus-label">SR Status</InputLabel>
//                           <Select
//                             labelId="srStatus-label"
//                             name="srStatus"
//                             value={srDetails.srStatus || ''}
//                             onChange={handleDetailChange}
//                             label="SR Status"
//                             required
//                           >
//                             <MenuItem value='OPEN'>Open</MenuItem>
//                             <MenuItem value='CLOSED'>Closed</MenuItem>
//                           </Select>
//                         </FormControl>
//                       </Grid>
//                     );
//                   } else if (field === 'surveyCategory') {
//                     return (
//                       <Grid item xs={12} sm={6} md={2} key={field}>
//                         <FormControl fullWidth size="small">
//                             <InputLabel id={`${field}-label`} sx={{ color: 'green' }}>{field}</InputLabel>
//                                  <Select
//                                     labelId={`${field}-label`}
//                                     name={field}
//                                     value={srDetails[field] || ''}
//                                     onChange={handleDetailChange}
//                                     label={field}
//                                   >
//                             <MenuItem value="A">A</MenuItem>
//                             <MenuItem value="B">B</MenuItem>
//                             <MenuItem value="C">C</MenuItem>
//                             <MenuItem value="D">D</MenuItem>
//                                   </Select>
//                         </FormControl>
//                       </Grid>
//                     );
//                   } else {
//                     return (
//                       <Grid item xs={12} sm={6} md={2} key={field}>
//                         <TextField
//                           label={field}
//                           name={field}
//                           value={srDetails[field] || ''}
//                           onChange={handleDetailChange}
//                           fullWidth
//                           size="small"
//                           type={getInputType(field)}
//                           InputLabelProps={
//                             getInputType(field) === 'date'
//                               ? { shrink: true, style: { color: 'green' } }
//                               : { style: { color: 'green' } }
//                           }
//                           disabled={isDisabled}
//                         />
//                       </Grid>
//                     );
//                   }
//                 })}
//               </Grid>
              
//               <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//                 <Button
//                   variant="contained"
//                   onClick={handleSaveDetails}
//                   disabled={saving}
//                 >
//                   {saving ? <CircularProgress size={24} /> : 'Save Details'}
//                 </Button>
//               </Box>
//             </Box>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default SRDetailsLookup;


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, TextField, Button, CircularProgress, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Sidenav from './Sidenav';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SRDetailsLookup = () => {
  const [srNumber, setSrNumber] = useState('');
  const [srDetails, setSrDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const srNumberInputRef = useRef(null);

  useEffect(() => {
    srNumberInputRef.current.focus();
  }, []);

  const handleInputChange = (e) => {
    setSrNumber(e.target.value);
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
    const uppercasedValue = ['fqMrNo', 'trMrNumber'].includes(name) ? value.toUpperCase() : value;

    setSrDetails((prevDetails) => ({
      ...prevDetails,
      [name]: uppercasedValue,
    }));
  };

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
        const dateFields = ['rcDate', 'dateOfSurvey', 'fqDate', 'tsDate', 'trDate', 'fqMrDate', 'tmnDate', 'dateOfRelease'];
        dateFields.forEach(field => {
          if (fetchedDetails[field]) {
            fetchedDetails[field] = new Date(fetchedDetails[field]).toISOString().split('T')[0];
          }
        });
        const fieldsToExclude = ['_id', '__v', 'h3Number', 'h3OutwardNumber', 'h3Date', 'firstUnit', 'userId'];
        fieldsToExclude.forEach(field => {
          delete fetchedDetails[field];
        });
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

  const handleSaveDetails = async () => {
    if (!srDetails) {
      toast.error('No details to save');
      return;
    }

    // if (srDetails.srStatus === 'CLOSED') {
    //   const requiredFields = ['surveyCategory', 'dateOfSurvey', 'fqSd', 'fqAmountTotal', 'fqMrNo', 'trMrNumber', 'trDate'];
    //   const missingFields = requiredFields.filter(field => !srDetails[field]);
  
    //   if (missingFields.length > 0) {
    //     toast.error(`Please fill in the following fields: ${missingFields.join(', ')}`);
    //     return;
    //   }
    // }

    let requiredFields = [];
    if (srDetails.srStatus === 'CLOSED') {
      requiredFields = ['surveyCategory', 'dateOfSurvey', 'fqSd', 'fqAmountTotal', 'fqMrNo', 'trMrNumber', 'trDate'];
    } else if (srDetails.srStatus === 'UNCONNECTED RELEASED') {
      requiredFields = ['surveyCategory', 'dateOfSurvey', 'fqSd', 'fqAmountTotal', 'fqMrNo', 'consumerNumber', 'dateOfRelease'];
    }
    
    const missingFields = requiredFields.filter(field => !srDetails[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in the following fields: ${missingFields.join(', ')}`);
      return;
    }
    

    setSaving(true);
    try {
      const response = await axios.put(`http://localhost:5000/api/formRoutes/srDetails/${srNumber}`, srDetails);
      if (response.status === 200) {
        toast.success('Details updated successfully');
        setSrNumber('');
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
      'trAmount', 'consumerNumber'
    ];
    const dateFields = [
      'rcDate', 'dateOfSurvey', 'tsDate', 'fqDate', 'fqMrDate', 'tmnDate', 'trDate', 'dateOfRelease'
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
          <TextField
            label="Enter SR Number"
            value={srNumber}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            fullWidth
            size="small"
            inputRef={srNumberInputRef}
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
                {Object.keys(srDetails).filter(field => field !== '_id' && field !== '__v' && field !== 'h3Number' && field !== 'h3OutwardNumber' && field !== 'h3Date' && field !== 'firstUnit' && field !== 'userId').map((field) => {
                  const isDisabled = ['srNumber', 'category', 'srType', 'tariff', 'phase', 'regiCharge'].includes(field);
                  if (field === 'srStatus') {
                    return (
                      <Grid item xs={12} sm={4} md={2} key={field}>
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
                            <MenuItem value='CANCELLED BY USER'>Cancelled By User</MenuItem>
                            <MenuItem value='NOT PAID CANCELLED BY USER'>Not Paid Cancelled By User</MenuItem>
                            <MenuItem value='PAID CANCELLED BY USER'>Paid Cancelled By User</MenuItem>
                            <MenuItem value='UNCONNECTED RELEASED'>Unconnected Released</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    );
                  } else if (field === 'surveyCategory') {
                    return (
                      <Grid item xs={12} sm={6} md={2} key={field}>
                        <FormControl fullWidth size="small">
                          <InputLabel id={`${field}-label`} sx={{ color: 'green' }}>{field}</InputLabel>
                          <Select
                            labelId={`${field}-label`}
                            name={field}
                            value={srDetails[field] || ''}
                            onChange={handleDetailChange}
                            label={field}
                          >
                            <MenuItem value="A">A</MenuItem>
                            <MenuItem value="B">B</MenuItem>
                            <MenuItem value="C">C</MenuItem>
                            <MenuItem value="D">D</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    );
                  } else if (field === 'trAmount') {
                    // Make trAmount a select menu
                    return (
                      <Grid item xs={12} sm={6} md={2} key={field}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="trAmount-label">TR Amount</InputLabel>
                          <Select
                            labelId="trAmount-label"
                            name={field}
                            value={srDetails[field] !== undefined ? srDetails[field] : ''}
                            onChange={handleDetailChange}
                            label="TR Amount"
                          >
                            <MenuItem value={23.60}>23.60</MenuItem>
                            <MenuItem value={0.0}>0.0</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    );
                  } else {
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
                          InputLabelProps={
                            getInputType(field) === 'date'
                              ? { shrink: true, style: { color: 'green' } }
                              : { style: { color: 'green' } }
                          }
                          disabled={isDisabled}
                        />
                      </Grid>
                    );
                  }
                })}
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

export default SRDetailsLookup;
