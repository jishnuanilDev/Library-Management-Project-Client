import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

const ProtectedAdminLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  
  useEffect(() => {
    const token = localStorage.getItem('adminLibraryToken');
    const currentPath = window.location.pathname; 
    if (!token) {
      navigate('/admin');  
      setLoading(false)
    } else {
     
      if (currentPath === '/admin') {
        navigate('/admin/dashboard');  
      } else {
        navigate(currentPath);  
      }
    setLoading(false)
    }
  }, [navigate]);

  if (loading) {
    return <CircularProgress />;
  }

  return <>{children}</>;
};

export default ProtectedAdminLayout;
