import { Navigate, Outlet } from 'react-router-dom';
import AuthUtil from '../utils/auth';
import Header from './Header';

const ProtectedRoutes = () => {
  const loggedIn = AuthUtil.isLoggedIn();

  return loggedIn ? (
    [<Header key="header" />, <Outlet key="body" />]
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoutes;
