/* eslint-disable no-unused-vars */
import { DeleteFilled, EditFilled, PlusCircleFilled } from '@ant-design/icons'
import './City.css'
import { useEffect, useState } from 'react'

const City = () => {
  const baseUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/`;
  const baseImgUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/`;
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(false);

  const getCities = () => {
    setLoading(true);
    fetch(`${baseUrl}cities`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          setLoading(false);
          setCities(data?.data);
          console.log(data?.data);
        }
      });
  };

  useEffect(() => {
    getCities()
  }, [])

  return (
    <div>
      {
        loading ? <div><h1 className='display-1'>Loading...</h1></div> : <div className="container">
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-between">
            <p className='lead display-6'>Cities</p>
            <button className="btn btn-primary">
              Add {<PlusCircleFilled />}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>N</th>
                  <th>Images</th>
                  <th>Text</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  cities && cities?.map((item, index) => (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td><img src={`${baseImgUrl}${item?.image_src}`} width={100} height={100} alt="" /></td>
                      <td>
                        <div>{item?.text}</div>
                        <div className='mt-3'>
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
                      <td>{item?.name}</td>
                      <td>
                        <button className="btn btn-outline-primary mx-2">
                          Edit <EditFilled />
                        </button>
                        <button className="btn btn-danger">
                          Delete <DeleteFilled />
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default City
