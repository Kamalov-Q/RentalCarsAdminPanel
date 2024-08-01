/* eslint-disable no-unused-vars */
import { DeleteFilled, EditFilled, PlusCircleFilled } from "@ant-design/icons";
import "./Cars.css";
import { useEffect, useState } from "react";
import { Modal } from "antd";

const Cars = () => {
  const token = localStorage.getItem("access_token");
  const baseUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/`;
  const baseImgUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/`;
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [models, setModels] = useState([]);
  const [locations, setLocations] = useState([]);

  /* addModal */
  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => {
    setAddOpen(true);
  };
  const handleAddClose = () => {
    setAddOpen(false);
  };

  /* GET */
  const getCars = () => {
    setLoading(true);
    fetch(`${baseUrl}cars`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          setLoading(false);
          setCars(data?.data);
        }
      });
  };
  const getBrands = () => {
    fetch(`${baseUrl}brands`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          setBrands(data?.data);
        }
      });
  };
  const getCategories = () => {
    fetch(`${baseUrl}categories`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          setCategories(data?.data);
        }
      });
  };
  const getCities = () => {
    fetch(`${baseUrl}cities`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          setCities(data?.data);
        }
      });
  };
  const getModels = () => {
    fetch(`${baseUrl}models`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          setModels(data?.data);
        }
      });
  };
  const getLocations = () => {
    fetch(`${baseUrl}locations`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          setLocations(data?.data);
        }
      });
  };

  /* POST */
  const [brandInput, setBrandInput] = useState("");
  const [modelInput, setModelInput] = useState("");
  const [color, setColor] = useState();
  const [year, setYear] = useState();
  const [seconds, setSeconds] = useState();
  const [maxSpeed, setMaxSpeed] = useState();
  const [maxPeople, setMaxPeople] = useState();
  const [transmission, setTransmission] = useState();
  const [motor, setMotor] = useState();
  const [driveSide, setDriveSide] = useState();
  const [petrol, setPetrol] = useState();
  const [limitPerDay, setLimitPerDay] = useState();
  const [deposit, setDeposit] = useState();
  const [premPrice, setPremPrice] = useState();
  const [aedPrice, setAedPrice] = useState();
  const [usdPrice, setUsdPrice] = useState();
  const [aedSale, setAedSale] = useState();
  const [usdSale, setUsdSale] = useState();
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [inclusive, setInclusive] = useState(false);

  const [cityInput, setCityInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  const addFormData = new FormData();
  addFormData.append("brand_id", brandInput);
  addFormData.append("model_id", modelInput);
  addFormData.append("city_id", cityInput);
  addFormData.append("color", color);
  addFormData.append("year", year);
  addFormData.append("seconds", seconds);
  addFormData.append("category_id", categoryInput);
  addFormData.append("images", image1);
  addFormData.append("images", image2);
  addFormData.append("max_speed", maxSpeed);
  addFormData.append("max_people", maxPeople);
  addFormData.append("transmission", transmission);
  addFormData.append("motor", motor);
  addFormData.append("drive_side", driveSide);
  addFormData.append("petrol", petrol);
  addFormData.append("limitperday", limitPerDay);
  addFormData.append("deposit", deposit);
  addFormData.append("premium_protection", premPrice);
  addFormData.append("price_in_aed", aedPrice);
  addFormData.append("price_in_usd", usdPrice);
  addFormData.append("price_in_aed_sale", aedSale);
  addFormData.append("price_in_usd_sale", usdSale);
  addFormData.append("location_id", locationInput);
  addFormData.append("inclusive", inclusive);
  addFormData.append("cover", coverImg);

  const addCar = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}cars`, {
      method: "POST",
      body: addFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          getCars();
          handleAddClose();
          alert(data?.message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  /* PUT */
  const [id, setID] = useState("");
  const [editModal, setEditModal] = useState(false);
  const handleEditModalOpen = () => {
    setEditModal(true);
  };
  const handleEditModalClose = () => {
    setEditModal(false);
  };
  const [data, setData] = useState({
    brandInput: "",
    modelInput: "",
    cityInput: "",
    color: "",
    year: "",
    seconds: "",
    categoryInput: "",
    image1: null,
    image2: null,
    maxSpeed: "",
    maxPeople: "",
    transmission: "",
    motor: "",
    driveSide: "",
    petrol: "",
    limitPerDay: "",
    deposit: "",
    premPrice: "",
    aedPrice: "",
    usdPrice: "",
    aedSale: "",
    usdSale: "",
    locationInput: "",
    inclusive: false,
    coverImg: null,
  });
  const editCars = (item) => {
    console.log(item);
    handleEditModalOpen();
    setID(item?.id);
    setData({
      brandInput: item?.brand_id,
      modelInput: item?.model_id,
      cityInput: item?.city_id,
      color: item?.color,
      year: item?.year,
      seconds: item?.seconds,
      categoryInput: item?.category_id,
      image1: item?.car_images[0]?.image?.src,
      image2: item?.car_images[1]?.image?.src,
      maxSpeed: item?.max_speed,
      maxPeople: item?.max_people,
      transmission: item?.transmission,
      motor: item?.motor,
      driveSide: item?.drive_side,
      petrol: item?.petrol,
      limitPerDay: item?.limitperday,
      deposit: item?.deposit,
      premPrice: item?.premium_protection,
      aedPrice: item?.price_in_aed,
      usdPrice: item?.price_in_usd,
      aedSale: item?.price_in_aed_sale,
      usdSale: item?.price_in_usd_sale,
      locationInput: item?.location_id,
      inclusive: item?.inclusive,
      coverImg: item?.car_images[2]?.image?.src,
    });
  };

  const editFormData = new FormData();
  editFormData.append("brand_id", data?.brandInput);
  editFormData.append("model_id", data?.modelInput);
  editFormData.append("city_id", data?.cityInput);
  editFormData.append("color", data?.color);
  editFormData.append("year", data?.year);
  editFormData.append("seconds", data?.seconds);
  editFormData.append("category_id", data?.categoryInput);
  editFormData.append("images", data?.image1);
  editFormData.append("images", data?.image2);
  editFormData.append("max_speed", data?.maxSpeed);
  editFormData.append("max_people", data?.maxPeople);
  editFormData.append("transmission", data?.transmission);
  editFormData.append("motor", data?.motor);
  editFormData.append("drive_side", data?.driveSide);
  editFormData.append("petrol", data?.petrol);
  editFormData.append("limitperday", data?.limitPerDay);
  editFormData.append("deposit", data?.deposit);
  editFormData.append("premium_protection", data?.premPrice);
  editFormData.append("price_in_aed", data?.aedPrice);
  editFormData.append("price_in_usd", data?.usdPrice);
  editFormData.append("price_in_aed_sale", data?.aedSale);
  editFormData.append("price_in_usd_sale", data?.usdSale);
  editFormData.append("location_id", data?.locationInput);
  editFormData.append("inclusive", data?.inclusive);
  editFormData.append("cover", data?.coverImg);

  const handleEdit = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}cars/${id}`, {
      method: "PUT",
      body: editFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          getCars();
          alert(data?.message);
          handleEditModalClose();
        }
      });
  };

  /* DELETE */
  const [deleteOpen, setDelete] = useState(false);
  const handleDeleteOpen = () => {
    setDelete(true);
  };
  const handleDeleteClose = () => {
    setDelete(false);
  };
  const deleteCars = (item) => {
    setID(item?.id);
    console.log(id);
    handleDeleteOpen();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}cars/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          const newCars = cars?.filter((item, _) => item?.id !== id);
          setCars(newCars);
          alert(data?.message);
          handleDeleteClose();
        }
      });
  };

  useEffect(() => {
    getCars();
    getBrands();
    getCategories();
    getCities();
    getModels();
    getLocations();
  }, []);

  return (
    <div className="Cars p-5">
      {/* DELETE */}
      <Modal
        title="Delete Car"
        open={deleteOpen}
        onCancel={handleDeleteClose}
        footer={null}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p>Do you want to delete?</p>
              <button
                className="btn btn-outline-primary me-2"
                onClick={handleDeleteClose}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={(e) => handleDelete(e)}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {/* PUT */}
      <Modal
        title="Edit Car"
        open={editModal}
        onCancel={handleEditModalClose}
        footer={null}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <form action="">
                <div className="row">
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="brand">Brands</label>
                    <select
                      id="brand"
                      className="form-select"
                      value={data?.brandInput}
                      onChange={(e) =>
                        setData({ ...data, brandInput: e?.target?.value })
                      }
                    >
                      {brands &&
                        brands?.map((item, index) => (
                          <option value={item?.id} key={index}>
                            {item?.title}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="model">Model</label>
                    <select
                      id="model"
                      className="form-select"
                      value={data?.modelInput}
                      onChange={(e) =>
                        setData({ ...data, modelInput: e?.target?.value })
                      }
                    >
                      {models &&
                        models?.map((item, index) => (
                          <option value={item?.id} key={index}>
                            {item?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="city">City</label>
                    <select
                      id="city"
                      className="form-select"
                      value={data?.cityInput}
                      onChange={(e) =>
                        setData({ ...data, cityInput: e?.target?.value })
                      }
                    >
                      {cities &&
                        cities?.map((item, index) => (
                          <option value={item?.id} key={index}>
                            {item?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="color">Color</label>
                    <input
                      type="text"
                      placeholder="Color"
                      required
                      className="form-control"
                      id="color"
                      value={data?.color}
                      onChange={(e) =>
                        setData({ ...data, color: e?.target?.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="year">Year</label>
                    <input
                      type="text"
                      placeholder="Year"
                      required
                      className="form-control"
                      id="year"
                      value={data?.year}
                      onChange={(e) =>
                        setData({ ...data, year: e?.target?.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="seconds">Seconds</label>
                    <input
                      type="text"
                      placeholder="Seconds"
                      required
                      className="form-control"
                      id="seconds"
                      value={data?.seconds}
                      onChange={(e) =>
                        setData({ ...data, seconds: e?.target?.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      className="form-select"
                      value={data?.categoryInput}
                      onChange={(e) =>
                        setData({ ...data, categoryInput: e?.target?.value })
                      }
                    >
                      {categories &&
                        categories?.map((item, index) => (
                          <option value={item?.id} key={index}>
                            {item?.name_en}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="speed">Max Speed</label>
                    <input
                      type="text"
                      placeholder="Speed"
                      required
                      className="form-control"
                      value={data?.maxSpeed}
                      onChange={(e) =>
                        setData({ ...data, maxSpeed: e?.target?.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="people">Max People</label>
                    <input
                      type="text"
                      placeholder="People"
                      required
                      className="form-control"
                      id="people"
                      value={data?.maxPeople}
                      onChange={(e) =>
                        setData({ ...data, maxPeople: e?.target?.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="transmission">Transmission</label>
                    <input
                      type="text"
                      placeholder="Transmission"
                      required
                      className="form-control"
                      id="transmission"
                      value={data?.transmission}
                      onChange={(e) =>
                        setData({ ...data, transmission: e?.target?.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="motor">Motor</label>
                    <input
                      type="text"
                      placeholder="Motor"
                      required
                      className="form-control"
                      id="motor"
                      value={data?.motor}
                      onChange={(e) =>
                        setData({ ...data, motor: e?.target?.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="driveSide">Drive Side</label>
                    <input
                      type="text"
                      placeholder="Drive Side"
                      required
                      className="form-control"
                      id="driveSide"
                      value={data?.driveSide}
                      onChange={(e) =>
                        setData({ ...data, driveSide: e?.target?.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="petrol">Petrol</label>
                    <input
                      type="text"
                      placeholder="Petrol"
                      required
                      className="form-control"
                      id="petrol"
                      value={data?.petrol}
                      onChange={(e) =>
                        setData({ ...data, petrol: e?.target?.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="limit">Limit Per Day</label>
                    <input
                      type="text"
                      placeholder="Limit Per Day"
                      required
                      className="form-control"
                      id="limit"
                      value={data?.limitPerDay}
                      onChange={(e) =>
                        setData({ ...data, limitPerDay: e?.target?.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="deposit">Deposit</label>
                    <input
                      type="text"
                      placeholder="Deposit"
                      required
                      className="form-control"
                      id="deposit"
                      value={data?.deposit}
                      onChange={(e) =>
                        setData({ ...data, deposit: e?.target?.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="premPrice">Premium Price</label>
                    <input
                      type="text"
                      placeholder="Prem. Price"
                      required
                      id="premPrice"
                      className="form-control"
                      value={data?.premPrice}
                      onChange={(e) =>
                        setData({ ...data, premPrice: e?.target?.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="aedPrice">AED Price</label>
                    <input
                      type="text"
                      placeholder="AED Price"
                      required
                      className="form-control"
                      id="aedPrice"
                      value={data?.aedPrice}
                      onChange={(e) =>
                        setData({ ...data, aedPrice: e?.target?.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="usdPrice">USD Price</label>
                    <input
                      type="text"
                      placeholder="USD Price"
                      required
                      className="form-control"
                      id="usdPrice"
                      value={data?.usdPrice}
                      onChange={(e) =>
                        setData({ ...data, usdPrice: e?.target?.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="aedSale">AED Sale</label>
                    <input
                      type="text"
                      placeholder="AED Sale"
                      required
                      className="form-control"
                      id="aedSale"
                      value={data?.aedSale}
                      onChange={(e) =>
                        setData({ ...data, aedSale: e?.target?.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="usdSale">USD Sale</label>
                    <input
                      type="text"
                      placeholder="USD Sale"
                      required
                      className="form-control"
                      id="usdSale"
                      value={data?.usdSale}
                      onChange={(e) =>
                        setData({ ...data, usdSale: e?.target?.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="location">Location</label>
                    <select
                      id="location"
                      className="form-select"
                      value={data?.locationInput}
                      onChange={(e) =>
                        setData({ ...data, locationInput: e?.target?.value })
                      }
                    >
                      {locations &&
                        locations?.map((item, index) => (
                          <option value={item?.id} key={index}>
                            {item?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-2">
                    <label htmlFor="mainImg">For Main Image</label>
                    <input
                      type="file"
                      id="mainImg"
                      className="form-control"
                      required
                      onChange={(e) =>
                        setData({ ...data, image1: e?.target?.files[0] })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-2">
                    <label htmlFor="sideImg" id="sideImg">
                      For Side Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      required
                      onChange={(e) =>
                        setData({ ...data, image2: e?.target?.files[0] })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-3">
                    <label htmlFor="coverImg">For Cover Image</label>
                    <input
                      type="file"
                      id="coverImg"
                      className="form-control"
                      required
                      onChange={(e) =>
                        setData({ ...data, coverImg: e?.target?.files[0] })
                      }
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex gap-2">
                    <label htmlFor="inclusive">Inclusive</label>
                    <input
                      type="checkbox"
                      id="inclusive"
                      required
                      className="form-check"
                      value={data?.inclusive}
                      onClick={() =>
                        setData({ ...data, inclusive: !inclusive })
                      }
                    />
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col-lg-12 d-flex justify-content-end">
                    <button
                      className="btn btn-outline-primary mx-2"
                      onClick={handleEditModalClose}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => handleEdit(e)}
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      {/* POST */}
      <Modal
        title="Add Car"
        open={addOpen}
        onCancel={handleAddClose}
        footer={null}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <form action="" id="myForm">
                <div className="row">
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="brand">Brands</label>
                    <select
                      id="brand"
                      className="form-select"
                      onChange={(e) => setBrandInput(e?.target?.value)}
                    >
                      {brands &&
                        brands?.map((item, index) => (
                          <option value={item?.id} key={index}>
                            {item?.title}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="model">Model</label>
                    <select
                      id="model"
                      className="form-select"
                      onChange={(e) => setModelInput(e?.target?.value)}
                    >
                      {models &&
                        models?.map((item, index) => (
                          <option value={item?.id} key={index}>
                            {item?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="city">City</label>
                    <select
                      id="city"
                      className="form-select"
                      onChange={(e) => setCityInput(e?.target?.value)}
                    >
                      {cities &&
                        cities?.map((item, index) => (
                          <option value={item?.id} key={index}>
                            {item?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="color">Color</label>
                    <input
                      type="text"
                      placeholder="Color"
                      required
                      className="form-control"
                      id="color"
                      onChange={(e) => setColor(e?.target?.value)}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="year">Year</label>
                    <input
                      type="text"
                      placeholder="Year"
                      required
                      className="form-control"
                      id="year"
                      onChange={(e) => setYear(e?.target?.value)}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="seconds">Seconds</label>
                    <input
                      type="text"
                      placeholder="Seconds"
                      required
                      className="form-control"
                      id="seconds"
                      onChange={(e) => setSeconds(e?.target?.value)}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      className="form-select"
                      onChange={(e) => setCategoryInput(e?.target?.value)}
                    >
                      {categories &&
                        categories?.map((item, index) => (
                          <option value={item?.id} key={index}>
                            {item?.name_en}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="speed">Max Speed</label>
                    <input
                      type="text"
                      placeholder="Speed"
                      required
                      className="form-control"
                      onChange={(e) => setMaxSpeed(e?.target?.value)}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="people">Max People</label>
                    <input
                      type="text"
                      placeholder="People"
                      required
                      className="form-control"
                      id="people"
                      onChange={(e) => setMaxPeople(e?.target?.value)}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="transmission">Transmission</label>
                    <input
                      type="text"
                      placeholder="Transmission"
                      required
                      className="form-control"
                      id="transmission"
                      onChange={(e) => setTransmission(e?.target?.value)}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="motor">Motor</label>
                    <input
                      type="text"
                      placeholder="Motor"
                      required
                      className="form-control"
                      id="motor"
                      onChange={(e) => setMotor(e?.target?.value)}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="driveSide">Drive Side</label>
                    <input
                      type="text"
                      placeholder="Drive Side"
                      required
                      className="form-control"
                      id="driveSide"
                      onChange={(e) => setDriveSide(e?.target?.value)}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="petrol">Petrol</label>
                    <input
                      type="text"
                      placeholder="Petrol"
                      required
                      className="form-control"
                      id="petrol"
                      onChange={(e) => setPetrol(e?.target?.value)}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="limit">Limit Per Day</label>
                    <input
                      type="text"
                      placeholder="Limit Per Day"
                      required
                      className="form-control"
                      id="limit"
                      onChange={(e) => setLimitPerDay(e?.target?.value)}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="deposit">Deposit</label>
                    <input
                      type="text"
                      placeholder="Deposit"
                      required
                      className="form-control"
                      id="deposit"
                      onChange={(e) => setDeposit(e?.target?.value)}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="premPrice">Premium Price</label>
                    <input
                      type="text"
                      placeholder="Prem. Price"
                      required
                      id="premPrice"
                      className="form-control"
                      onChange={(e) => setPremPrice(e?.target?.value)}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="aedPrice">AED Price</label>
                    <input
                      type="text"
                      placeholder="AED Price"
                      required
                      className="form-control"
                      id="aedPrice"
                      onChange={(e) => setAedPrice(e?.target?.value)}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="usdPrice">USD Price</label>
                    <input
                      type="text"
                      placeholder="USD Price"
                      required
                      className="form-control"
                      id="usdPrice"
                      onChange={(e) => setUsdPrice(e?.target?.value)}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="aedSale">AED Sale</label>
                    <input
                      type="text"
                      placeholder="AED Sale"
                      required
                      className="form-control"
                      id="aedSale"
                      onChange={(e) => setAedSale(e?.target?.value)}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="usdSale">USD Sale</label>
                    <input
                      type="text"
                      placeholder="USD Sale"
                      required
                      className="form-control"
                      id="usdSale"
                      onChange={(e) => setUsdSale(e?.target?.value)}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-1">
                    <label htmlFor="location">Location</label>
                    <select
                      id="location"
                      className="form-select"
                      onChange={(e) => setLocationInput(e?.target?.value)}
                    >
                      {locations &&
                        locations?.map((item, index) => (
                          <option value={item?.id} key={index}>
                            {item?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-2">
                    <label htmlFor="mainImg">For Main Image</label>
                    <input
                      type="file"
                      id="mainImg"
                      className="form-control"
                      required
                      onChange={(e) => setImage1(e?.target?.files[0])}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-2">
                    <label htmlFor="sideImg" id="sideImg">
                      For Side Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      required
                      onChange={(e) => setImage2(e?.target?.files[0])}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex flex-column gap-3">
                    <label htmlFor="coverImg">For Cover Image</label>
                    <input
                      type="file"
                      id="coverImg"
                      className="form-control"
                      required
                      onChange={(e) => setCoverImg(e?.target?.files[0])}
                    />
                  </div>
                  <div className="col-lg-4 p-2 d-flex gap-2">
                    <label htmlFor="inclusive">Inclusive</label>
                    <input
                      type="checkbox"
                      id="inclusive"
                      required
                      className="form-check"
                      onClick={() => setInclusive(!inclusive)}
                    />
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col-lg-12 d-flex justify-content-end">
                    <button
                      className="btn btn-outline-primary mx-2"
                      onClick={handleAddClose}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => addCar(e)}
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      {/* GET */}
      {loading ? (
        <div>
          <h1 className="display-1 lead">Loading...</h1>
        </div>
      ) : (
        <div className="container" style={{ overflowX: "auto" }}>
          <div className="row mb-4">
            <div className="col-lg-12 d-flex justify-content-between">
              <p className="lead display-6">Cars</p>
              <div>
                <button className="btn btn-primary" onClick={handleAddOpen}>
                  Add <PlusCircleFilled />
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>N</th>
                    <th>Images</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>City</th>
                    <th>Location</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Seconds</th>
                    <th>Year</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars &&
                    cars?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={`${baseImgUrl}${item?.car_images[0]?.image?.src}`}
                            alt={item?.brand?.title}
                            width={100}
                            height={100}
                          />
                        </td>
                        <td>{item?.brand?.title}</td>
                        <td>{item?.category?.name_en}</td>
                        <td>{item?.city?.name}</td>
                        <td>{item?.location?.name}</td>
                        <td>{item?.model?.name}</td>
                        <td>{item?.color}</td>
                        <td>{item?.seconds}</td>
                        <td>{item?.year}</td>
                        <td>
                          <button
                            className="btn btn-outline-primary px-3 mx-2"
                            onClick={() => editCars(item)}
                          >
                            Edit <EditFilled />
                          </button>
                          <button
                            className="btn btn-danger px-3"
                            onClick={() => deleteCars(item)}
                          >
                            Delete <DeleteFilled />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars;
