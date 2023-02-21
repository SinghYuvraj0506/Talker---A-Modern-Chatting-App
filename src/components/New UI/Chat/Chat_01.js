import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import { BsChevronDown , BsArrowDownRight,BsArrowUpRight} from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { friendcontext } from "../../../context/Auth/FriendState";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";
import MessageContext from "../../../context/messages/messageContext";

function Chat_01() {
  const { getAllFriends, FriendsData } = useContext(friendcontext);
  const {getRecentMessages,RecentMessages} = useContext(MessageContext)
  const OnlineFriends = useSelector(state=>state.OnlineFriends)
  const dispatch = useDispatch();
  const { changeCurrentFriend,addFrinedsPopup } = bindActionCreators(actionCreators, dispatch);
  const [online, setonline] = useState([])

  // get user data using use effect
  useEffect(() => {
    getAllFriends().then(() => {});
    getRecentMessages().then(()=>{})
  }, []);

  // fetches online friends ids from redux and then stores it here-----------
  useEffect(() => {
    setonline([])
    OnlineFriends?.forEach(element => {
      setonline((prev)=>[...prev,element?.friend_id?._id])
    });

  }, [OnlineFriends])

  // calculates the last online time for the user
  const lastVisitTime = (date) =>{
    let a = new Date(date)
    let b = new Date()
    let dateinMS = Math.abs(b-a)    // difference in MS
    if(dateinMS > 2592000000){      // 2592000000 it is ms in a month
      let months = Math.ceil(dateinMS/(1000*60*60*24*30)).toFixed(0)
      return months.toString() + " months"
    }
    else if(dateinMS > 86400000){
      let days = Math.ceil(dateinMS/(1000*60*60*24)).toFixed(0)
      return days.toString() + " days"
    }
    else if(dateinMS > 3600000){
      let hours = Math.ceil(dateinMS/(1000*60*60)).toFixed(0)
      return hours.toString() + " hours"
    }
    else if(dateinMS > 60000){
      let minutes = Math.ceil(dateinMS/(1000*60)).toFixed(0)
      return minutes.toString() + " minutes"
    }
    else{
      return (dateinMS/1000).toFixed(0).toString() + " seconds"
    }
  }


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
        {RecentMessages?.length !== 0 ?

        RecentMessages?.map((e,i) => {
          return (
            <div className="chats_section_box" key={i} onClick={()=>{changeCurrentFriend({name:e?.user.name,profile:e?.user.profile,id:e?.user._id,lastVisit:lastVisitTime(e?.user?.LastVisited),isOnline:online?.includes(e?.user?._id)})}}>
              <section className="about_chat_section">
                <div>
                  <img src={e?.user?.profile} alt="user" className="about_img" />
                  <section>
                    <span className="text_type_03">{e?.user.name}</span>
                    <p className={online?.includes(e?.user._id) ? "text_type_04 text_type_05" : "text_type_04"}>{online?.includes(e?.user._id) ?"Online..." : `last online ${lastVisitTime(e?.user?.LastVisited)} ago`}</p>
                  </section>
                </div>
                <span className="text_type_02">{lastVisitTime(e?.msg?.created)+ " ago"}</span>
              </section>
              <section className="message_chat_section">
                <p className="text_type_02">
                  {e?.type === "recieved" ? <BsArrowDownRight color="red" size={12}/> : <BsArrowUpRight color="green" size={12}/>} &nbsp; {e?.msg?.message.slice(0,35)}...
                </p>
                <span>1</span>
              </section>
            </div>
          );
        })
        
        : <p className="extra_gyan_part_01">You do not any recent chats<br/> Do checkout any one.<br/><br/> <span style={{fontSize:"30px"}}>👍</span> Good luck by Yuvraj Singh
        </p>
      }
      </section>
    </div>
  );
}

export default Chat_01;
