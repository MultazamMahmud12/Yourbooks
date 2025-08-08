import {
  createBrowserRouter,
  
} from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/book/Checkout";
import BookDetails from "../pages/book/BookDetails";
import PrivateRouters from "./PrivateRouters";
import Orderpage from "../pages/orders/Orderpage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/Adminlogin";
import { MdDashboard } from "react-icons/md";
import Dashboard from "../components/dashboard";
import Dashboard_main from "../components/Dashboard_main";
import Managebooks from "../components/Managebooks";
import Addbook from "../components/Addbook"; // Import the Addbook component
 // Add this import

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
     
      {
        path: "/about",
        element: <div>about</div>
      },
      {
        path: "/login", 
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/cart",
        element: <Cart/>
      },

      {
        path: "/checkout",
        element: <PrivateRouters><Checkout/></PrivateRouters>
      },
      {
        path : "/books/:id",
        element: <BookDetails/>
      },
      {
        path : "/orders",
        element:<PrivateRouters><Orderpage/></PrivateRouters>
      }
    ]
  },
  {
    path : "/admin",
    element: <AdminLogin/>
  },
  {
    path: "/dashboard",
    element: <AdminRoute><Dashboard_main/></AdminRoute>,
    children: [
      {
        path: "/dashboard",
        element: <AdminRoute><div>Dashboard Content</div></AdminRoute>
      },
      {
        path : "add-new-book",
        element: <AdminRoute><Addbook/></AdminRoute>
      },
      {
        path : "manage-books",
        element: <AdminRoute><Managebooks/></AdminRoute>
      },
      {
        path : "edit-book/:id",
        element: <AdminRoute><div>Edit Book</div></AdminRoute>
      }
    ]
  },
]);
export default router; 