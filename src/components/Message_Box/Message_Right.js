import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import "./Message_right.css";

function Message_Right(props) {
  const dispatch = useDispatch();
  const { changeMessageOptionsState } = bindActionCreators(actionCreators, dispatch);
  
  return (
    <div className="outer_box">
    <div className="container_right">
      <div className="message_box">
        <p className="message">{props.message.message}</p>

        <p className="message_time">{props.time}</p>
        <span className="fa-solid fa-caret-down dropdown_menu_button fa-lg" onClick={()=>{changeMessageOptionsState({bool:true,id:props?.message?._id,type:"right"})}}></span>
      </div>
      <div className="arrow">
        <div className="outer"></div>
        <div className="inner"></div>
      </div>
    </div>
      
    
    </div>
  );
}
 
export default Message_Right;
