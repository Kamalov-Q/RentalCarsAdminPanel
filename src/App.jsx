/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import {
  BorderRightOutlined,
  CarOutlined,
  HomeOutlined,
  InfoOutlined,
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
function App() {
  const navigate = useNavigate();
  return (
    <>
      <div className="main-container">
        <div className="main-container_header">
          <Header />
        </div>
        <div className="main-container_right">
          <Menu
            className="main-menu"
            onClick={({ key }) => {
              if (key === "signOut") {
                //SIGN OUT
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                label: "Home",
                key: "/",
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
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/cars" element={<Cars />} />
      </Routes>
    </div>
  );
};

export default App;
