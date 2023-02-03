import React from "react";
import "./Box.css";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";

function MessageLeft(props) {
  const dispatch = useDispatch();
  const { changeMessageOptionsState } = bindActionCreators(actionCreators, dispatch);


  return (
    <div className="message_outside_left_container">
      <div className="message_left_box">
        <p>{props?.message.message}</p>
        <span className="message_time">{props?.time}</span>
      </div>
      <BsThreeDots size={20} onClick={()=>{changeMessageOptionsState({bool:true,id:props?.message?._id,type:"left"})}}/>
    </div>
  );
}

export default MessageLeft;
