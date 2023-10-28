import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import RegisterPage from './pages/RegisterPage'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import MapPage from './pages/MapPage';
import ResidenceRecordPage from './pages/ResidenceRecordPage';
import BarangayInfoPage from './pages/BarangayInfoPage';
import ViewModal from './components/modal/ViewModal';
import RecordViewPage from './pages/RecordViewPage';
import Loader from './components/loader/Loader';
import Demographic from './pages/Demographic';
import BarangayLocationPage from './pages/BarangayLocationPage';
// ----------------------------------------------------------------------

export default function Router() {

  const ProtectedRoute = ({ children }) => {
    const { currentUser, loading, userData } = useContext(AuthContext);
    const [timedOut, setTimedOut] = useState(false);
  
    useEffect(() => {
      // Set a timeout to consider the loading taking too long
      const timeoutId = setTimeout(() => {
        setTimedOut(true);
      }, 2000); // 5 seconds timeout (adjust as needed)
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, []);
  
    if (loading) {
      if (timedOut) {
        // Redirect to login page if loading takes too long
        return <Navigate to="/login" replace />;
      } else {
        return <Loader/>
      }
    }
  
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };


  const routes = useRoutes([
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: '/',
      // Redirect to the login page when accessing the root URL
      element: <Navigate to="/login" replace />,
    },
    {
      path: '/dashboard',
      element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
      children: [
        { element: <ProtectedRoute><Navigate to="/dashboard/app" /></ProtectedRoute>, index: true },
        { path: 'app', element: <ProtectedRoute><DashboardAppPage /></ProtectedRoute> },
        { path: 'user', element: <ProtectedRoute><UserPage /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><ProductsPage /></ProtectedRoute> },
        { path: 'blog', element: <ProtectedRoute><BlogPage /></ProtectedRoute> },
        { path: 'map', element: <ProtectedRoute><MapPage /></ProtectedRoute> },
        { path: 'record', element: <ProtectedRoute><ResidenceRecordPage /></ProtectedRoute> },
        { path: 'record/view/:id', element: <ProtectedRoute><RecordViewPage /></ProtectedRoute> },
        { path: 'brgyinfo', element: <ProtectedRoute><BarangayInfoPage /></ProtectedRoute> },
        { path: 'brgyinfo/demographic', element: <ProtectedRoute><Demographic /></ProtectedRoute> },
        { path: 'brgyinfo/location', element: <ProtectedRoute><BarangayLocationPage /></ProtectedRoute> },
      ],
    },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
