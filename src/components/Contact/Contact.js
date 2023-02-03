import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import "./Contact.css";
import {actionCreators} from "../../state/index"

function Contact(props) {
  const dispatch = useDispatch()
  const {changeCurrentFriend} = bindActionCreators(actionCreators,dispatch)

  const handleClick = () => {
    //localStorage.setItem("reciever",props.reciever_id)
    changeCurrentFriend({name:props?.name,profile:props?.profile,id:props?.id})   // changes the mainchat to what you click
  }

  return (
    <div className="main_contact_box" onClick={handleClick}>
      <img src={props?.profile} alt="..." className="contact_image" />
      <div className="contact_section">
        <div className="contact_details">
          <p className="contact_name">{props.name}</p>
          <p className="last_message">{props.message}</p>
        </div>
        <div className="contact_lasttime">{props.time}</div>
      </div>
    </div>
  );
}

export default Contact;
