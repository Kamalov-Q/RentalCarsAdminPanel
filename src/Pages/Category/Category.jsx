/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Category.css";
import { DeleteFilled, EditFilled, PlusCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

const Category = () => {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzkwYzBiNzktMWFkNy00NGM1LWE5ODMtMzUzMzMzNjZmOGU5IiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcyMTU3NTkxMSwiZXhwIjoxNzUzMTExOTExfQ.MdkDZcdFAndvUe1UdvIryXIEd3ABjpAiOAZEp3nhZSk`;
  const baseUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/`;
  const baseImgUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/`;
  const [category, setCategory] = useState([]);

  const [addOpen, setAddOpen] = useState(false);

  const handleAddModalOpen = () => {
    setAddOpen(true);
  };
  const handleAddModaClose = () => {
    setAddOpen(false);
  };

  //GET
  const getCategory = () => {
    fetch(`${baseUrl}categories`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((categ) => {
        if (categ?.success) {
          setCategory(categ?.data);
          console.log(categ?.data);
        }
      });
  };

  //POST
  const [nameEn, setNameEn] = useState("");
  const [nameUz, setNameUz] = useState("");
  const [picture, setPicture] = useState(null);
  const addFormData = new FormData();
  addFormData.append("name_en", nameEn);
  addFormData.append("name_uz", nameUz);
  addFormData.append("images", picture)
  const addCategory = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}categories`, {
      method: "POST",
      body: addFormData,
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      if(data?.success) {
        getCategory();
        alert(data?.message);
        console.log(data?.data);
      }
    })
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      {/* POST */}
      <Modal open={addOpen} onCancel={handleAddModaClose} footer={null}>
        <div className="container p-3">
          <p className="lead">Add Category</p>
          <form onSubmit={(e) => addCategory(e)}>
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
                  <button className="btn btn-outline-primary mx-2" onClick={handleAddModaClose}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={(e) => addCategory(e)}>Ok</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <div className="container overflow-y-hidden">
        <div className="row mb-4">
          <div className="col-lg-12 d-flex justify-content-between">
            <div className="display-6">Categories</div>
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
                        <div className="mt-3"><span className="me-3">{item?.created_at.slice(0, item?.created_at.indexOf("T"))}</span> <span>{item?.created_at.slice(item?.created_at.indexOf("T")+1, item?.created_at.indexOf("."))}</span></div>
                      </td>
                      <td>{item?.name_ru}</td>
                      <td>
                        <button className="btn btn-outline-primary mx-2">
                          Edit <EditFilled/>
                        </button>
                        <button className="btn btn-danger">Delete <DeleteFilled/></button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
