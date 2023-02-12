import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import setBearerToken from './axios';

export default function RequireAuth() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  setBearerToken(localStorage.getItem('token'));

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
}
