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
        path: "/orders",
        element: <div>orders</div>
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
      }
    ]
  },
  
]);
export default router; 