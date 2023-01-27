import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import LoggedIn from "./LoggedIn";
import Login from "./Login";
import NaverLoggedIn from "./NaverLoggedIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
        children: [
          {
            path: "naverLoggedIn",
            element: <NaverLoggedIn />,
          },
          {
            path: "/loggedIn",
            element: <LoggedIn />,
          },
        ],
      },
    ],
  },
]);

export default router;
