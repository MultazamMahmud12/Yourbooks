import {
  createBrowserRouter,
  
} from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
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
    ]
  },
  
]);
export default router; 