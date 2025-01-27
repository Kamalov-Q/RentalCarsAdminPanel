/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { DeleteFilled, EditFilled, PlusCircleFilled } from "@ant-design/icons";
import "./Location.css";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Location = () => {
  const token = localStorage.getItem("access_token");
  const baseUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/`;
  const baseImgUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/`;

  /* GET */
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    setLoading(true);
    fetch(`${baseUrl}locations`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          setLoading(false);
          setLocation(data?.data);
        }
      });
  };

  /* POST */
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => {
    setAddOpen(true);
  };
  const handleAddClose = () => {
    setAddOpen(false);
  };

  const addFormData = new FormData();
  addFormData.append("name", name);
  addFormData.append("text", text);
  addFormData.append("images", images);

  const addForm = document.getElementById("addForm");
  const handleAdd = (e) => {
    e?.preventDefault();
    fetch(`${baseUrl}/locations`, {
      method: "POST",
      body: addFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          getLocation();
          addForm.reset();
          toast.success(data?.message);
          handleAddClose();
        }
      });
  };

  /* PUT */
  const [id, setId] = useState("");
  const [editData, setEditData] = useState({
    name: "",
    text: "",
    images: null,
  });

  const [editOpen, setEditOpen] = useState(false);

  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };

  const editLocat = (item) => {
    handleEditOpen();
    setId(item?.id);
    setEditData({ name: item?.name, text: item?.text, images: item?.images });
  };
  

  const editFormData = new FormData();
  editFormData.append("name", editData?.name);
  editFormData.append("text", editData?.text);
  if(editData?.images) {
  editFormData.append("images", editData?.images);
  }

  const handleEdit = (e) => {
    e?.preventDefault();
    fetch(`${baseUrl}locations/${id}`, {
      method: "PUT",
      body: editFormData,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((resp)=> resp.json())
    .then((data) => {
      if(data?.success) {
        getLocation();
        toast.success(data?.message);
        handleEditClose();
      }
    })
    .catch((err) => {
      console.error(err);
      toast.error(err?.message);
    })
  }

  /* DELETE */
  const [delOpen, setDelOpen] = useState(false);

  const handleDelOpen = () => {
    setDelOpen(true);
  };
  const handleDelClose = () => {
    setDelOpen(false);
  };

  const deleteLocat = (item) => {
    handleDelOpen();
    setId(item?.id);
  };

  const handleDelete = (e) => {
    e?.preventDefault();
    fetch(`${baseUrl}locations/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          const newLocations = location?.filter((item, _) => item?.id !== id);
          setLocation(newLocations);
          handleDelClose();
          toast.success(data?.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.message);
      });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="Locations container">
      {/* DELETE */}
      {
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
              <button
                className="btn btn-primary"
                onClick={(e) => handleDelete(e)}
              >
                Ok
              </button>
            </div>
          </div>
        </Modal>
      }
      {/* PUT */}
      <Modal open={editOpen} onCancel={handleEditClose} footer={null}>
        <div className="container p-3">
          <p className="lead">Edit Locations</p>
          <form id="addForm">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 d-flex flex-column">
                  <input
                    type="text"
                    placeholder="Name"
                    value={editData?.name}
                    onChange={(e) => setEditData({...editData, name: e?.target?.value})}
                    className="form-control p-2 mb-3"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Text"
                    value={editData?.text}
                    onChange={(e) => setEditData({...editData, text: e?.target?.value})}
                    className="form-control p-2 mb-3"
                    required
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control p-2 mb-3"
                    onChange={(e) => setEditData({...editData, images: e?.target?.files[0]})}
                    required
                  />
                </div>
                <div className="col-lg-12">
                  <button
                    className="btn btn-outline-primary mx-2"
                    onClick={handleEditClose}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleEdit}>
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
          <p className="lead">Add Locations</p>
          <form id="addForm">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 d-flex flex-column">
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e?.target?.value)}
                    className="form-control p-2 mb-3"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Text"
                    onChange={(e) => setText(e?.target?.value)}
                    className="form-control p-2 mb-3"
                    required
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control p-2 mb-3"
                    onChange={(e) => setImages(e?.target?.files[0])}
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
                  <button className="btn btn-primary" onClick={handleAdd}>
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      {loading ? (
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
        /* GET */
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-12 d-flex justify-content-between">
              <p className="lead display-6">Locations</p>
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
                    <th>Name</th>
                    <th>Text</th>
                    <th>Images</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {location &&
                    location?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.name}</td>
                        <td>
                          <div>{item?.text}</div>
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
                            onClick={(e) => editLocat(item)}
                          >
                            Edit <EditFilled />
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={(e) => deleteLocat(item)}
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

export default Location;
