import React, { createContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { host } from "../../config/config";
import Cookies from "universal-cookie";

export const friendcontext = createContext();

const FriendState = (props) => {
  const cookies = new Cookies();
  const [FriendsData, setFriendsData] = useState([])

  //Route - 1------ to get friend list of a user
  const getAllFriends = async () => {
    try {
      const response = await fetch(`${host}/api/friend/getfriendlist`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "auth-token":cookies.get("auth-token")
        }
      });
      const json = await response.json();
      if (json.success) {
        setFriendsData(json.list)
      }
      return json;
    } catch (error) {
      console.error("Error occured");
    }
  };


  //Route - 2------ to change favorite state with a friend
  const changeFavoriteState = async (id) => {
    try {
      const response = await fetch(`${host}/api/friend/changeFavoriteState/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "auth-token":cookies.get("auth-token")
        }
      });
      const json = await response.json();
      if (json.success) {
        return json;
      }
    } catch (error) {
      console.error("Error occured");
    }
  };


  //Route - 2------ to change favorite state with a friend
  const addFriendToFavorite = async (friend_id) => {
    try {
      const response = await fetch(`${host}/api/friend/addtofriendlist`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "auth-token":cookies.get("auth-token")
        },
        body:JSON.stringify({friend_id})
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error occured");
    }
  };



 

  return (
    <friendcontext.Provider value={{ getAllFriends,FriendsData,changeFavoriteState,addFriendToFavorite }}>
      {props.children}
    </friendcontext.Provider>
  );
};

export default FriendState;
