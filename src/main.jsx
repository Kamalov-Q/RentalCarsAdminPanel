/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login.jsx";
import Cars from "./Pages/Cars/Cars.jsx";
import Brand from "./Pages/Brands/Brand.jsx";
import Category from "./Pages/Category/Category.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/cars" element={<Cars/>}/>
        <Route path="/home" element={<Brand/>}/>
        <Route path="/categories" element={<Category/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);
