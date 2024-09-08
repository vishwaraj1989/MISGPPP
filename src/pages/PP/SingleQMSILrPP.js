import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Routes, Route } from 'react-router-dom';
import Sidenav from '../../components/Sidenav';
import Navbar from '../../components/Navbar';
import * as XLSX from 'xlsx';

const headCells = [
  { id: 'srNumber', numeric: true, disablePadding: true, label: 'SR Number' },
  { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
  { id: 'nameOfApplicant', numeric: false, disablePadding: false, label: 'Name of Applicant' },
  { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
  { id: 'tariff', numeric: false, disablePadding: false, label: 'Tariff' },
  { id: 'load', numeric: true, disablePadding: false, label: 'Load' },
  { id: 'phase', numeric: false, disablePadding: false, label: 'Phase' },
  { id: 'regiCharge', numeric: true, disablePadding: false, label: 'Registration Charge' },
  { id: 'rcDate', numeric: false, disablePadding: false, label: 'RC Date' },
  { id: 'rcMrNo', numeric: false, disablePadding: false, label: 'RC MR No.' },
  { id: 'surveyCategory', numeric: false, disablePadding: false, label: 'Survey Category' },
  { id: 'dateOfSurvey', numeric: false, disablePadding: false, label: 'Date of Survey' },
  { id: 'tsAmount', numeric: true, disablePadding: false, label: 'TS Amount' },
  { id: 'tsNo', numeric: true, disablePadding: false, label: 'TS No' },
  { id: 'tsDate', numeric: false, disablePadding: false, label: 'TS Date' },
  { id: 'htLineLength', numeric: true, disablePadding: false, label: 'HT Line Length' },
  { id: 'ltLineLength', numeric: true, disablePadding: false, label: 'LT Line Length' },
  { id: 'tcCapacity', numeric: true, disablePadding: false, label: 'TC Capacity' },
  { id: 'fqNo', numeric: true, disablePadding: false, label: 'FQ No' },
  { id: 'fqDate', numeric: false, disablePadding: false, label: 'FQ Date' },
  { id: 'fqSd', numeric: true, disablePadding: false, label: 'FQ SD' },
  { id: 'fqAmountTotal', numeric: true, disablePadding: false, label: 'FQ Amount Total' },
  { id: 'fqMrNo', numeric: false, disablePadding: false, label: 'FQ MR No' },
  { id: 'fqMrDate', numeric: false, disablePadding: false, label: 'FQ MR Date' },
  { id: 'tmnNumber', numeric: false, disablePadding: false, label: 'TMN Number' },
  { id: 'tmnDate', numeric: false, disablePadding: false, label: 'TMN Date' },
  { id: 'trAmount', numeric: false, disablePadding: false, label: 'TR Amount' },
  { id: 'trMrNumber', numeric: false, disablePadding: false, label: 'TR MR Number' },
  { id: 'trDate', numeric: false, disablePadding: false, label: 'TR Date' },
  { id: 'consumerNumber', numeric: false, disablePadding: false, label: 'Consumer Number' },
  { id: 'srStatus', numeric: false, disablePadding: false, label: 'SR Status' },
  { id: 'remark', numeric: false, disablePadding: false, label: 'Remark' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 'bold' }} // Bold header cells

          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Registration Entries
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// Function to format date from 'yyyy-mm-dd' to 'dd-mm-yyyy'
function formatDate(dateString) {
  if (!dateString) return 'N/A'; // Handle null or empty dates
  const date = new Date(dateString);
  const day = ('0' + date.getUTCDate()).slice(-2);
  const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
}

// Function to parse date from 'dd-mm-yyyy' format
function parseDate(dateString) {
  const [day, month, year] = dateString.split('-');
  return new Date(year, month - 1, day);
}

function EnhancedTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('rcDate');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/formRoutes/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.userId; // Return userId for chaining
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        return null;
      }
    };

    const fetchData = async (userId) => {
      try {
        if (!userId) return; // If no userId, exit early

        const response = await axios.get(`/api/formRoutes/${userId}`);
        const filteredRows = response.data.filter(row =>
          row.srStatus === "OPEN" &&
          row.phase === "Single Phase" &&
          row.category === "Manufacturing & Service Industries" &&
          row.srType === "Change of Load for LT Reduction" &&
          row.fqMrDate !== null &&
          row.fqMrDate !== undefined &&
          row.fqMrDate.trim() !== ""
        );
        setRows(filteredRows);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllData = async () => {
      const userId = await fetchUserData();
      await fetchData(userId);
    };

    fetchAllData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(rows.map(row => {
      const formattedRow = {};
      headCells.forEach(cell => {
        formattedRow[cell.label] = cell.id.includes('Date') ? formatDate(row[cell.id]) : row[cell.id];
      });
      return formattedRow;
    }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Registration Entries');
    XLSX.writeFile(wb, 'SingleQMSILrPP.xlsx');
  };


  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={0} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .sort((a, b) => {
                  if (orderBy === 'rcDate') {
                    const dateA = parseDate(formatDate(a.rcDate));
                    const dateB = parseDate(formatDate(b.rcDate));
                    return order === 'asc' ? dateA - dateB : dateB - dateA;
                  } else if (typeof a[orderBy] === 'number') {
                    return order === 'asc' ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
                  } else {
                    return order === 'asc'
                      ? a[orderBy].localeCompare(b[orderBy])
                      : b[orderBy].localeCompare(a[orderBy]);
                  }
                })
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.srNumber}
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="none" align="center">
                        {row.srNumber}
                      </TableCell>
                      <TableCell align="center">{row.category}</TableCell>
                      <TableCell align="center">{row.nameOfApplicant}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">{row.tariff}</TableCell>
                      <TableCell align="center">{row.load}</TableCell>
                      <TableCell align="center">{row.phase}</TableCell>
                      <TableCell align="center">{row.regiCharge}</TableCell>
                      <TableCell align="center">{formatDate(row.rcDate)}</TableCell>
                      <TableCell align="center">{row.rcMrNo}</TableCell>
                      <TableCell align="center">{row.surveyCategory}</TableCell>
                      <TableCell align="center">{formatDate(row.dateOfSurvey)}</TableCell>
                      <TableCell align="center">{row.tsAmount}</TableCell>
                      <TableCell align="center">{row.tsNo}</TableCell>
                      <TableCell align="center">{formatDate(row.tsDate)}</TableCell>
                      <TableCell align="center">{row.htLineLength}</TableCell>
                      <TableCell align="center">{row.ltLineLength}</TableCell>
                      <TableCell align="center">{row.tcCapacity}</TableCell>
                      <TableCell align="center">{row.fqNo}</TableCell>
                      <TableCell align="center">{formatDate(row.fqDate)}</TableCell>
                      <TableCell align="center">{row.fqSd}</TableCell>
                      <TableCell align="center">{row.fqAmountTotal}</TableCell>
                      <TableCell align="center">{row.fqMrNo}</TableCell>
                      <TableCell align="center">{formatDate(row.fqMrDate)}</TableCell>
                      <TableCell align="center">{row.tmnNumber}</TableCell>
                      <TableCell align="center">{formatDate(row.tmnDate)}</TableCell>
                      <TableCell align="center">{row.trAmount}</TableCell>
                      <TableCell align="center">{row.trMrNumber}</TableCell>
                      <TableCell align="center">{formatDate(row.trDate)}</TableCell>
                      <TableCell align="center">{row.consumerNumber}</TableCell>
                      <TableCell align="center">{row.srStatus}</TableCell>
                      <TableCell align="center">{row.remark}</TableCell>
                    </TableRow>
                  );
                })}
            
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 2 }}>
          <Tooltip title="Export to Excel">
            <IconButton onClick={handleExport}>
              <Typography variant="body2">Export</Typography>
            </IconButton>
          </Tooltip>
        </Box>
       
      </Paper>
    </Box>
  );
}

export default function SingleQMSILrPP() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<EnhancedTable />} />
        </Routes>
      </Box>
    </Box>
  );
}
