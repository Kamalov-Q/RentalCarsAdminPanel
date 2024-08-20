/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App, { Content } from "./App.jsx";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login/Login.jsx";
import Cars from "./Pages/Cars/Cars.jsx";
import Brand from "./Pages/Brands/Brand.jsx";
import Category from "./Pages/Category/Category.jsx";
import City from "./Pages/Cities/City.jsx";
import Location from "./Pages/Locations/Location.jsx";
import Home from "./Pages/Home/Home.jsx";
import Model from "./Pages/Models/Model.jsx";
/* import { Menu } from "antd";
import {
  BorderRightOutlined,
  CarOutlined,
  HomeOutlined,
  InfoOutlined,
  MobileOutlined,
  MoneyCollectOutlined,
  PlayCircleOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
    {/* <div className="main-container_right">
    <Menu
        className="main-menu"
        onClick={({ key }) => {
          if (key === "logOut") {
            <Navigate to={'/'}/>
          } else {
            <Navigate to={key}/>
          }
        }}
        items={[
          {
            label: "Home",
            key: "/homepage",
            icon: <HomeOutlined />,
          },
          {
            label: "Categories",
            key: "/categories",
            icon: <PlayCircleOutlined />,
          },
          {
            label: "Brands",
            key: "/brands",
            icon: <BorderRightOutlined />,
          },
          {
            label: "Cities",
            key: "/cities",
            icon: <MoneyCollectOutlined />,
          },
          { label: "Locations", key: "/locations", icon: <InfoOutlined /> },
          { label: "Cars", key: "/cars", icon: <CarOutlined /> },
          {
            label: "Models",
            key: "/models",
            icon: <MobileOutlined />,
          },
          {
            label: "Log Out",
            key: "logOut",
            icon: <PoweroffOutlined />,
            danger: true,
          },
        ]}
      ></Menu>
      <Content/>
    </div> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/brands" element={<Brand />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/cities" element={<City />} />
        <Route path="/locations" element={<Location />} />
        <Route path="/models" element={<Model/>}/>
        <Route path="/home" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
