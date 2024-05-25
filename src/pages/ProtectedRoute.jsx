import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './Auth.js';

function ProtectedRoute() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      const authStatus = await isAuthenticated();
      setIsAuth(authStatus);
    }

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuth === false) {
      localStorage.clear();
    }
  }, [isAuth]);

  if (isAuth === null) {
    // You can render a loading spinner or some placeholder here
    return <div>Loading...</div>;
  }

  return isAuth ? <Outlet /> : <Navigate to="/LoginUser" />;
}

export default ProtectedRoute;
