// components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('sessionToken');
  
  if (!token) {
    // Redirect to home if no token found
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;