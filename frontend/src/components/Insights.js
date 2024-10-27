import React, { useState } from 'react';
import { getInsights } from '../services/api';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Loader from './Loader';

const Insights = () => {
  const [query, setQuery] = useState('');
  const [insight, setInsight] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await getInsights(query);
      setInsight(response);
      setError(null);
    } catch (error) {
      console.error('Failed to get insights:', error);
      setInsight(null);
      setError(error.message || 'Failed to get insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
      <Typography variant="h5" gutterBottom>
        Get Insights
      </Typography>
      <TextField
        label="Enter your query"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit} disabled={!query.trim()}>
        {loading ? 'Fetching...' : 'Get Insights'}
      </Button>
      {loading ? (
        <Loader />
      ) : (
        <>
          {insight && (
            <div style={{ marginTop: 20 }}>
              <Typography variant="h6">Insight:</Typography>
              <pre>{JSON.stringify(insight, null, 2)}</pre>
            </div>
          )}
          {error && (
            <Typography variant="body1" sx={{ marginTop: 2, color: 'red' }}>
              Error: {error}
            </Typography>
          )}
        </>
      )}
    </Paper>
  );
};

export default Insights;