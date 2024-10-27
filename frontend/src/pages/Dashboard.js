// Dashboard.js
import React from 'react';
import PreviousInsights from '../components/PreviousInsights';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Dashboard = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <PreviousInsights />
    </Box>
  );
};

export default Dashboard;