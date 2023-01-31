import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Board from "./components/Board";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Success from "./pages/Success";
import UserInfo from "./pages/UserInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "board",
            element: <Board />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "userinfo",
        element: <UserInfo />,
      },
    ],
  },
  {
    path: "/success",
    element: <Success />,
  },
]);
export default router;
