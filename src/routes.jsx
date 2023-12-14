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
import UserDashboardPage from './pages/UserPage/UserDashboardPage';
import RequestedClearancePage from './pages/UserPage/RequestedClearancePage.jsx';
import RequestBrgyClearance from './pages/UserPage/RequestBrgyClearance.jsx';
import RequestResidency from './pages/UserPage/RequestResidency.jsx';
import RequestBusiness from './pages/UserPage/RequestBusiness.jsx';
import ViewBrgyClearance from './pages/UserPage/ViewBrgyClearance.jsx';
import ViewResidency from './pages/UserPage/ViewResidency.jsx';
import ViewBusiness from './pages/UserPage/ViewBusiness.jsx';
import ViewAllRequested from './pages/ViewAllRequested.jsx';
import BlotterPage from './pages/BlotterPage.jsx';
import UserBlotterPage from './pages/UserPage/UserBlotterPage.jsx';
// ----------------------------------------------------------------------

export default function Router() {

  const ProtectedRoute = ({ children, role }) => {
    const { currentUser, loading, userData } = useContext(AuthContext);

    const [timedOut, setTimedOut] = useState(false);
  
    useEffect(() => {
      // Set a timeout to consider the loading taking too long
      const timeoutId = setTimeout(() => {
        setTimedOut(true);
      }, 4000); // 5 seconds timeout (adjust as needed)
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, []);
  
    if (loading) {
      if (timedOut) {
        // Redirect to login page if loading takes too long
        return <Navigate to="/login" replace />;
      } else {
        return <Loader/>;
      }
    }
  
    if (!currentUser) {
      // Redirect to the login page if the user is not authenticated
      return <Navigate to="/login" />;
    }
    if (role && userData.role !== role) {
      if (userData.role === "Admin") {
        return <Navigate to={'/dashboard'}/>
      } else {
        return <Navigate to={'/user'}/>
      }
    }
     // Render the children if the user is authenticated
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
        { element: <ProtectedRoute role={"Admin"}><Navigate to="/dashboard/app" /></ProtectedRoute>, index: true },
        { path: 'app', element: <ProtectedRoute role={"Admin"}><DashboardAppPage /></ProtectedRoute> },
        { path: 'user', element: <ProtectedRoute role={"Admin"}><UserPage /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute role={"Admin"}><ProductsPage /></ProtectedRoute> },
        { path: 'blog', element: <ProtectedRoute role={"Admin"}><BlogPage /></ProtectedRoute> },
        { path: 'map', element: <ProtectedRoute role={"Admin"}><MapPage /></ProtectedRoute> },
        { path: 'blotter', element: <ProtectedRoute role={"Admin"}><BlotterPage /></ProtectedRoute> },
        { path: 'clearance', element: <ProtectedRoute role={"Admin"}><ViewAllRequested /></ProtectedRoute> },
        { path: 'clearance/brgyclearance/:id', element: <ProtectedRoute><ViewBrgyClearance /></ProtectedRoute> },
        { path: 'clearance/residency/:id', element: <ProtectedRoute><ViewResidency /></ProtectedRoute> },
        { path: 'clearance/business/:id', element: <ProtectedRoute><ViewBusiness /></ProtectedRoute> },
        { path: 'record', element: <ProtectedRoute role={"Admin"}><ResidenceRecordPage /></ProtectedRoute> },
        { path: 'record/view/:id', element: <ProtectedRoute role={"Admin"}><RecordViewPage /></ProtectedRoute> },
        { path: 'brgyinfo', element: <ProtectedRoute role={"Admin"}><BarangayInfoPage /></ProtectedRoute> },
        { path: 'brgyinfo/demographic', element: <ProtectedRoute role={"Admin"}><Demographic /></ProtectedRoute> },
        { path: 'brgyinfo/location', element: <ProtectedRoute role={"Admin"}><BarangayLocationPage /></ProtectedRoute> },
      ],
    },
    {
      path: '/user',
      element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
      children: [
        { element: <ProtectedRoute><Navigate to="/user/app" /></ProtectedRoute>, index: true },
        { path: 'app', element: <ProtectedRoute><UserDashboardPage /></ProtectedRoute> },
        
        { path: 'products', element: <ProtectedRoute><ProductsPage /></ProtectedRoute> },
        { path: 'blog', element: <ProtectedRoute><BlogPage /></ProtectedRoute> },
        { path: 'map', element: <ProtectedRoute><MapPage /></ProtectedRoute> },
        { path: 'record', element: <ProtectedRoute><ResidenceRecordPage /></ProtectedRoute> },
        { path: 'record/view/:id', element: <ProtectedRoute><RecordViewPage /></ProtectedRoute> },
        { path: 'brgyinfo', element: <ProtectedRoute><BarangayInfoPage /></ProtectedRoute> },
        { path: 'brgyinfo/demographic', element: <ProtectedRoute><Demographic /></ProtectedRoute> },
        { path: 'brgyinfo/location', element: <ProtectedRoute><BarangayLocationPage /></ProtectedRoute> },

        { path: 'blotter', element: <ProtectedRoute><UserBlotterPage /></ProtectedRoute> },

        { path: 'view', element: <ProtectedRoute><RequestedClearancePage /></ProtectedRoute> },
        { path: 'view/brgyclearance/:id', element: <ProtectedRoute><ViewBrgyClearance /></ProtectedRoute> },
        { path: 'view/residency/:id', element: <ProtectedRoute><ViewResidency /></ProtectedRoute> },
        { path: 'view/business/:id', element: <ProtectedRoute><ViewBusiness /></ProtectedRoute> },
        { path: 'reqbrgyclearance', element: <ProtectedRoute><RequestBrgyClearance /></ProtectedRoute> },
        { path: 'reqresidency', element: <ProtectedRoute><RequestResidency /></ProtectedRoute> },
        { path: 'reqbusiness', element: <ProtectedRoute><RequestBusiness /></ProtectedRoute> },
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
