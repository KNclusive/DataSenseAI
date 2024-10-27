import React, { useState, useEffect } from 'react';
import { 
 Paper, 
 Typography, 
 List, 
 ListItem, 
 ListItemText, 
 Divider, 
 IconButton,
 Box 
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenChartDialog from './FullscreenChartDialog';
import { fetchInsights } from '../services/api';
import Loader from './Loader';  // Import the custom Loader

const PreviousInsights = () => {
 const [insights, setInsights] = useState([]);
 const [fullscreenChart, setFullscreenChart] = useState(null);
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
   const getInsights = async () => {
     try {
      setLoading(true);
      const token = sessionStorage.getItem('sessionToken');

      if (!token) {
        setError('Please login to view insights');
        setInsights([]);
        return;
      }
      const data = await fetchInsights();
      setInsights(data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching insights:', error);
      setError('Failed to fetch insights. Please try again later.');
      setInsights([]);
    } finally {
      setLoading(false);
    }
  };
  getInsights();
 }, []);

 const handleOpenFullscreen = (chart) => {
   setFullscreenChart(chart);
 };

 const handleCloseFullscreen = () => {
   setFullscreenChart(null);
 };

 if (loading) {
   return <Loader />;
 }

 if (error) {
   return (
     <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
       <Typography color="error">{error}</Typography>
     </Paper>
   );
 }

 if (!insights || insights.length === 0) {
   return (
     <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
       <Typography>No insights available yet. Try generating some insights first.</Typography>
     </Paper>
   );
 }

 return (
   <>
     <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
       <Typography variant="h6" gutterBottom>Previous Insights</Typography>
       <List>
         {insights.map((item, index) => (
           <React.Fragment key={index}>
             <ListItem alignItems="flex-start">
               <ListItemText
                 primary={`Query: ${item.query}`}
                 secondary={
                   <>
                     <Typography component="span" variant="body2" color="text.primary">
                       Date: {new Date(item.date).toLocaleString()}
                     </Typography>
                     <Typography component="p" variant="body2">
                       Insight: {typeof item.insight === 'string' 
                         ? item.insight 
                         : JSON.stringify(item.insight, null, 2)}
                     </Typography>
                     {item.chart && (
                       <Box 
                         sx={{ 
                           mt: 1, 
                           height: 100, 
                           bgcolor: '#f0f0f0', 
                           display: 'flex', 
                           alignItems: 'center', 
                           justifyContent: 'center', 
                           position: 'relative',
                           borderRadius: 1
                         }}
                       >
                         Chart Placeholder
                         <IconButton
                           size="small"
                           sx={{ 
                             position: 'absolute', 
                             right: 8, 
                             top: 8,
                             bgcolor: 'background.paper',
                             '&:hover': { bgcolor: 'background.default' }
                           }}
                           onClick={() => handleOpenFullscreen(item.chart)}
                         >
                           <FullscreenIcon />
                         </IconButton>
                       </Box>
                     )}
                   </>
                 }
               />
             </ListItem>
             {index < insights.length - 1 && <Divider />}
           </React.Fragment>
         ))}
       </List>
     </Paper>
     {fullscreenChart && (
       <FullscreenChartDialog chart={fullscreenChart} onClose={handleCloseFullscreen} />
     )}
   </>
 );
};

export default PreviousInsights;