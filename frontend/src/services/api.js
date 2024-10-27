// src/services/api.js
export const API_URL = process.env.REACT_APP_API_URL;

export const getInsights = async (query) => {
  try {
    const token = sessionStorage.getItem('sessionToken');
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/query`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.status === 401) {
        sessionStorage.removeItem('sessionToken');
      }
      throw new Error(errorData.detail || 'An error occurred while generating insights');
    }

    const data = await response.json();
    if (data.token) {
      sessionStorage.setItem('sessionToken', data.token);
    }
    return data.response;
  } catch (error) {
    console.error('Error in api getInsights:', error);
    throw error;
  }
};

export const fetchDataset = async (datasetName) => {
  try {
    const response = await fetch(`${API_URL}/datasets/${datasetName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch dataset: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching dataset:', error);
    throw error;
  }
};

export const fetchInsights = async () => {
  try {
    const token = sessionStorage.getItem('sessionToken');
    const headers = {
      'Content-Type': 'application/json'
    };

    if (!token) {
      throw new Error('No session token found');
    }

    headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/insights`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      if (response.status === 401) {
        sessionStorage.removeItem('sessionToken');
      }
      const errorData = await response.json();
      throw new Error(errorData.detail || `Failed to fetch insights: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.map(insight => {
      const parsedInsight = typeof insight === 'string' ? JSON.parse(insight) : insight;
      return {
        query: parsedInsight.original_user_query,
        date: parsedInsight.date,
        insight: parsedInsight.output,
        chart: parsedInsight.charts
      };
    });

  } catch (error) {
    console.error('Error fetching insights:', error);
    throw error;
  }
};