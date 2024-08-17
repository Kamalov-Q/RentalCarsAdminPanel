/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const baseUrl = `https://autoapi.dezinfeksiyatashkent.uz/api/`;
  const navigate = useNavigate();
  const [phone_number, setPhone_number] = useState();
  const [password, setPassword] = useState();

  const login = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}auth/signin`, {
      method: "POST", 
      body: JSON.stringify({
        phone_number: phone_number,
        password: password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(resp=>resp.json())
    .then(data => {
      if(data?.success) {
        console.log(data?.data?.tokens?.accessToken?.token);
        localStorage.setItem("access_token", data?.data?.tokens?.accessToken?.token);
        alert(data?.message);
        navigate("/home");
      }
    })
    .catch(err => {
      alert("Error : ", err)
      console.error("Error : ", err);
      navigate("/")
    })
  }

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if(token) {
      navigate("/home");
    }
  },[])


  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
        <div className="row p-5 m-5">
          <div className="col-lg-12">
            <form className="form" style={{border: "2px solid black", padding:"100px", boxShadow: "2px 2px 2px grey"}}>
             <div className="inputs" style={{padding:"10px"}}>
             <label htmlFor="phone_number" style={{paddingBottom:"5px"}}>Phone Number</label>
              <input
                type="tel"
                className="form-control"
                placeholder="+998 --- -- --"
                id="phone_number"
                onChange={(e) => setPhone_number(e?.target?.value)}
              />
             </div>
              <div className="inputs" style={{padding:"10px"}}>
              <label htmlFor="password" style={{paddingBottom:"5px"}}>Password</label>
              <input type="password" id="password" className="form-control" placeholder="********" 
              onChange={(e) => setPassword(e?.target?.value)}
              />
              </div>
             <div style={{padding:"10px"}}>
             <button className="btn btn-primary p-2" onClick={(e) => login(e)}>Send</button>
             </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
