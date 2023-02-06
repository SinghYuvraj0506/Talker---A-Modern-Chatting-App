import React, { useContext, useEffect, useState } from "react";
import "./Friends.css";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { friendcontext } from "../../../context/Auth/FriendState";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";
import { useNavigate } from "react-router-dom";

function Friends() {
  const navigate = useNavigate()
  const { getAllFriends, FriendsData, changeFavoriteState } =
    useContext(friendcontext);

  const [changeFavorite, setchangeFavorite] = useState(false)
  const dispatch = useDispatch();
  const { changeCurrentFriend,addFrinedsPopup } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    getAllFriends().then(() => {});
  }, [changeFavorite]);

  const handleChangeFavorite = (id) => {
    console.log(id)
    changeFavoriteState(id).then((e)=>{
      changeFavorite ? setchangeFavorite(false) : setchangeFavorite(true)
    })
  };

  return (
    <div className="main_friends_container">
      <div className="friends_01_section_main_container">
        <section className="header_chat_01">
          <div>
            <h1 className="text_type_01">Friends</h1>
            <span className="text_type_02">
              All Friends{" "}
              {/* <BsChevronDown style={{ marginLeft: "5px", cursor: "pointer" }} /> */}
            </span>
          </div>
          <button onClick={()=>{addFrinedsPopup(true)}}>
            <IoIosAdd size={30} />
            Add New Friend
          </button>
        </section>
        <section className="search_chat_01">
          <AiOutlineSearch size={25} />
          <input type="text" placeholder="Search" style={{ width: "76%" }} />
          <span className="text_type_02">
            Total friends - {FriendsData?.length}
          </span>
        </section>
        <section className="chats_section">
          {FriendsData?.map((e, i) => {
            return (
              <div
                className="chats_section_box"
                key={i}
                style={{ paddingBottom: "20px" }}
                onClick={()=>{changeCurrentFriend({name:e?.friend_id.name,profile:e?.friend_id.profile,id:e?.friend_id._id})
              navigate("/chats")}}
              >
                <section className="about_chat_section">
                  <div>
                    <img
                      src={e?.friend_id.profile}
                      alt="user"
                      className="about_img"
                    />
                    <section>
                      <span className="text_type_03">{e?.friend_id.name}</span>
                      <p className="text_type_04">last online 5 hours ago</p>
                    </section>
                  </div>
                  <span className="text_type_02">3 days ago</span>
                  <span
                    className="text_type_02"
                    onClick={(e1)=>{e1?.stopPropagation()
                      handleChangeFavorite(e?.friend_id?._id)}}
                  >
                    {e?.isFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"}{" "}
                    &nbsp;{" "}
                    <MdFavorite
                      size={28}
                      color={e?.isFavorite ? "red" : "#707c97"}
                    />
                  </span>
                </section>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default Friends;
