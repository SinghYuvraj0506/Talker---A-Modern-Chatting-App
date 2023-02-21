import React, { useContext, useEffect, useState } from "react";
import "./Favorites.css";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { friendcontext } from "../../../context/Auth/FriendState";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const navigate = useNavigate();
  const { getAllFriends, FriendsData, changeFavoriteState } =
    useContext(friendcontext);
  const OnlineFriends = useSelector((state) => state.OnlineFriends);
  const [online, setonline] = useState([]);
  const [changeFavorite, setchangeFavorite] = useState(false);
  const dispatch = useDispatch();
  const { changeCurrentFriend, addFrinedsPopup } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    getAllFriends().then(() => {});
  }, [changeFavorite]);

  const handleChangeFavorite = (id) => {
    changeFavoriteState(id).then((e) => {
      changeFavorite ? setchangeFavorite(false) : setchangeFavorite(true);
    });
  };

  // fetches online friends ids from redux and then stores it here-----------
  useEffect(() => {
    setonline([]);
    OnlineFriends?.forEach((element) => {
      setonline((prev) => [...prev, element?.friend_id?._id]);
    });
  }, [OnlineFriends]);

  // calculates the last online time for the user
  const lastVisitTime = (date) => {
    let a = new Date(date);
    let b = new Date();
    let dateinMS = Math.abs(b - a); // difference in MS
    if (dateinMS > 2592000000) {
      // 2592000000 it is ms in a month
      let months = Math.ceil(dateinMS / (1000 * 60 * 60 * 24 * 30)).toFixed(0);
      return months.toString() + " months";
    } else if (dateinMS > 86400000) {
      let days = Math.ceil(dateinMS / (1000 * 60 * 60 * 24)).toFixed(0);
      return days.toString() + " days";
    } else if (dateinMS > 3600000) {
      let hours = Math.ceil(dateinMS / (1000 * 60 * 60)).toFixed(0);
      return hours.toString() + " hours";
    } else if (dateinMS > 60000) {
      let minutes = Math.ceil(dateinMS / (1000 * 60)).toFixed(0);
      return minutes.toString() + " minutes";
    } else {
      return (dateinMS / 1000).toFixed(0).toString() + " seconds";
    }
  };

  return (
    <div className="main_friends_container">
      <div className="friends_01_section_main_container">
        <section className="header_chat_01">
          <div>
            <h1 className="text_type_01">Favorite Friends</h1>
            <span className="text_type_02">
              All Favorites{" "}
              {/* <BsChevronDown style={{ marginLeft: "5px", cursor: "pointer" }} /> */}
            </span>
          </div>
          <button
            onClick={() => {
              addFrinedsPopup(true);
            }}
          >
            <IoIosAdd size={30} />
            Add New Friend
          </button>
        </section>
        <section className="search_chat_01">
          <AiOutlineSearch size={25} />
          <input type="text" placeholder="Search" style={{ width: "76%" }} />
          <span className="text_type_02">
            Total favorites -{" "}
            {
              FriendsData?.filter((e) => {
                return e?.isFavorite;
              })?.length
            }
          </span>
        </section>
        <section className="chats_section">
          {FriendsData?.filter((e) => {
            return e?.isFavorite;
          })?.length !== 0 ? (
            FriendsData?.filter((e) => {
              return e?.isFavorite;
            })?.map((e, i) => {
              return (
                <div
                  className="chats_section_box"
                  key={i}
                  style={{ paddingBottom: "20px" }}
                  onClick={() => {
                    changeCurrentFriend({
                      name: e?.friend_id.name,
                      profile: e?.friend_id.profile,
                      id: e?.friend_id._id,
                      lastVisit: lastVisitTime(e?.friend_id?.LastVisited),
                      isOnline:online?.includes(e?.friend_id?._id)
                    });
                    navigate("/chats");
                  }}
                >
                  <section className="about_chat_section">
                    <div>
                      <img
                        src={e?.friend_id.profile}
                        alt="user"
                        className="about_img"
                      />
                      <section>
                        <span className="text_type_03">
                          {e?.friend_id.name}
                        </span>
                        <p className="text_type_04">Lorem ipsum dolor sit.</p>
                      </section>
                    </div>
                    <span className={online?.includes(e?.friend_id?._id) ? "text_type_02 text_type_05" : "text_type_02"}>{online?.includes(e?.friend_id?._id) ?"Online..." : `last online ${lastVisitTime(e?.friend_id?.LastVisited)} ago`}</span>
                    <span
                      className="text_type_02"
                      onClick={(e1) => {
                        e1?.stopPropagation();
                        handleChangeFavorite(e?.friend_id._id);
                      }}
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
            })
          ) : (
            <p className="extra_gyan_part_01">
              You have no favorites on the Platform
              <br /> Do checkout and add some of them to your favoritelist
              <br />
              <br /> <span style={{ fontSize: "30px" }}>👍</span> Good luck by
              Yuvraj Singh
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Favorites;
