import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { friendcontext } from "../../../context/Auth/FriendState";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";

function Chat_01() {
  const { getAllFriends, FriendsData } = useContext(friendcontext);
  const OnlineFriends = useSelector(state=>state.OnlineFriends)
  const dispatch = useDispatch();
  const { changeCurrentFriend,addFrinedsPopup } = bindActionCreators(actionCreators, dispatch);
  const [online, setonline] = useState([])

  // get user data using use effect
  useEffect(() => {
    getAllFriends().then(() => {});
  }, []);

  // fetches online friends ids from redux and then stores it here-----------
  useEffect(() => {
    setonline([])
    OnlineFriends?.forEach(element => {
      setonline((prev)=>[...prev,element?.friend_id?._id])
    });

  }, [OnlineFriends])


  return (
    <div className="chat_01_section_main_container">
      <section className="header_chat_01">
        <div>
          <h1 className="text_type_01">Chats</h1>
          <span className="text_type_02">
            Recent Chats{" "}
            <BsChevronDown style={{ marginLeft: "5px", cursor: "pointer" }} />
          </span>
        </div>
        <button onClick={()=>{addFrinedsPopup(true)}}>
          <IoIosAdd size={30} />
          Add Friend
        </button>
      </section>
      <section className="search_chat_01">
        <AiOutlineSearch size={25} />
        <input type="text" placeholder="Search" />
        <span className="text_type_02">
          Messages{" "}
          <BsChevronDown style={{ marginLeft: "5px", cursor: "pointer" }} />
        </span>
      </section>
      <section className="chats_section">
        {FriendsData?.map((e,i) => {
          return (
            <div className="chats_section_box" key={i} onClick={()=>{changeCurrentFriend({name:e?.friend_id.name,profile:e?.friend_id.profile,id:e?.friend_id._id})}}>
              <section className="about_chat_section">
                <div>
                  <img src={e?.friend_id.profile} alt="user" className="about_img" />
                  <section>
                    <span className="text_type_03">{e?.friend_id.name}</span>
                    <p className={online?.includes(e?.friend_id._id) ? "text_type_04 text_type_05" : "text_type_04"}>{online?.includes(e?.friend_id._id) ?"Online..." : "last online 5 hours ago"}</p>
                  </section>
                </div>
                <span className="text_type_02">3 days ago</span>
              </section>
              <section className="message_chat_section">
                <p className="text_type_02">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                  totam eligendi repudiandae neque eum nesciunt cum ut similique
                  minus officiis.
                </p>
                <span>1</span>
              </section>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Chat_01;
