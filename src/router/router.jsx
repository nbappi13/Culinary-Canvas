import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Foods from '../pages/Foods/Foods';
import SingleFood from '../pages/SingleFood/SingleFood';
import FoodPurchase from '../pages/FoodPurchase/FoodPurchase';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/all-foods', element: <Foods /> },
      { path: '/food/:id', element: <SingleFood /> },
      { 
        path: '/purchase/:id', 
        element: (
          <PrivateRoute>
            <FoodPurchase />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;