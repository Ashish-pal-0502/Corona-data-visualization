import React from "react";
import FileUpload from "./components/FileUpload";
import GetData from "./components/GetData";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Details from "./components/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/upload",
    element: (
      <>
        <Navbar />
        <FileUpload />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/data",
    element: (
      <>
        <Navbar />
        <GetData />
      </>
    ),
  },
  {
    path: "/details",
    element: (
      <>
        <Navbar />
        <Details />
      </>
    ),
  },
]);

function App() {
  return (
    <div>
      <center>
        <RouterProvider router={router} />
      </center>
    </div>
  );
}

export default App;
