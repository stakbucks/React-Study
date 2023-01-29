import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
