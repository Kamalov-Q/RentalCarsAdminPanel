/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { DeleteFilled, EditFilled, PlusCircleFilled } from "@ant-design/icons";
import "./Location.css";
import { useEffect, useState } from "react";

const Location = () => {
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
          console.log(data?.data);
        }
      });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <h1 className="display-1">Loading...</h1>
        </div>
      ) : (
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-12 d-flex justify-content-between">
              <p className="lead display-6">Locations</p>
              <div>
                <button className="btn btn-primary">
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
      )}
    </div>
  );
};

export default Location;
