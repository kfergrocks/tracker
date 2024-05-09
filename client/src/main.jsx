import ReactDOM from 'react-dom/client';
import './reset.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/Login.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import OpenRoutes from './components/OpenRoutes.jsx';
import Account from './pages/Account.jsx';
import ErrorPage from './pages/ErrorPage';
import AnonHome from './pages/AnonHome.jsx';
import Home from './pages/Home.jsx';
import AddLog from './pages/AddLog.jsx';

const router = createBrowserRouter([
  {
    element: <OpenRoutes />,
    children: [
      {
        path: '/',
        element: <AnonHome />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/account',
        element: <Account />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/editAccount',
        element: <Account />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/addLog',
        element: <AddLog />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

// Render the RouterProvider component
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
