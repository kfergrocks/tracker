import { Outlet } from 'react-router-dom';
import Header from './Header';

const OpenRoutes = () => {
  return [<Header key="header" />, <Outlet key="body" />];
};

export default OpenRoutes;
