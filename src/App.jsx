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
import { Route, Routes, useNavigate } from "react-router-dom";
import Category from "./Pages/Category/Category";
import Brands from "./Pages/Brands/Brand";
import Cities from "./Pages/Cities/City";
import Locations from "./Pages/Locations/Location";
import Cars from "./Pages/Cars/Cars";
import Header from "./Pages/Header/Header";
import Footer from "./Pages/Footer/Footer";
import Home from "./Pages/Home/Home";
import Model from "./Pages/Models/Model";
import Login from "./Pages/Login/Login";
function App() {
  const navigate = useNavigate();
  return (
    <>
      <div className="main-container">
        <div className="main-container_header">
          {/* <Header /> */}
        </div>
        <div className="main-container_right">
          <Menu
            className="main-menu"
            onClick={({ key }) => {
              if (key === "logOut") {
                navigate('/')
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
                label : "Models", key: "/models", icon: <MobileOutlined/>
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
        {/*   <div className="main-container_footer">
          <Footer />
        </div> */}
      </div>
    </>
  );
}

const Content = () => {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/homepage" element={<Home />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/models" element={<Model/>}/>
      </Routes>
    </div>
  );
};

export default App;
