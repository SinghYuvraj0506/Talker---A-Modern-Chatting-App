import React, { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrAdd, GrEmoji, GrSend } from "react-icons/gr";
import { IoMdAdd, IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import MessageContext from "../../../context/messages/messageContext";
import Loading1 from "../../Modals/Loading1";
import MessageLeft from "../MessageBoxes/MessageLeft";
import MessageRight from "../MessageBoxes/MessageRight";
import Moment from "moment";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";
import Picker from "emoji-picker-react";
import { io } from "socket.io-client";
import Cookies from "universal-cookie";
import { friendcontext } from "../../../context/Auth/FriendState";

function Chat_02() {
  const scrollref = useRef();
  const mainChat = new useSelector((state) => state.mainChat); // using redux store to get the access of the main chat details
  const messageOptionsState = useSelector((state) => state.messageOptionsState); /// gets the value of message options
  const dispatch = useDispatch();
  const { changeLoadingState,onlineFriends } = bindActionCreators(actionCreators, dispatch);

  // context api
  const { getmessages, addmessage } = useContext(MessageContext);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [openEmoji, setOpenEmoji] = useState(false);

  const cookies = new Cookies();
  const socket = useRef();
  const [arrivalMessage, setarrivalMessage] = useState();
  const { getAllFriends, FriendsData } = useContext(friendcontext);

  // Use effect for setting the connection of socket ----------------------------
  useEffect(() => {
    socket.current = io("http://localhost:8900"); // sets the socket connection from the client side
    socket.current.on("getMessage", (data) => {
      setarrivalMessage({
        sender_id: data?.senderId,
        reciever_id: data?.recieverId,
        message: data?.text,
        created: Date.now()
      });
    });
    getAllFriends()
  }, []);

  // useeffect for sending the message for live person -------------------------------------------------
  useEffect(() => {
    arrivalMessage && getmessages(mainChat?.id).then((e) => {
      setMessages(e)})
  }, [arrivalMessage?.created]);

  // useeffect to add a user on logging in-----------------------------------------------------
  useEffect(() => {
    cookies.get("auth-token") &&
      socket.current.emit("addUser", cookies.get("auth-token")); // send auth token of the user in the backend so that it gets stored there for current online users
    socket.current.on("getUsers", (users) => {
      // here user?.onlyusers is the list of active users by socket io
      //console.log(users?.onlyUsers)

      // now we compare the people who are in frined list and are online this time
      onlineFriends(FriendsData.filter((e)=>users?.onlyUsers?.includes(e?.friend_id?._id)))

    });
  }, [cookies.get("auth-token")]);

  // searching basic messages on page reload --------------------------------
  useEffect(() => {
    mainChat?.id && changeLoadingState(true);
    mainChat?.id &&
      getmessages(mainChat?.id).then((e) => {
        setMessages(e);
        changeLoadingState(false);
      });
    // eslint-disable-next-line
  }, [mainChat?.id, messageOptionsState]);

  // handleling the scrolling down feature --------------------------------------
  useEffect(() => {
    scrollref.current?.scroll({
      top: scrollref.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.length >= 1) {
      changeLoadingState(true);
      await addmessage(mainChat?.id, message);
      getmessages(mainChat?.id).then((e) => {
        setMessages(e);
        socket.current.emit("sendMessage", {
          // send message via socket for online connections
          sendertoken: cookies.get("auth-token"),
          recieverId: mainChat?.id,
          text: message,
        });
      });

      setMessage("");
      changeLoadingState(false);
    }
  };

  const handleEmojiClick = (e) => {
    e.stopPropagation();
    openEmoji ? setOpenEmoji(false) : setOpenEmoji(true);
  };

  const onEmojiClick = (event, emojiObject) => {
    event.stopPropagation();
    let doc = document.querySelector("#typer");
    setMessage(doc.value + emojiObject.emoji);
  };

  //openEmoji &&
  //  document.addEventListener("click", () => {
  //    setOpenEmoji(false);
  //  });

  //mainChat?.id && getmessages(mainChat?.id);

  return (
    <>
      <div className="chat_02_section_main_container">
        <div className="chat02_about_section">
          <div>
            <img src={mainChat?.profile} alt="user" className="about_img" />
            <section>
              <span className="text_type_03">{mainChat?.name}</span>
              <p className="text_type_04">last online 5 hours ago</p>
            </section>
          </div>
          <section>
            <button>
              <BsThreeDotsVertical size={18} />
            </button>
          </section>
        </div>

        <div
          className="chat02_messaging_section"
          id="messaging_section"
          ref={scrollref}
        >
          {messages?.length !== 0 &&
            messages?.map((message, i) => {
              let time = Moment(message?.created)
                .format()
                .split("T")[1]
                .split(":"); // converts timezone using momment and then printing according to india
              if (message?.reciever_id.toString() === mainChat?.id) {
                return (
                  <MessageRight
                    key={i}
                    message={message}
                    time={time[0] + ":" + time[1]}
                  />
                );
              } else if (message?.sender_id.toString() === mainChat?.id) {
                return (
                  <MessageLeft
                    key={i}
                    message={message}
                    time={time[0] + ":" + time[1]}
                  />
                );
              } else {
                return "";
              }
            })}
        </div>

        {openEmoji && (
          <aside className="Emoji_box">
            <Picker
              onClick={(e) => {
                e?.stopPropagation();
              }}
              onEmojiClick={onEmojiClick}
              disableSkinTonePicker={true}
            />
          </aside>
        )}

        <div className="input_fields_section">
          <span className="input_features">
            <IoMdAdd size={20} />
          </span>
          <input
            id="typer"
            type="text"
            placeholder="Type a message here"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <GrEmoji
            size={22}
            className="emoji_icon"
            onClick={handleEmojiClick}
          />
          <span
            id="send_button"
            className="input_features"
            onClick={handleSendMessage}
          >
            <IoIosSend size={20} />
          </span>
        </div>
      </div>
    </>
  );
}

export default Chat_02;
