import styled from "styled-components";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Header from "./components/Header";
import Login from "./Login";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
export default App;
