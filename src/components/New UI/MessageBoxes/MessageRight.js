import React from "react";
import "./Box.css";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";

function MessageRight(props) {
  const dispatch = useDispatch();
  const { changeMessageOptionsState } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className="message_outside_right_container">
      <BsThreeDots size={20} onClick={()=>{changeMessageOptionsState({bool:true,id:props?.message?._id,type:"right"})}}/>
      <div className="message_right_box">
        <p>{props?.message.message}</p>
        <span className="message_time">{props?.time}</span>
      </div>
    </div>
  );
}

export default MessageRight;
