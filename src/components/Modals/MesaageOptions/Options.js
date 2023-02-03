import React from "react";
import "./Options.css";
import { ImForward } from "react-icons/im";
import { AiFillEdit, AiFillCopy, AiFillDelete } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useState } from "react";
import MessageContext from "../../../context/messages/messageContext";
import { toast, ToastContainer } from "react-toastify";
import { actionCreators } from "../../../state/index";
import { bindActionCreators } from "redux";

function Options({ open, toClose }) {
  const messageOptionsState = new useSelector(
    (state) => state.messageOptionsState
  ); // used to gegt the message options data
  
  const dispatch = useDispatch();
  const { changeProfileState,changeMessageOptionsState } = bindActionCreators(actionCreators, dispatch);

  const { deletemessage, editmessage, getmessagedetail } =
    useContext(MessageContext);
  const [message, setMessage] = useState({ message: "" });
  const [openEdit, setOpenEdit] = useState(false);

  // messageoptions functions

  const handleDelete = () => {
    deletemessage(messageOptionsState?.id);
    toast.success("Message deleted successfully", {
      autoClose: 2000,
    });
    toClose();
  };

  const handleUpdate = async () => {
    setOpenEdit(true);
    let text = await getmessagedetail(messageOptionsState?.id);
    setMessage({ message: text });
  };

  const handlefinaledit = () => {
    editmessage(messageOptionsState?.id, message.message);
    setOpenEdit(false);
    toClose();
    toast.success("Message edited successfully", {
      autoClose: 1500,
    });
  };

  const handleCopy = async () => {
    const copied_text = await getmessagedetail(messageOptionsState?.id);
    navigator.clipboard.writeText(`${copied_text}`);
    toast.info("Message copied to clipboard", {
      autoClose: 1500,
    });
    toClose();
  };

  const handleChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpenEdit(false);
    toClose();
  };

  if (!open) {
    return null;
  }

  return (
    <>
      <div onClick={handleClose} className="profile_showing_modal">

        {/* profile arrow options */}
        {messageOptionsState?.type === "profile" ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="options_main_box"
          >
            <span
              className="options_box"
              style={{ backgroundColor: "#0ab615" }}
              onClick={handleUpdate}
            >
              <AiFillEdit size={30} style={{ marginBottom: "10px" }} />
              Edit Info
            </span>
            <span
              className="options_box"
              style={{ backgroundColor: "#181b19" }}
              onClick={()=>{
                changeMessageOptionsState({bool:false})
                changeProfileState({bool:true,user:messageOptionsState?.user})}}
            >
              <CgProfile size={30} style={{ marginBottom: "10px" }} />
              View Profile
            </span>
          </div>
        ) : (
          <>
            {!openEdit ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="options_main_box"
              >
                <span
                  className="options_box"
                  style={{ backgroundColor: "#181b19" }}
                >
                  <ImForward size={30} style={{ marginBottom: "10px" }} />
                  Forward
                </span>

                {messageOptionsState?.type === "right" && (
                  <span
                    className="options_box"
                    style={{ backgroundColor: "#0ab615" }}
                    onClick={handleUpdate}
                  >
                    <AiFillEdit size={30} style={{ marginBottom: "10px" }} />
                    Edit
                  </span>
                )}

                <span
                  className="options_box"
                  style={{ backgroundColor: "#0ab615" }}
                  onClick={handleCopy}
                >
                  <AiFillCopy size={30} style={{ marginBottom: "10px" }} />
                  Copy
                </span>

                {messageOptionsState?.type === "right" && (
                  <span
                    className="options_box"
                    style={{ backgroundColor: "#181b19" }}
                    onClick={handleDelete}
                  >
                    <AiFillDelete size={30} style={{ marginBottom: "10px" }} />
                    Delete
                  </span>
                )}
              </div>
            ) : (
              <div
                className="update_section"
                onClick={(e) => e.stopPropagation()}
              >
                <textarea
                  name="message"
                  id="message"
                  value={message.message}
                  onChange={handleChange}
                ></textarea>
                <button onClick={handlefinaledit}>Update</button>
              </div>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default Options;
