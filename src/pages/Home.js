// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import moment from 'moment'; // Import moment for date formatting
// import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
// import * as XLSX from 'xlsx'; // Import xlsx for exporting data
// import Navbar from '../components/Navbar';
// import Sidenav from '../components/Sidenav';

// const Home = () => {
//   const [data, setData] = useState([]);
//   const [tmnData, setTmnData] = useState([]);
//   const [tmnDataCategoryB, setTmnDataCategoryB] = useState([]);
//   const [tmnDataCategoryC, setTmnDataCategoryC] = useState([]); // New state for Category C
//   const [tmnDataCategoryD, setTmnDataCategoryD] = useState([]);
//   const [ucReleaseH3Pending, setUcReleaseH3Pending] = useState([]);
//   const [h3PendingData, setH3PendingData] = useState([]); // New state for H3 Pending
//   const [firstUnitPendingData, setFirstUnitPendingData] = useState([]); // New state for First Unit Pending
//   const [workOrderPendingData, setWorkOrderPendingData] = useState([]); // New state for Work Order Pending

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/formRoutes');
        
//         const fqPendingData = response.data.filter((entry) => entry.fqDate === null && entry.fqMrDate === null);
//         const updatedFqPendingData = fqPendingData.map(entry => ({
//           ...entry,
//           applicantName: entry.nameOfApplicant
//         }));
//         setData(updatedFqPendingData);
        
//         const tmnPendingData = response.data.filter((entry) => entry.fqMrDate !== null && entry.surveyCategory === 'A' && entry.tmnDate === null && entry.trDate === null);
//         const updatedTmnPendingData = tmnPendingData.map(entry => ({
//           ...entry,
//           applicantName: entry.nameOfApplicant
//         }));
//         setTmnData(updatedTmnPendingData);

//         const tmnPendingDataCategoryB = response.data.filter((entry) => {
//           const fqMrDate = moment(entry.fqMrDate);
//           const currentDate = moment();
//           return entry.surveyCategory === 'B' && entry.fqMrDate !== null && entry.tmnDate === null && currentDate.diff(fqMrDate, 'days') > 15;
//         });
//         const updatedTmnPendingDataCategoryB = tmnPendingDataCategoryB.map(entry => ({
//           ...entry,
//           applicantName: entry.nameOfApplicant
//         }));
//         setTmnDataCategoryB(updatedTmnPendingDataCategoryB);

//         const tmnPendingDataCategoryC = response.data.filter((entry) => {
//           const fqMrDate = moment(entry.fqMrDate);
//           const currentDate = moment();
//           return entry.surveyCategory === 'C' && entry.fqMrDate !== null && entry.tmnDate === null && currentDate.diff(fqMrDate, 'days') > 20;
//         });
//         const updatedTmnPendingDataCategoryC = tmnPendingDataCategoryC.map(entry => ({
//           ...entry,
//           applicantName: entry.nameOfApplicant
//         }));
//         setTmnDataCategoryC(updatedTmnPendingDataCategoryC);

//         const tmnPendingDataCategoryD = response.data.filter((entry) => {
//           const fqMrDate = moment(entry.fqMrDate);
//           const currentDate = moment();
//           return entry.surveyCategory === 'D' && entry.fqMrDate !== null && entry.tmnDate === null && currentDate.diff(fqMrDate, 'days') > 30;
//         });
//         const updatedTmnPendingDataCategoryD = tmnPendingDataCategoryD.map(entry => ({
//           ...entry,
//           applicantName: entry.nameOfApplicant
//         }));
//         setTmnDataCategoryD(updatedTmnPendingDataCategoryD);

//         // Work Order Pending
//         const workOrderPendingData = response.data.filter((entry) => {
//           return entry.fqMrDate !== null && ['B', 'C', 'D'].includes(entry.surveyCategory);
//         });
//         const updatedWorkOrderPendingData = workOrderPendingData.map(entry => ({
//           ...entry,
//           applicantName: entry.nameOfApplicant
//         }));
//         setWorkOrderPendingData(updatedWorkOrderPendingData);

//         // UC Release H3 Pending
//         const ucReleaseH3PendingData = response.data.filter((entry) => {
//           const tmnDate = moment(entry.tmnDate);
//           const currentDate = moment();
//           return entry.tmnDate !== null && entry.trDate === null && currentDate.diff(tmnDate, 'days') > 60;
//         });
//         const updatedUcReleaseH3PendingData = ucReleaseH3PendingData.map(entry => ({
//           ...entry,
//           applicantName: entry.nameOfApplicant
//         }));
//         setUcReleaseH3Pending(updatedUcReleaseH3PendingData);

//         // H3 Pending
//         const h3PendingData = response.data.filter((entry) => {
//           const trDate = moment(entry.trDate);
//           const currentDate = moment();
//           return entry.trDate !== null && entry.h3Date === null  && currentDate.diff(trDate, 'days') > 6;
//         });
//         const updatedH3PendingData = h3PendingData.map(entry => ({
//           ...entry,
//           applicantName: entry.nameOfApplicant
//         }));
//         setH3PendingData(updatedH3PendingData);

//         // First Unit Pending
//         const firstUnitPendingData = response.data.filter((entry) => {
//           return entry.h3Date !== null && entry.firstUnit === null;
//         });
//         const updatedFirstUnitPendingData = firstUnitPendingData.map(entry => ({
//           ...entry,
//           applicantName: entry.nameOfApplicant
//         }));
//         setFirstUnitPendingData(updatedFirstUnitPendingData);

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to prepare data for export
//   const prepareDataForExport = (data) => {
//     return data.flatMap(({ category, entries }) =>
//       entries.map(entry => ({
//         Category: category,
//         'SR Number': entry.srNumber,
//         'Applicant Name': entry.applicantName,
//         'RC Date': entry.rcDate ? moment(entry.rcDate).format('DD-MM-YYYY') : 'N/A',
//         'FQ Date': entry.fqDate ? moment(entry.fqDate).format('DD-MM-YYYY') : 'N/A'
//       }))
//     );
//   };

//   const prepareWorkOrderPendingDataForExport = (data) => {
//     return data.map(entry => ({
//       'SR Number': entry.srNumber,
//       'Applicant Name': entry.applicantName,
//       'FQ MR Date': entry.fqMrDate ? moment(entry.fqMrDate).format('DD-MM-YYYY') : 'N/A',
//       'Survey Category': entry.surveyCategory
//     }));
//   };

//   const exportToExcel = (data, filename) => {
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
//     XLSX.writeFile(workbook, `${filename}.xlsx`);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Sidenav />
//       <Box sx={{ flexGrow: 1 }}>
//         <Navbar />
//         <Box sx={{ padding: 3 }}>
//           <Typography variant="h4" gutterBottom>
//             Dashboard
//           </Typography>

//           {/* FQ Pending Section */}
//           <Typography variant="h6" gutterBottom>
//             FQ Pending
//             <Button 
//               variant="contained" 
//               onClick={() => exportToExcel(prepareDataForExport([{ category: 'FQ Pending', entries: data }]), 'FQ_Pending')} 
//               sx={{ 
//                 marginLeft: '10px', 
//                 backgroundColor: 'transparent', 
//                 color: 'black', 
//                 border: '1px solid black', 
//                 borderRadius: '50px',
//                 padding: '8px 16px',
//                 minWidth: 'auto'
//               }}
//             >
//               Export
//             </Button>
//           </Typography>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>RC Date</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>FQ Date</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {data.map((entry) => (
//                   <TableRow key={entry.srNumber}>
//                     <TableCell>{entry.category}</TableCell>
//                     <TableCell>{entry.srNumber}</TableCell>
//                     <TableCell>{entry.applicantName}</TableCell>
//                     <TableCell>{entry.rcDate ? moment(entry.rcDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
//                     <TableCell>{entry.fqDate ? moment(entry.fqDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* TMN Pending Section */}
//           <Typography variant="h6" gutterBottom>
//             TMN Pending
//             <Button 
//               variant="contained" 
//               onClick={() => exportToExcel(prepareDataForExport([{ category: 'TMN Pending', entries: tmnData }]), 'TMN_Pending')} 
//               sx={{ 
//                 marginLeft: '10px', 
//                 backgroundColor: 'transparent', 
//                 color: 'black', 
//                 border: '1px solid black', 
//                 borderRadius: '50px',
//                 padding: '8px 16px',
//                 minWidth: 'auto'
//               }}
//             >
//               Export
//             </Button>
//           </Typography>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>FQ MR Date</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {tmnData.map((entry) => (
//                   <TableRow key={entry.srNumber}>
//                     <TableCell>{entry.category}</TableCell>
//                     <TableCell>{entry.srNumber}</TableCell>
//                     <TableCell>{entry.applicantName}</TableCell>
//                     <TableCell>{entry.fqMrDate ? moment(entry.fqMrDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* TMN Category B Section */}
//           <Typography variant="h6" gutterBottom>
//             TMN Category B
//             <Button 
//               variant="contained" 
//               onClick={() => exportToExcel(prepareDataForExport([{ category: 'TMN Category B', entries: tmnDataCategoryB }]), 'TMN_Category_B')} 
//               sx={{ 
//                 marginLeft: '10px', 
//                 backgroundColor: 'transparent', 
//                 color: 'black', 
//                 border: '1px solid black', 
//                 borderRadius: '50px',
//                 padding: '8px 16px',
//                 minWidth: 'auto'
//               }}
//             >
//               Export
//             </Button>
//           </Typography>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>FQ MR Date</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {tmnDataCategoryB.map((entry) => (
//                   <TableRow key={entry.srNumber}>
//                     <TableCell>{entry.category}</TableCell>
//                     <TableCell>{entry.srNumber}</TableCell>
//                     <TableCell>{entry.applicantName}</TableCell>
//                     <TableCell>{entry.fqMrDate ? moment(entry.fqMrDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* TMN Category C Section */}
//           <Typography variant="h6" gutterBottom>
//             TMN Category C
//             <Button 
//               variant="contained" 
//               onClick={() => exportToExcel(prepareDataForExport([{ category: 'TMN Category C', entries: tmnDataCategoryC }]), 'TMN_Category_C')} 
//               sx={{ 
//                 marginLeft: '10px', 
//                 backgroundColor: 'transparent', 
//                 color: 'black', 
//                 border: '1px solid black', 
//                 borderRadius: '50px',
//                 padding: '8px 16px',
//                 minWidth: 'auto'
//               }}
//             >
//               Export
//             </Button>
//           </Typography>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>FQ MR Date</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {tmnDataCategoryC.map((entry) => (
//                   <TableRow key={entry.srNumber}>
//                     <TableCell>{entry.category}</TableCell>
//                     <TableCell>{entry.srNumber}</TableCell>
//                     <TableCell>{entry.applicantName}</TableCell>
//                     <TableCell>{entry.fqMrDate ? moment(entry.fqMrDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* TMN Category D Section */}
//           <Typography variant="h6" gutterBottom>
//             TMN Category D
//             <Button 
//               variant="contained" 
//               onClick={() => exportToExcel(prepareDataForExport([{ category: 'TMN Category D', entries: tmnDataCategoryD }]), 'TMN_Category_D')} 
//               sx={{ 
//                 marginLeft: '10px', 
//                 backgroundColor: 'transparent', 
//                 color: 'black', 
//                 border: '1px solid black', 
//                 borderRadius: '50px',
//                 padding: '8px 16px',
//                 minWidth: 'auto'
//               }}
//             >
//               Export
//             </Button>
//           </Typography>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>FQ MR Date</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {tmnDataCategoryD.map((entry) => (
//                   <TableRow key={entry.srNumber}>
//                     <TableCell>{entry.category}</TableCell>
//                     <TableCell>{entry.srNumber}</TableCell>
//                     <TableCell>{entry.applicantName}</TableCell>
//                     <TableCell>{entry.fqMrDate ? moment(entry.fqMrDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* UC Release H3 Pending Section */}
//           <Typography variant="h6" gutterBottom>
//             UC Release H3 Pending
//             <Button 
//               variant="contained" 
//               onClick={() => exportToExcel(prepareDataForExport([{ category: 'UC Release H3 Pending', entries: ucReleaseH3Pending }]), 'UC_Release_H3_Pending')} 
//               sx={{ 
//                 marginLeft: '10px', 
//                 backgroundColor: 'transparent', 
//                 color: 'black', 
//                 border: '1px solid black', 
//                 borderRadius: '50px',
//                 padding: '8px 16px',
//                 minWidth: 'auto'
//               }}
//             >
//               Export
//             </Button>
//           </Typography>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>TMN Date</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {ucReleaseH3Pending.map((entry) => (
//                   <TableRow key={entry.srNumber}>
//                     <TableCell>{entry.srNumber}</TableCell>
//                     <TableCell>{entry.applicantName}</TableCell>
//                     <TableCell>{entry.tmnDate ? moment(entry.tmnDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* H3 Pending Section */}
//           <Typography variant="h6" gutterBottom>
//             H3 Pending
//             <Button 
//               variant="contained" 
//               onClick={() => exportToExcel(prepareDataForExport([{ category: 'H3 Pending', entries: h3PendingData }]), 'H3_Pending')} 
//               sx={{ 
//                 marginLeft: '10px', 
//                 backgroundColor: 'transparent', 
//                 color: 'black', 
//                 border: '1px solid black', 
//                 borderRadius: '50px',
//                 padding: '8px 16px',
//                 minWidth: 'auto'
//               }}
//             >
//               Export
//             </Button>
//           </Typography>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>TR Date</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {h3PendingData.map((entry) => (
//                   <TableRow key={entry.srNumber}>
//                     <TableCell>{entry.srNumber}</TableCell>
//                     <TableCell>{entry.applicantName}</TableCell>
//                     <TableCell>{entry.trDate ? moment(entry.trDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* First Unit Pending Section */}
//           <Typography variant="h6" gutterBottom>
//             First Unit Pending
//             <Button 
//               variant="contained" 
//               onClick={() => exportToExcel(prepareDataForExport([{ category: 'First Unit Pending', entries: firstUnitPendingData }]), 'First_Unit_Pending')} 
//               sx={{ 
//                 marginLeft: '10px', 
//                 backgroundColor: 'transparent', 
//                 color: 'black', 
//                 border: '1px solid black', 
//                 borderRadius: '50px',
//                 padding: '8px 16px',
//                 minWidth: 'auto'
//               }}
//             >
//               Export
//             </Button>
//           </Typography>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>H3 Date</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {firstUnitPendingData.map((entry) => (
//                   <TableRow key={entry.srNumber}>
//                     <TableCell>{entry.srNumber}</TableCell>
//                     <TableCell>{entry.applicantName}</TableCell>
//                     <TableCell>{entry.h3Date ? moment(entry.h3Date).format('DD-MM-YYYY') : 'N/A'}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Work Order Pending Section */}
//           <Typography variant="h6" gutterBottom>
//             Work Order Pending
//             <Button 
//               variant="contained" 
//               onClick={() => exportToExcel(prepareWorkOrderPendingDataForExport(workOrderPendingData), 'Work_Order_Pending')} 
//               sx={{ 
//                 marginLeft: '10px', 
//                 backgroundColor: 'transparent', 
//                 color: 'black', 
//                 border: '1px solid black', 
//                 borderRadius: '50px',
//                 padding: '8px 16px',
//                 minWidth: 'auto'
//               }}
//             >
//               Export
//             </Button>
//           </Typography>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>FQ MR Date</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Survey Category</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {workOrderPendingData.map((entry) => (
//                   <TableRow key={entry.srNumber}>
//                     <TableCell>{entry.srNumber}</TableCell>
//                     <TableCell>{entry.applicantName}</TableCell>
//                     <TableCell>{entry.fqMrDate ? moment(entry.fqMrDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
//                     <TableCell>{entry.surveyCategory}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Home;
