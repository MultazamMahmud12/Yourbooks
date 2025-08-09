import {
  createBrowserRouter,
} from "react-router-dom";
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
import Dashboard from "../components/Dashboard"; // ✅ Main dashboard layout
import Dashboard_main from "../components/Dashboard_main";
import Managebooks from "../components/Managebooks";
import Addbook from "../components/Addbook";

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
        element: <div>About</div>
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
        path: "/books/:id",
        element: <BookDetails/>
      },
      {
        path: "/orders",
        element: <PrivateRouters><Orderpage/></PrivateRouters>
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminLogin/>
  },
  // ✅ FIXED: Proper dashboard routing structure
  {
    path: "/dashboard",
    element: <AdminRoute><Dashboard /></AdminRoute>, // ✅ Main layout wrapper
    children: [
      {
        path: "", // ✅ Empty path = /dashboard shows Dashboard_main
        element: <Dashboard_main />
      },
      {
        path: "add-new-book", // ✅ /dashboard/add-new-book
        element: <Addbook />
      },
      {
        path: "manage-books", // ✅ /dashboard/manage-books  
        element: <Managebooks />
      },
      {
        path: "edit-book/:id", // ✅ /dashboard/edit-book/123
        element: <div>Edit Book Component</div>
      },
      {
        path: "stats", // ✅ /dashboard/stats
        element: <div>Analytics Component</div>
      },
      {
        path: "orders", // ✅ /dashboard/orders
        element: <div>Orders Management</div>
      }
    ]
  }
]);

export default router;