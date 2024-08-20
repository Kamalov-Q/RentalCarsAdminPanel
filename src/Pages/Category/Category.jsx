/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
//Category edit is not completed yet!
import { useEffect, useState } from "react";
import "./Category.css";
import { DeleteFilled, EditFilled, PlusCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

const Category = () => {
  const token = localStorage.getItem("access_token");
  const baseUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/`;
  const baseImgUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/`;
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const [addOpen, setAddOpen] = useState(false);

  const handleAddModalOpen = () => {
    setAddOpen(true);
  };
  const handleAddModaClose = () => {
    setAddOpen(false);
  };

  const load = (
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
  );

  /* GET METHOD */
  const getCategory = () => {
    setLoading(true);
    fetch(`${baseUrl}categories`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((categ) => {
        if (categ?.success) {
          setLoading(false);
          setCategory(categ?.data);
          console.log(categ?.data);
        }
      });
  };

  /* POST METHOD */
  const [nameEn, setNameEn] = useState("");
  const [nameUz, setNameUz] = useState("");
  const [picture, setPicture] = useState(null);
  const addFormData = new FormData();
  addFormData.append("name_en", nameEn);
  addFormData.append("name_ru", nameUz);
  addFormData.append("images", picture);

  const addForm = document.getElementById("addForm");

  const addCategory = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}categories`, {
      method: "POST",
      body: addFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          getCategory();
          alert(data?.message);
          addForm.reset();
          handleAddModaClose();
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err?.message);
      });
  };

  /* PUT METHOD */
  const [id, setId] = useState(false);
  const [editData, setEditData] = useState({
    name_ru: "",
    name_en: "",
    images: null,
  });

  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };

  const editCategories = (item) => {
    handleEditOpen();
    setId(item?.id);
    setEditData({
      name_en: item?.name_en,
      name_ru: item?.name_ru,
      images: item?.images,
    });
  };

  const editFormData = new FormData();
  editFormData.append("name_en", editData?.name_en);
  editFormData.append("name_ru", editData?.name_ru);
  if (editData?.images) {
    editFormData.append("images", editData?.images);
  }

  const handleEdit = (e) => {
    e?.preventDefault();
    fetch(`${baseUrl}categories/${id}`, {
      method: "PUT",
      body: editFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          getCategory();
          alert(data?.message);
          handleEditClose();
        }
      });
  };

  /* DELETE METHOD */
  const [delOpen, setDelOpen] = useState(false);
  const handleDelOpen = () => {
    setDelOpen(true);
  };
  const handleDelClose = () => {
    setDelOpen(false);
  };
  const deleteCateg = (item) => {
    handleDelOpen();
    setId(item?.id);
  };

  const handleDelete = (e) => {
    e?.preventDefault();
    fetch(`${baseUrl}/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          const newCategories = category?.filter((item, _) => item?.id !== id);
          setCategory(newCategories);
          handleDelClose();
          alert(data?.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err?.message);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="Category container">
      {/* DELETE  */}
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
      {/* PUT */}
      <Modal open={editOpen} onCancel={handleEditClose} footer={null}>
        <div className="container p-3">
          <p className="lead">Edit Category</p>
          <form onSubmit={(e) => handleEdit(e)}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12 d-flex flex-column">
                  <input
                    type="text"
                    placeholder="Name Eng"
                    value={editData?.name_en}
                    onChange={(e) =>
                      setEditData({ ...editData, name_en: e?.target?.value })
                    }
                    className="form-control p-2 mb-3"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Name Uzb"
                    value={editData?.name_ru}
                    onChange={(e) =>
                      setEditData({ ...editData, name_ru: e?.target?.value })
                    }
                    className="form-control p-2 mb-3"
                    required
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control p-2 mb-3"
                    onChange={(e) =>
                      setEditData({ ...editData, images: e?.target?.files[0] })
                    }
                  />
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
      <Modal open={addOpen} onCancel={handleAddModaClose} footer={null}>
        <div className="container p-3">
          <p className="lead">Add Category</p>
          <form onSubmit={(e) => addCategory(e)} id="addForm">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 d-flex flex-column">
                  <input
                    type="text"
                    placeholder="Name Eng"
                    onChange={(e) => setNameEn(e?.target?.value)}
                    className="form-control p-2 mb-3"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Name Uzb"
                    onChange={(e) => setNameUz(e?.target?.value)}
                    className="form-control p-2 mb-3"
                    required
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control p-2 mb-3"
                    onChange={(e) => setPicture(e?.target?.files[0])}
                    required
                  />
                </div>
                <div className="col-lg-12">
                  <button
                    className="btn btn-outline-primary mx-2"
                    onClick={handleAddModaClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => addCategory(e)}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      {loading ? (
        load
      ) : (
        <div className="container overflow-y-hidden">
          <div className="row mb-4">
            <div className="col-lg-12 d-flex justify-content-between">
              <div className="display-6 lead">Categories</div>
              <button className="btn btn-primary" onClick={handleAddModalOpen}>
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
                    <th>Image</th>
                    <th>Name Eng</th>
                    <th>Name Uzb</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {category &&
                    category?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={`${baseImgUrl}${item?.image_src}`}
                            alt={`${item?.name_uz}`}
                            width={100}
                            height={100}
                          />
                        </td>
                        <td>
                          <div>{item?.name_en}</div>
                          <div className="mt-3">
                            <span className="me-3">
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
                        <td>{item?.name_ru}</td>
                        <td>
                          <button
                            className="btn btn-outline-primary mx-2"
                            onClick={() => editCategories(item)}
                          >
                            Edit <EditFilled />
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteCateg(item)}
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

export default Category;
