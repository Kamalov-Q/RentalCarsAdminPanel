/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
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
import { Menu } from "antd";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Category from "./Pages/Category/Category";
import Brands from "./Pages/Brands/Brand";
import Cities from "./Pages/Cities/City";
import Locations from "./Pages/Locations/Location";
import Cars from "./Pages/Cars/Cars";
// import Header from "./Pages/Header/Header";
// import Footer from "./Pages/Footer/Footer";
import Home from "./Pages/Home/Home";
import Modell from "./Pages/Models/Model";
import { useEffect, useState } from "react";
import { Input, QRCode, Space } from "antd";
import { toast } from "react-toastify";

// import Login from "./Pages/Login/Login";
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator?.onLine) {
      toast?.info("You are welcome!");
    }
  }, []);
  const [text, setText] = useState("");

  return (
    <>
      <div className="main-container">
        <div>
          <Space direction="vertical" align="center">
            <QRCode value={text || "-"} />
            <Input
              placeholder="-"
              maxLength={60}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Space>
        </div>
        <div className="main-container_right">
          <Menu
            className="main-menu"
            onClick={({ key }) => {
              if (key === "logOut") {
                localStorage.removeItem("access_token");
                <Navigate to={"/"} />;
              } else {
                navigate(key);
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
          <Content />
        </div>
        <div className="main-container_footer">{/* <Footer /> */}</div>
      </div>
    </>
  );
}

export const Content = () => {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/homepage" element={<Home />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/models" element={<Modell />} />
      </Routes>
    </div>
  );
};

export default App;
