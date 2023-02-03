import { useState } from "react";
import Cookies from "universal-cookie";
import MessageContext from "./messageContext";


const MessageState = (props) => {
  const cookies = new Cookies();
  const host = "http://localhost:8000";
  const messageInitial = []; // this state is being passed as value to the notestate


  // 1. Getting all the mmessages for the respective data from /fetchallmessages endpoint
  const getmessages = async (reciever_id) => {
    const response = await fetch(`${host}/api/chat/fetchallmessages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": cookies.get("auth-token"),
      },
      body: JSON.stringify({reciever_id:reciever_id})
    });
    const json = await response.json();
    return json
  };


  // 2. Sending the mmessages for the respective data from /addmessage endpoint
  const addmessage = async (reciever_id,message) => {
    const response = await fetch(`${host}/api/chat/addmessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": cookies.get("auth-token"),
      },
      body: JSON.stringify({reciever_id:reciever_id,message:message})
    });
    const json = await response.json();

  };

  // 3. Deleting the messages for the respective data from /deletemessage endpoint
  const deletemessage = async (message_id) => {
    const response = await fetch(`${host}/api/chat/deletemessage/${message_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": cookies.get("auth-token"),
      },
    });
    const json = await response.json();
  };

  // 4. Updating the messages for the respective data from /updatemessage endpoint
  const editmessage = async (message_id,message) => {
    const response = await fetch(`${host}/api/chat/updatemessage/${message_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": cookies.get("auth-token"),
      },
      body: JSON.stringify({message:message})
    });
    const json = await response.json();
  };

  // 5. Getting the message for the respective data from /getmessage endpoint
  const getmessagedetail = async (message_id) => {
    const response = await fetch(`${host}/api/chat/getmessage/${message_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": cookies.get("auth-token"),
      },
    });
    const json = await response.json();
    return json.message;
  };


  return (
    <MessageContext.Provider
      value={{ addmessage, getmessages ,deletemessage,editmessage,getmessagedetail}}
    >
      {" "}
      {/* here we use the context created and the router whch are wrapped inside the notestate can access the state passed here ith the help of use context hook */}
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageState;