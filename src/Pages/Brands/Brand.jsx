/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Brand.css";
import { DeleteFilled, EditFilled, PlusCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

const Brand = () => {
  const token = localStorage.getItem("access_token");
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/`;
  const baseImgUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/`;
  const addForm = document.getElementById("addForm");

  //For Add Modal
  const [addOpen, setAddOpen] = useState(false);

  const handleAddOpen = () => {
    setAddOpen(true);
  };
  const handleAddClose = () => {
    setAddOpen(false);
  };

  const [delOpen, setDelOpen] = useState(false);

  const handleDelOpen = () => {
    setDelOpen(true);
  };
  const handleDelClose = () => {
    setDelOpen(false);
  };

  /* GET METHOD */
  const [title, setTitle] = useState();
  const [image, setImage] = useState();

  const getBrands = () => {
    setLoading(true);
    fetch(`${baseUrl}brands`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          setLoading(false);
          setBrands(data?.data);
          // console.log("brand", data?.data);
        }
      });
  };

  /* POST METHOD */
  const addBrandForm = new FormData();
  addBrandForm.append("title", title);
  addBrandForm.append("images", image);

  const addBrands = (e) => {
    e?.preventDefault();
    fetch(`${baseUrl}/brands`, {
      method: "POST",
      body: addBrandForm,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          getBrands();
          alert(data?.message);
          addForm.reset();
          handleAddClose();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /* PUT METHOD */
  const [id, setId] = useState();

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    images: null,
  });

  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };

  const editBrands = (item) => {
    handleEditOpen();
    setId(item?.id);
    console.log("Image", brands?.image_src);
    setEditData({ title: item?.title, images: item?.images });
  };

  const editDataForm = new FormData();
  editDataForm.append("title", editData?.title);
  // if (editDataForm?.images) {
  editDataForm.append("images", editDataForm?.images);
  // }

  const handleEdit = (e) => {
    e?.preventDefault();
    fetch(`${baseUrl}/brands/${id}`, {
      method: "PUT",
      body: editDataForm,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          getBrands();
          alert(data?.message);
          handleEditClose();
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err?.message);
      });
  };

  /* DELETE METHOD */
  const deleteBrands = (item) => {
    handleDelOpen();
    setId(item?.id);
  };

  const handleDelete = () => {
    fetch(`${baseUrl}/brands/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          const newBrands = brands?.filter((item, _) => item?.id !== id);
          setBrands(newBrands);
          alert(data?.message);
          handleDelClose();
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err?.message);
      });
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div>
      {/* DELETE */}
      <Modal open={delOpen} onCancel={handleDelClose} footer={null}>
        <div className="container p-3">
          <p className="lead">Are you sure you want to delete?</p>
          <div className="col-lg-12">
            <button
              className="btn btn-outline-primary mx-2"
              onClick={handleDelClose}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={() => handleDelete()}>
              Ok
            </button>
          </div>
        </div>
      </Modal>
      {/* PUT */}
      <Modal open={editOpen} onCancel={handleEditClose} footer={null}>
        <div className="container p-3">
          <p className="lead">Edit Brands</p>
          <form id="addForm">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 d-flex flex-column">
                  <input
                    type="text"
                    placeholder="Title"
                    value={editData?.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e?.target?.value })
                    }
                    className="form-control p-2 mb-3"
                    required
                  />
                  <img
                    src={`${baseImgUrl}647ac710-4962-4ecf-9dad-6c29c521aa17.jpeg`}
                    width={150}
                    height={150}
                    alt={title}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control p-2 mb-3"
                    onChange={(e) =>
                      setEditData({ ...editData, images: e?.target?.files[0] })
                    }
                    required
                  />
                </div>
                <div className="col-lg-12">
                  <button
                    className="btn btn-outline-primary mx-2"
                    onClick={handleAddClose}
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
            </div>
          </form>
        </div>
      </Modal>
      {/* POST */}
      <Modal open={addOpen} onCancel={handleAddClose} footer={null}>
        <div className="container p-3">
          <p className="lead">Add Category</p>
          <form id="addForm" onSubmit={(e) => addBrands(e)}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12 d-flex flex-column">
                  <input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e?.target?.value)}
                    className="form-control p-2 mb-3"
                    required
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control p-2 mb-3"
                    onChange={(e) => setImage(e?.target?.files[0])}
                    required
                  />
                </div>
                <div className="col-lg-12">
                  <button
                    className="btn btn-outline-primary mx-2"
                    onClick={handleAddClose}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary">Ok</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      {loading ? (
        /* GET */
        <div
          style={{
            height: "100dvh",
            display: "flex",
            flex: "1",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className="display-1">Loading...</h1>
        </div>
      ) : (
        <div className="container Brand">
          <div className="row mb-4">
            <div className="col-lg-12 d-flex justify-content-between">
              <p className="display-6 lead">Brands</p>
              <button
                className="btn btn-primary"
                onClick={() => handleAddOpen()}
              >
                Add {<PlusCircleFilled />}
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>N</th>
                    <th>Title</th>
                    <th>Images</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {brands &&
                    brands?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div>{item?.title}</div>
                          <div className="mt-3">
                            <span className="me-2">
                              {item?.created_at.slice(
                                0,
                                item?.created_at.indexOf("T")
                              )}
                            </span>{" "}
                            <span>
                              {item?.created_at.slice(
                                item?.created_at.indexOf("T") + 1,
                                item?.created_at.indexOf(".")
                              )}
                            </span>
                          </div>
                        </td>
                        <td>
                          <img
                            src={`${baseImgUrl}${item?.image_src}`}
                            width={100}
                            height={100}
                            alt=""
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-primary mx-2"
                            onClick={() => editBrands(item)}
                          >
                            Edit <EditFilled />
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteBrands(item)}
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

export default Brand;
