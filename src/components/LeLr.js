import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import Sidenav from './Sidenav';
import Navbar from './Navbar';

const buttons = [
  ["RGPR-LE-GP", "RGPR-LE-PP", "RGPR-LR-GP", "RGPR-LR-PP"],
  ["1Q-MSI-LE-GP", "1Q-MSI-LE-PP", "1Q-MSI-LR-GP", "1Q-MSI-LR-PP"],
  ["3Q-MSI-LE-GP", "3Q-MSI-LE-PP", "3Q-MSI-LR-GP", "3Q-MSI-LR-PP"],
  ["GLP&SL-LE-GP", "GLP&SL-LE-PP", "GLP&SL-LR-GP", "GLP&SL-LR-PP"],
  ["AG-LE-GP", "AG-LE-PP", "AG-LR-GP", "AG-LR-PP"]
];

const rowLabels = [
  "Row 1: RGPR",
  "Row 2: 1Q-MSI",
  "Row 3: 3Q-MSI",
  "Row 4: GLP&SL",
  "Row 5: AG"
];

const colors = ['primary', 'secondary', 'info', 'warning', 'success']; // Define your colors here

export default function LeLr() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Box sx={{ flexGrow: 1, pt: 8, px: 2 }}>
        <Navbar />
        <Box sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
            Load Addition & Load Reduction
          </Typography>
          <Grid container spacing={0}>
            {buttons.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>

                <Typography variant="h6">
                  {rowLabels[rowIndex]} {/* Label for each row */}
                </Typography>
                
                <Grid container item spacing={2}>
                  {row.map((button, colIndex) => (
                    <Grid item xs={3} key={colIndex}>
                      <Button
                        variant="contained"
                        color={colors[rowIndex % colors.length]} // Apply color based on rowIndex
                        fullWidth
                        component={Link}
                        to={`/${button}`}
                      >
                        {button}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
