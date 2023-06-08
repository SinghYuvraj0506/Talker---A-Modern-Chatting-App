import React, { createContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { host } from "../../config/config";
import Cookies from "universal-cookie";

export const usercontext = createContext();

const UserState = (props) => {
  const cookies = new Cookies();
  const [userData, setuserData] = useState()

  const [SearchUsers, setSearchUsers] = useState([])
  const [AllFriendsId, setAllFriendsId] = useState([])

  //Route - 1------ to create a new user
  const createUser = async (name, age, password, email) => {
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          name: name,
          age: age,
          email: email,
          password: password,
        }),
      });
      const json = await response.json();
      if (json.success) {
        cookies.set("auth-token", json.authtoken, {
          expires: new Date(Date.now() + 432000000),   // 5 days expiry
        });
      }
      return json;
    } catch (error) {
      console.error("Error occured");
    }
  };

  //Route - 2------ to create a new user
  const loginUser = async (password, email) => {
    try {
      const response = await fetch(`${host}/api/auth/loginuser`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const json = await response.json();
      if (json.success) {
        cookies.set("auth-token", json.authtoken, {
          expires: new Date(Date.now() + 432000000),   // 5 days expiry
        });
      }
      return json;
    } catch (error) {
      console.error("Error occured");
    }
  };


  //Route - 3------ get all the user detaisl after login
  const getUser = async () => {
    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "auth-token":cookies.get("auth-token")
        }
      });
      const json = await response.json();
      if (json.success) {
        setuserData(json.user)
      }
      return json;
    } catch (error) {
      console.error("Error occured");
    }
  };

  //Route - 4 ------ get all the fetures to show in the profile of the user
  const getFeaturesOfProfile = async () => {
    try {
      const response = await fetch(`${host}/api/auth/getdetailsforprofile`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "auth-token":cookies.get("auth-token")
        }
      });
      const json = await response.json();
      return json
    } catch (error) {
      console.error("Error occured");
    }
  };

  //Route - 5 ------ get all the fetures to show in the profile of the user
  const searchUserProfile = async (query) => {
    try {
      const response = await fetch(`${host}/api/auth/searchForFriends?param=${query}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "auth-token":cookies.get("auth-token")
        }
      });
      const json = await response.json();
      if(json.success){
        setSearchUsers(json.users)
        setAllFriendsId(json.friends)
      }
      return json
    } catch (error) {
      console.error("Error occured");
    }
  };




  return (
    <usercontext.Provider value={{ createUser,loginUser,getUser,getFeaturesOfProfile,userData,searchUserProfile,SearchUsers,AllFriendsId }}>
      {props.children}
    </usercontext.Provider>
  );
};

export default UserState;
