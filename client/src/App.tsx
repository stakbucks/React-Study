import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Navigator from "./components/Navigator";

function App() {
  return (
    <>
      <Navigator />
      <Outlet />
    </>
  );
}

export default App;
