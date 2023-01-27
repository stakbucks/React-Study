import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import LoggedIn from "./LoggedIn";
import NaverLoggedIn from "./NaverLoggedIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/loggedIn",
        element: <LoggedIn />,
      },
      {
        path: "/naverLoggedIn",
        element: <NaverLoggedIn />,
      },
    ],
  },
]);

export default router;
