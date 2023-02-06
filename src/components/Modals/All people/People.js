import React, { useContext, useEffect, useState } from "react";
import "./People.css";
import { AiOutlineSearch } from "react-icons/ai";
import { RiUserAddLine } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import { usercontext } from "../../../context/Auth/UserState";
import { friendcontext } from "../../../context/Auth/FriendState";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state";

function People({ open, toClose }) {
  const { searchUserProfile, SearchUsers,AllFriendsId } = useContext(usercontext);
  const { addFriendToFavorite} =
    useContext(friendcontext);
  const [searchQuery, setsearchQuery] = useState("");

  const dispatch = useDispatch();
  const { changeCurrentFriend} = bindActionCreators(actionCreators, dispatch);

  // Searches for users everytime the search paramester are changes
  useEffect(() => {
    searchUserProfile(searchQuery).then((e) => {
    });
  }, [searchQuery.length]);

  useEffect(() => {
    setsearchQuery("")
  }, [open])
  

  const handleAddToFriend = (id, name) => {
    addFriendToFavorite(id).then((e) => {
      if (e.success) {
        toast.success(`Added ${name} to your friends list`);
      } else {
        if (e.already) {
          toast.info(`${name} is already in your friends list`);
        } else {
          toast.error("Some error occured");
        }
      }
    });
  };



  if (!open) {
    return null;
  }

  return (
    <div className="outside_people_modal" onClick={toClose}>
      <div
        className="people_main_container"
        onClick={(e) => {
          e?.stopPropagation();
        }}
      >
        <h1 className="text_type_01">Find new friends</h1>
        <span className="text_type_02">
          search for any of friends email id to check if it exists..
        </span>
        <section
          className="search_chat_01"
          style={{
            background: "#8eb5b124",
            marginTop: "10px",
            borderRadius: "8px",
          }}
        >
          <AiOutlineSearch size={25} />
          <input
            type="text"
            placeholder="Search"
            style={{ background: "transparent" }}
            value={searchQuery}
            onChange={(e) => {
              setsearchQuery(e.target.value);
            }}
          />
        </section>

        <section className="friends_list_container">
          {searchQuery.length !== 0 ? (
            SearchUsers?.map((e, i) => {
              return (
                <div className="friend_list_box" key={i} onClick={()=>{toClose()
                  changeCurrentFriend({name:e?.name,profile:e?.profile,id:e?._id})}}>
                  <div>
                    <img src={e?.profile} alt="" />
                    <section>
                      <span className="text_type_03">{e?.name}</span>
                      <p className="text_type_06">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Eaque, delectus
                      </p>
                    </section>
                  </div>
                  <span>
                    {!AllFriendsId.includes(e?._id) ?<RiUserAddLine
                      size={25}
                      onClick={() => handleAddToFriend(e?._id, e?.name)}
                    /> : <TiTick color="green" size={25}/>}
                  </span>
                </div>
              );
            })
          ) : (
            <span className="text_type_07">
              Search for People you know who exists here
            </span>
          )}
        </section>
      </div>
    </div>
  );
}

export default People;
