/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { DeleteFilled, EditFilled, PlusCircleFilled } from "@ant-design/icons";
import "./Model.css";
import { useEffect, useState } from "react";
const Model = () => {
  const baseUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/`;
  const baseImgUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/`;
  const [model, setModel] = useState([]);


  /* GET */
  const getModels = () => {
    fetch(`${baseUrl}models`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          setModel(data?.data);
          console.log(data?.data);
        }
      });
  };

  useEffect(() => {
    getModels();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-between">
            <p className="lead display-6">Models</p>
            <button className="btn btn-primary">
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
                          </span>{" "}
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
                        <button className="btn btn-outline-primary mx-2">
                          Edit <EditFilled />
                        </button>
                        <button className="btn btn-danger">
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
    </div>
  );
};

export default Model;
