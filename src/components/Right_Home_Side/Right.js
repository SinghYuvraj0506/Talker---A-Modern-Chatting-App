import React, { useState, useEffect, useContext } from "react";
import Message_Left from "../Message_Box/Message_Left";
import Message_Right from "../Message_Box/Message_Right";
import "./Right.css";
import MessageContext from "../../context/messages/messageContext";
import Moment from "moment";
import Picker from "emoji-picker-react";
import Loading1 from "../Modals/Loading1";
import { useSelector } from "react-redux";

function Right() {
  const mainChat = useSelector((state) => state.mainChat); // using redux store to get the access of the main chat details

  const [openLoader, setOpenLoader] = useState(false);

  const [message, setMessage] = useState({
    message: "",
  });

  const doc1 = document.querySelector(".typer");
  if (doc1) {
    doc1.addEventListener("keydown", (e) => {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        document.querySelector(".send_button").click();
      }
    });
  }

  const context = useContext(MessageContext);
  const { messages, getmessages, addmessage } = context;

  useEffect(() => {
    mainChat?.id && setOpenLoader(true);
    mainChat?.id &&  getmessages(mainChat?.id).then(() => {
      setOpenLoader(false);
    });

    // eslint-disable-next-line
  }, [mainChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    addmessage(mainChat?.id, message.message);
    getmessages(mainChat?.id)
    setMessage({ message: "" });
  };
  
  mainChat?.id && getmessages(mainChat?.id)
  
  const handleEmoji = () => {
    let doc = document.querySelector(".Emoji_box");
    let doc2 = document.querySelector(".emoji_button");
    if (doc.style.display === "none") {
      doc.style.display = "inline";
      doc2.style.color = "yellow";
    } else {
      doc.style.display = "none";
      doc2.style.color = "white";
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    let doc = document.querySelector(".typer");
    console.log(emojiObject.emoji);
    setMessage({ ...message, message: doc.value + emojiObject.emoji });
  };

  const OnChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };


  return (
    <>
      {openLoader && <Loading1 />}
      <div className="right_section">
        <div className="right_side_header">
          <div className="right_profile">
            <img
              src={mainChat?.profile}
              alt="..."
              className="right_profile_image"
            />
            <p className="right_name">{mainChat?.name}</p>
          </div>
          <i class="fa-solid fa-bars"></i>
        </div>

        <div class="scrollbar" id="style-2">
          {messages?.length !== 0 &&
            messages?.map((message) => {
              let time = Moment(message?.created)
                .format()
                .split("T")[1]
                .split(":"); // converts timezone using momment and then printing according to india
              if (message?.reciever_id === mainChat?.id) {
                return (
                  <Message_Right
                    key={message?._id}
                    message={message}
                    time={time[0] + ":" + time[1]}
                  />
                );
              } else if (message?.sender_id === mainChat?.id) {
                return (
                  <Message_Left
                    key={message._id}
                    message={message}
                    time={time[0] + ":" + time[1]}
                  />
                );
              }
            })}
        </div>
        <aside className="Emoji_box">
          <Picker onEmojiClick={onEmojiClick} disableSkinTonePicker={true} />
        </aside>
        <div className="right_side_typer">
          <i
            className="fa-solid fa-face-grin emoji_button"
            onClick={handleEmoji}
          ></i>
          <textarea
            className="typer"
            placeholder="Type a message"
            name="message"
            value={message.message}
            onChange={OnChange}
          />
          <button
            disabled={message.message.length < 1 ? true : false}
            className="fa-solid fa-paper-plane send_button fa-lg"
            onClick={handleSendMessage}
          ></button>
          <i className="fa-solid fa-microphone"></i>
        </div>
      </div>
    </>
  );
}

export default Right;
