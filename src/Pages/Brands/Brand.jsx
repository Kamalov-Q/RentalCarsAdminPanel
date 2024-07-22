/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Brand.css";
import { DeleteFilled, EditFilled, PlusCircleFilled } from "@ant-design/icons";

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const baseUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/`;
  const baseImgUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/`;

  const getBrands = () => {
    fetch(`${baseUrl}brands`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          setBrands(data?.data);
          console.log(data?.data);
        }
      });
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row mb-4">
          {/*  <div className="col-lg-12 d-flex justify-content-between">
            <p className='lead display-5'>Brands</p>
            <button className='btn btn-primary'>Add <PlusCircleFilled/></button>
          </div> */}
          <div className="col-lg-12 d-flex justify-content-between">
            <p className="display-6">Brands</p>
            <button className="btn btn-primary">
              Add {<PlusCircleFilled />}{" "}
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

export default Brand;
