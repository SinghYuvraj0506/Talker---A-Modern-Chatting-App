import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import "./Message_left.css";

function Message_Left(props) {
  const dispatch = useDispatch();
  const { changeMessageOptionsState } = bindActionCreators(actionCreators, dispatch);
  

  return (
    <div className="outer_box_left">
      <div className="container_left">
        <div className="arrow_left">
          <div className="outer"></div>
          <div className="inner"></div>
        </div>
        <div className="message_box_left">
          <p className="message">{props.message.message}</p>
          <p className="message_time">{props.time}</p>
          <span className="fa-solid fa-caret-down dropdown_menu_button fa-lg" onClick={()=>{changeMessageOptionsState({bool:true,id:props?.message?._id,type:"left"})}}></span>
        </div>
      </div>
      <div className="options_menu"></div>
    </div>
  );
}

export default Message_Left;
