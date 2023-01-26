import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import LoggedIn from "./LoggedIn";

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
    ],
  },
]);

export default router;
