import React, { useContext, useState,useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { usercontext } from "../../context/Auth/UserState";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";
import Loading1 from "../Modals/Loading1";

function Login() {
  const cookies = new Cookies();

  const navigate = useNavigate();
  const [changeStatus, setChangeStatus] = useState(0);
  const [openLoader, setOpenLoader] = useState(false);
  const [data, setData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  const { createUser, loginUser } = useContext(usercontext);

  useEffect(() => {
    if(cookies.get("auth-token")){
      navigate("/")
    }
  }, [])
  

  const handleCheckClick = () => {
    const doc = document.getElementById(`checkbox`);
    if (doc.checked) {
      // means now it is checked
      setChangeStatus(1);
    } else {
      // means now it is unchecked
      setChangeStatus(0);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    try {
      setOpenLoader(true)
      if (changeStatus === 1) {
        if (
          data.name.length > 3 &&
          data.age.length > 1 &&
          data.email.length > 4 &&
          data.email.includes("@")
        ) {
          if (data.password.length > 8) {
            createUser(data.name, data.age, data.password, data.email).then(
              (e) => {
                if (e.success) {
                  toast.success("Welcome guys");
                } else {
                  if (e.already) {
                    toast.info("A user with same email id already exists");
                  } else {
                    toast.info(
                      "Some error occured please try again after some time"
                    );
                  }
                }
              }
            );
          } else {
            toast.error("Password should have min 8 characters");
          }
        } else {
          toast.error("Fill all the fields properly");
        }
        setOpenLoader(false)
      } else {
        if (
          data.email.length > 4 &&
          data.email.includes("@") &&
          data.password.length !== 0
        ) {
          loginUser(data.password, data.email).then((e) => {
            if (e.success) {
              navigate("/chats")
            } else {
              toast.error("Invalid Credentials");
            }
          });
        } else {
          toast.error("Fill all the fields properly");
        }
        setOpenLoader(false)
      }
    } catch (error) {
      toast.error("Some error occured please try after some time");
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  if(cookies.get("auth-token")){
    return null
  }

  return (
    <>
    {openLoader && <Loading1/>}
    <div className="login_page">
      <div className="login_box">
        <h1>Talker</h1>
        <div className="Checkbox_login">
          <span style={{ color: "red", fontSize: "1.2rem" }}>
            Login /&nbsp;
          </span>
          <span style={{ color: "green", fontSize: "1.2rem" }}>
            SignUp &nbsp;
          </span>
          <span onClick={handleCheckClick}>
            <label className="switch">
              <input type="checkbox" id="checkbox" />
              <span className="slider round"></span>
            </label>
          </span>
        </div>
        <form>
          {changeStatus === 1 && (
            <>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
              <input
                type="number"
                placeholder="Enter Age"
                name="age"
                value={data.age}
                onChange={handleChange}
              />
            </>
          )}
          <input
            type="email"
            placeholder="Enter Email Id"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            value={data.password}
            placeholder="Enter Password"
            onChange={handleChange}
          />
          <button className="login" onClick={handleClick}>
            {changeStatus === 1 ? "SignUp" : "Login"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
    </>
  );
}

export default Login;
