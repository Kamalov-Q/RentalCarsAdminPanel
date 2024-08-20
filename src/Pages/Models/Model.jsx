/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { DeleteFilled, EditFilled, PlusCircleFilled } from "@ant-design/icons";
import "./Model.css";
import { useEffect, useState } from "react";
import { Modal } from "antd";
const Modell = () => {
  const token = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(false);
  const baseUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/`;
  const baseImgUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/`;
  const [model, setModel] = useState([]);

  /* GET */
  const getModels = () => {
    setLoading(true);
    fetch(`${baseUrl}models`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          setModel(data?.data);
          setLoading(false);
        }
      });
  };

  /* POST */
  const [brandData, setBrandData] = useState([]);
  const [addOpen, setAddOpen] = useState(false);

  const handleAddOpen = () => {
    setAddOpen(true);
  };
  const handleAddClose = () => {
    setAddOpen(false);
  };

  const getBrands = () => {
    fetch(`${baseUrl}brands`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          setBrandData(data?.data);
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err?.message);
      });
  };
  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState("");

  const addFormData = new FormData();
  addFormData.append("name", name);
  addFormData.append("brand_id", brandId);

  const addForm = document.getElementById("addForm");

  const addModels = (e) => {
    e?.preventDefault();
    fetch(`${baseUrl}models`, {
      method: "POST",
      body: addFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          getModels();
          addForm.reset();
          alert(data?.message);
          handleAddClose();
        }
      });
  };

  /* PUT */
  const [id, setId] = useState("");
  const [editData, setEditData] = useState({ name: "", brand_id: "" });

  const [editOpen, setEditOpen] = useState(false);

  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };

  const editModels = (item) => {
    handleEditOpen();
    setId(item?.id);
    setEditData({ name: item?.name, brand_id: item?.brand_id });
  };

  const editDataForm = new FormData();
  editDataForm.append("name", editData?.name);
  editDataForm.append("brand_id", editData?.brand_id);

  const handleEdit = (e) => {
    e?.preventDefault();
    fetch(`${baseUrl}/models/${id}`, {
      method: "PUT",
      body: editDataForm,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          getModels();
          alert(data?.message);
          handleEditClose();
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err?.message);
      });
  };

  /* DELETE */
  const [delOpen, setDelOpen] = useState(false);
  const handleDelOpen = () => {
    setDelOpen(true);
  };
  const handleDelClose = () => {
    setDelOpen(false);
  };
  const deleteModels = (item) => {
    handleDelOpen();
    console.log(item?.id);
    setId(item?.id);
  };

  const handleDelete = () => {
    fetch(`${baseUrl}models/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          const newModels = model?.filter((item, _) => item?.id !== id);
          setModel(newModels);
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
    getModels();
    getBrands();
  }, []);

  return (
    <div className="Model container">
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
          <p className="lead">Edit Model</p>
          <form id="addForm" onSubmit={(e) => handleEdit(e)}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12 d-flex flex-column">
                  <input
                    type="text"
                    placeholder="Name"
                    value={editData?.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e?.target?.value })
                    }
                    className="form-control p-2 mb-3"
                    required
                  />
                  <select
                    className="form-control mb-3"
                    value={editData?.brand_id}
                    onChange={(e) =>
                      setEditData({ ...editData, brand_id: e?.target?.value })
                    }
                  >
                    <option disabled selected={true}>
                      Select Brands
                    </option>
                    {brandData &&
                      brandData?.map((item, idx) => (
                        <option value={item?.id} key={idx}>
                          {item?.title}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-lg-12">
                  <button
                    className="btn btn-outline-primary mx-2"
                    onClick={handleEditClose}
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
      {/* POST */}
      <Modal open={addOpen} onCancel={handleAddClose} footer={null}>
        <div className="container p-3">
          <p className="lead">Add Model</p>
          <form id="addForm" onSubmit={(e) => addModels(e)}>
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
                  <select
                    className="form-control mb-3"
                    onChange={(e) => setBrandId(e?.target?.value)}
                  >
                    <option selected={true}>
                      Select Brands
                    </option>
                    {brandData &&
                      brandData?.map((item, idx) => (
                        <option value={item?.id} key={idx}>
                          {item?.title}
                        </option>
                      ))}
                  </select>
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
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-between">
              <p className="lead display-6">Models</p>
              <button className="btn btn-primary" onClick={handleAddOpen}>
                Add <PlusCircleFilled />
              </button>
            </div>
            <div className="col-lg-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>N</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {model &&
                    model?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div>{item?.name}</div>
                          <div className="mt-3">
                            <span className="me-2">
                              {item?.created_at.slice(
                                0,
                                item?.created_at.indexOf("T")
                              )}
                            </span>
                            <span>
                              {item?.created_at.slice(
                                item?.created_at.indexOf("T") + 1,
                                item?.created_at.indexOf(".")
                              )}
                            </span>
                          </div>
                        </td>
                        <td>{item?.brand_title}</td>
                        <td>
                          <button
                            className="btn btn-outline-primary mx-2"
                            onClick={(e) => editModels(item)}
                          >
                            Edit <EditFilled />
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={(e) => deleteModels(item)}
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

export default Modell;
