import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routeGenerator";
import { userPaths } from "./user.routes";
import Login from "../components/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/",
    element: <App />,   
    children: routeGenerator(userPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);


export default router;
