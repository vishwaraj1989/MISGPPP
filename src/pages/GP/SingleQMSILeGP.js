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
import TablePagination from '@mui/material/TablePagination';
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
import * as XLSX from 'xlsx';
import { Routes, Route } from 'react-router-dom';
import Sidenav from '../../components/Sidenav';
import Navbar from '../../components/Navbar';

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
            sx={{ fontWeight: 'bold' }} // Make table head cells bold
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

function formatDate(dateString) {
  if (!dateString || dateString === 'N/A') return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function parseDate(dateString) {
  if (dateString === 'N/A') return new Date(1970, 0, 1); // Return a valid date for sorting
  const [day, month, year] = dateString.split('-');
  return new Date(year, month - 1, day);
}

function EnhancedTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('rcDate');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Updated default rowsPerPage
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('/api/formRoutes')
      .then(response => {
        const filteredRows = response.data.filter(row =>
          row.srStatus === "OPEN" &&
          row.phase === "Single Phase" &&
          row.category === "Manufacturing & Service Industries" &&
          row.srType === "Change of Load for LT Addition" &&
          (!row.fqMrDate || row.fqMrDate.trim() === "")
        );
        setRows(filteredRows);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExport = () => {
    const filteredRows = rows.map(row => {
      const filteredRow = {};
      headCells.forEach(cell => {
        if (row.hasOwnProperty(cell.id)) {
          filteredRow[cell.id] = row[cell.id];
        }
      });
      return filteredRow;
    });

    const ws = XLSX.utils.json_to_sheet(filteredRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'SingleQMSILeGP.xlsx');
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
                  const valueA = orderBy === 'dateOfSurvey' || orderBy === 'rcDate' ? parseDate(a[orderBy]) : a[orderBy];
                  const valueB = orderBy === 'dateOfSurvey' || orderBy === 'rcDate' ? parseDate(b[orderBy]) : b[orderBy];
                  if (orderBy === 'surveyCategory') {
                    return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
                  }
                  return order === 'asc' ? valueA - valueB : valueB - valueA;
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.srNumber}
                  >
                    {headCells.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align="center"
                      >
                        {headCell.id === 'rcDate' || headCell.id === 'dateOfSurvey' || headCell.id === 'tsDate' || headCell.id === 'fqDate' || headCell.id === 'fqMrDate'
                          ? formatDate(row[headCell.id])
                          : row[headCell.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={headCells.length} />
                </TableRow>
              )}
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
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]} // Updated rowsPerPageOptions
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default function SingleQMSILeGP() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Navbar />
      <Box>
        <Routes>
          <Route path="/" element={<EnhancedTable />} />
        </Routes>
      </Box>
    </Box>
  );
}
