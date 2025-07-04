import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layout/MainLayout"
import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import Foods from "../pages/Foods/Foods"
import SingleFood from "../pages/SingleFood/SingleFood"
import FoodPurchase from "../pages/FoodPurchase/FoodPurchase"
import BookNow from "../pages/BookNow/BookNow"
import Gallery from "../pages/Gallery/Gallery"
import MyFoods from "../pages/MyFoods/MyFoods"
import AddFood from "../pages/AddFood/AddFood"
import MyOrders from "../pages/MyOrders/MyOrders"
import PrivateRoute from "./PrivateRoute"
import ErrorPage from "../pages/ErrorPage/ErrorPage"
import Events from "../components/Events/Events"
import Contact from "../pages/Contact/Contact"
import CustomerReviews from "../components/CustomerReviews/CustomerReviews"
import Blog from "../pages/Blog/Blog"
import TermsOfUse from "../pages/TermsOfUse/TermsOfUse"

// Main router configuration with all routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Public routes
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/all-foods", element: <Foods /> },
      { path: "/food/:id", element: <SingleFood /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/events", element: <Events /> },
      { path: "/reviews", element: <CustomerReviews /> },
      { path: "/contact", element: <Contact /> },
      { path: "/blog", element: <Blog /> },
      { path: "/terms-of-use", element: <TermsOfUse /> },

      // Protected routes - need login
      {
        path: "/purchase/:id",
        element: (
          <PrivateRoute>
            <FoodPurchase />
          </PrivateRoute>
        ),
      },
      {
        path: "/book-now",
        element: (
          <PrivateRoute>
            <BookNow />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-foods",
        element: (
          <PrivateRoute>
            <MyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      // 404 error page
      { path: "*", element: <ErrorPage /> },
    ],
  },
])

export default router
