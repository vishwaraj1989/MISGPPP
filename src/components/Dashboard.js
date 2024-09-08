import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import * as XLSX from 'xlsx';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [tmnData, setTmnData] = useState([]);
  const [tmnDataCategoryB, setTmnDataCategoryB] = useState([]);
  const [tmnDataCategoryC, setTmnDataCategoryC] = useState([]);
  const [tmnDataCategoryD, setTmnDataCategoryD] = useState([]);
  const [ucReleaseH3Pending, setUcReleaseH3Pending] = useState([]);
  const [h3PendingData, setH3PendingData] = useState([]);
  const [firstUnitPendingData, setFirstUnitPendingData] = useState([]);
  const [workOrderPendingData, setWorkOrderPendingData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/formRoutes/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.userId;
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        return null;
      }
    };

    const fetchData = async (userId) => {
      try {
        if (!userId) return;

        const response = await axios.get(`/api/formRoutes/${userId}`);

        const sortByTotalDaysDesc = (entries, dateField) => {
          return entries
            .map((entry) => ({
              ...entry,
              totalDays: entry[dateField] ? moment().diff(moment(entry[dateField]), 'days') : 'N/A',
              applicantName: entry.nameOfApplicant,
            }))
            .sort((a, b) => b.totalDays - a.totalDays);
        };

        setData(sortByTotalDaysDesc(
          response.data.filter(entry => entry.fqDate === null && entry.fqMrDate === null && entry.category !== 'Agricultural'),
          'rcDate'
        ));

        setTmnData(sortByTotalDaysDesc(
          response.data.filter(entry => entry.fqMrDate !== null && entry.surveyCategory === 'A' && entry.tmnDate === null && entry.trDate === null),
          'fqMrDate'
        ));

        setTmnDataCategoryB(sortByTotalDaysDesc(
          response.data.filter(entry => entry.surveyCategory === 'B' && entry.fqMrDate !== null && entry.tmnDate === null && moment().diff(moment(entry.fqMrDate), 'days') > 15),
          'fqMrDate'
        ));

        setTmnDataCategoryC(sortByTotalDaysDesc(
          response.data.filter(entry => entry.surveyCategory === 'C' && entry.fqMrDate !== null && entry.tmnDate === null && moment().diff(moment(entry.fqMrDate), 'days') > 20),
          'fqMrDate'
        ));

        setTmnDataCategoryD(sortByTotalDaysDesc(
          response.data.filter(entry => entry.surveyCategory === 'D' && entry.fqMrDate !== null && entry.tmnDate === null && moment().diff(moment(entry.fqMrDate), 'days') > 30),
          'fqMrDate'
        ));

        setWorkOrderPendingData(sortByTotalDaysDesc(
          response.data.filter(entry => entry.fqMrDate !== null && ['B', 'C', 'D'].includes(entry.surveyCategory)),
          'fqMrDate'
        ));

        setUcReleaseH3Pending(sortByTotalDaysDesc(
          response.data.filter(entry => entry.tmnDate !== null && entry.trDate === null && moment().diff(moment(entry.tmnDate), 'days') > 60),
          'tmnDate'
        ));

        setH3PendingData(sortByTotalDaysDesc(
          response.data.filter(entry => entry.trDate !== null && entry.h3Date === null && moment().diff(moment(entry.trDate), 'days') > 6),
          'trDate'
        ));

        setFirstUnitPendingData(sortByTotalDaysDesc(
          response.data.filter(entry => entry.h3Date !== null && entry.firstUnit === null && moment().diff(moment(entry.h3Date), 'days') > 60),
          'h3Date'
        ));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const initializeData = async () => {
      const userId = await fetchUserData();
      if (userId) {
        await fetchData(userId);
      }
    };

    initializeData();
  }, []);

  const prepareDataForExport = (data) => {
    return data.map(entry => ({
      'SR Number': entry.srNumber,
      'Applicant Name': entry.applicantName,
      'RC Date': entry.rcDate ? moment(entry.rcDate).format('DD-MM-YYYY') : 'N/A',
      'FQ Date': entry.fqDate ? moment(entry.fqDate).format('DD-MM-YYYY') : 'N/A',
      'Total Days': entry.totalDays,
    }));
  };

  const prepareTmnDataForExport = (data) => {
    return data.map(entry => ({
      'SR Number': entry.srNumber,
      'Applicant Name': entry.applicantName,
      'FQ MR Date': entry.fqMrDate ? moment(entry.fqMrDate).format('DD-MM-YYYY') : 'N/A',
      'Total Days': entry.totalDays,
      'Survey Category': entry.surveyCategory,
    }));
  };

  const exportToExcel = (data, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>

          {/* FQ Pending Section */}
          <Typography variant="h6" gutterBottom>
            FQ Pending
            <Button 
              variant="contained" 
              onClick={() => exportToExcel(prepareDataForExport(data), 'FQ_Pending')} 
              sx={{ 
                marginLeft: '10px', 
                backgroundColor: 'transparent', 
                color: 'black', 
                border: '1px solid black', 
                borderRadius: '50px',
                padding: '8px 16px',
                minWidth: 'auto'
              }}
            >
              Export
            </Button>
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tarrif</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Phase</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>RC Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total Days</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.srNumber}</TableCell>
                    <TableCell>{entry.category}</TableCell>
                    <TableCell>{entry.tariff}</TableCell>
                    <TableCell>{entry.phase}</TableCell>
                    <TableCell>{entry.applicantName}</TableCell>
                    <TableCell>{entry.rcDate ? moment(entry.rcDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
                    <TableCell>{entry.totalDays}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* TMN Pending Category A Section */}
          <Typography variant="h6" gutterBottom>
            TMN Pending (Category A)
            <Button 
              variant="contained" 
              onClick={() => exportToExcel(prepareTmnDataForExport(tmnData), 'TMN_Pending_Category_A')} 
              sx={{ 
                marginLeft: '10px', 
                backgroundColor: 'transparent', 
                color: 'black', 
                border: '1px solid black', 
                borderRadius: '50px',
                padding: '8px 16px',
                minWidth: 'auto'
              }}
            >
              Export
            </Button>
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tarrif</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Phase</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>FQ MR Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Survey Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total Days</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tmnData.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.srNumber}</TableCell>
                    <TableCell>{entry.category}</TableCell>
                    <TableCell>{entry.tariff}</TableCell>
                    <TableCell>{entry.phase}</TableCell>
                    <TableCell>{entry.applicantName}</TableCell>
                    <TableCell>{entry.fqMrDate ? moment(entry.fqMrDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
                    <TableCell>{entry.surveyCategory}</TableCell>
                    <TableCell>{entry.totalDays}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* TMN Pending Category B Section */}
          <Typography variant="h6" gutterBottom>
            TMN Pending (Category B)
            <Button 
              variant="contained" 
              onClick={() => exportToExcel(prepareTmnDataForExport(tmnDataCategoryB), 'TMN_Pending_Category_B')} 
              sx={{ 
                marginLeft: '10px', 
                backgroundColor: 'transparent', 
                color: 'black', 
                border: '1px solid black', 
                borderRadius: '50px',
                padding: '8px 16px',
                minWidth: 'auto'
              }}
            >
              Export
            </Button>
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tarrif</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>FQ MR Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Survey Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total Days</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tmnDataCategoryB.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.srNumber}</TableCell>
                    <TableCell>{entry.category}</TableCell>
                    <TableCell>{entry.tariff}</TableCell>
                    <TableCell>{entry.applicantName}</TableCell>
                    <TableCell>{entry.fqMrDate ? moment(entry.fqMrDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
                    <TableCell>{entry.surveyCategory}</TableCell>
                    <TableCell>{entry.totalDays}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* TMN Pending Category C Section */}
          <Typography variant="h6" gutterBottom>
            TMN Pending (Category C)
            <Button 
              variant="contained" 
              onClick={() => exportToExcel(prepareTmnDataForExport(tmnDataCategoryC), 'TMN_Pending_Category_C')} 
              sx={{ 
                marginLeft: '10px', 
                backgroundColor: 'transparent', 
                color: 'black', 
                border: '1px solid black', 
                borderRadius: '50px',
                padding: '8px 16px',
                minWidth: 'auto'
              }}
            >
              Export
            </Button>
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tarrif</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Phase</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>FQ MR Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Survey Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total Days</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tmnDataCategoryC.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.srNumber}</TableCell>
                    <TableCell>{entry.category}</TableCell>
                    <TableCell>{entry.tariff}</TableCell>
                    <TableCell>{entry.phase}</TableCell>
                    <TableCell>{entry.applicantName}</TableCell>
                    <TableCell>{entry.fqMrDate ? moment(entry.fqMrDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
                    <TableCell>{entry.surveyCategory}</TableCell>
                    <TableCell>{entry.totalDays}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* TMN Pending Category D Section */}
          <Typography variant="h6" gutterBottom>
            TMN Pending (Category D)
            <Button 
              variant="contained" 
              onClick={() => exportToExcel(prepareTmnDataForExport(tmnDataCategoryD), 'TMN_Pending_Category_D')} 
              sx={{ 
                marginLeft: '10px', 
                backgroundColor: 'transparent', 
                color: 'black', 
                border: '1px solid black', 
                borderRadius: '50px',
                padding: '8px 16px',
                minWidth: 'auto'
              }}
            >
              Export
            </Button>
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tarrif</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Phase</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>FQ MR Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Survey Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total Days</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tmnDataCategoryD.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.srNumber}</TableCell>
                    <TableCell>{entry.category}</TableCell>
                    <TableCell>{entry.tariff}</TableCell>
                    <TableCell>{entry.phase}</TableCell>
                    <TableCell>{entry.applicantName}</TableCell>
                    <TableCell>{entry.fqMrDate ? moment(entry.fqMrDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
                    <TableCell>{entry.surveyCategory}</TableCell>
                    <TableCell>{entry.totalDays}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Work Order Pending Section */}
          <Typography variant="h6" gutterBottom>
            Work Order Pending
            <Button 
              variant="contained" 
              onClick={() => exportToExcel(prepareDataForExport(workOrderPendingData), 'Work_Order_Pending')} 
              sx={{ 
                marginLeft: '10px', 
                backgroundColor: 'transparent', 
                color: 'black', 
                border: '1px solid black', 
                borderRadius: '50px',
                padding: '8px 16px',
                minWidth: 'auto'
              }}
            >
              Export
            </Button>
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Tarrif</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Phase</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>FQ MR Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total Days</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workOrderPendingData.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.srNumber}</TableCell>
                    <TableCell>{entry.category}</TableCell>
                    <TableCell>{entry.tariff}</TableCell>
                    <TableCell>{entry.phase}</TableCell>
                    <TableCell>{entry.applicantName}</TableCell>
                    <TableCell>{entry.fqMrDate ? moment(entry.fqMrDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
                    <TableCell>{entry.totalDays}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* UC Release H3 Pending Section */}
          <Typography variant="h6" gutterBottom>
            UC Release H3 Pending
            <Button 
              variant="contained" 
              onClick={() => exportToExcel(prepareDataForExport(ucReleaseH3Pending), 'UC_Release_H3_Pending')} 
              sx={{ 
                marginLeft: '10px', 
                backgroundColor: 'transparent', 
                color: 'black', 
                border: '1px solid black', 
                borderRadius: '50px',
                padding: '8px 16px',
                minWidth: 'auto'
              }}
            >
              Export
            </Button>
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tarrif</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Phase</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>TMN Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total Days</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ucReleaseH3Pending.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.srNumber}</TableCell>
                    <TableCell>{entry.category}</TableCell>
                    <TableCell>{entry.tariff}</TableCell>
                    <TableCell>{entry.phase}</TableCell>
                    <TableCell>{entry.applicantName}</TableCell>
                    <TableCell>{entry.tmnDate ? moment(entry.tmnDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
                    <TableCell>{entry.totalDays}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* H3 Pending Section */}
          <Typography variant="h6" gutterBottom>
            H3 Pending
            <Button 
              variant="contained" 
              onClick={() => exportToExcel(prepareDataForExport(h3PendingData), 'H3_Pending')} 
              sx={{ 
                marginLeft: '10px', 
                backgroundColor: 'transparent', 
                color: 'black', 
                border: '1px solid black', 
                borderRadius: '50px',
                padding: '8px 16px',
                minWidth: 'auto'
              }}
            >
              Export
            </Button>
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Tarrif</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Phase</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>TR Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total Days</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {h3PendingData.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.srNumber}</TableCell>
                    <TableCell>{entry.category}</TableCell>
                    <TableCell>{entry.tariff}</TableCell>
                    <TableCell>{entry.phase}</TableCell>
                    <TableCell>{entry.applicantName}</TableCell>
                    <TableCell>{entry.trDate ? moment(entry.trDate).format('DD-MM-YYYY') : 'N/A'}</TableCell>
                    <TableCell>{entry.totalDays}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* First Unit Pending Section */}
          <Typography variant="h6" gutterBottom>
            First Unit Pending
            <Button 
              variant="contained" 
              onClick={() => exportToExcel(prepareDataForExport(firstUnitPendingData), 'First_Unit_Pending')} 
              sx={{ 
                marginLeft: '10px', 
                backgroundColor: 'transparent', 
                color: 'black', 
                border: '1px solid black', 
                borderRadius: '50px',
                padding: '8px 16px',
                minWidth: 'auto'
              }}
            >
              Export
            </Button>
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>SR Number</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Tarrif</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Phase</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>H3 Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total Days</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {firstUnitPendingData.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.srNumber}</TableCell>
                    <TableCell>{entry.category}</TableCell>
                    <TableCell>{entry.tariff}</TableCell>
                    <TableCell>{entry.phase}</TableCell>
                    <TableCell>{entry.applicantName}</TableCell>
                    <TableCell>{entry.h3Date ? moment(entry.h3Date).format('DD-MM-YYYY') : 'N/A'}</TableCell>
                    <TableCell>{entry.totalDays}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
