import React from "react";
import { useContext,useEffect,useState } from "react";
import { usercontext } from "../../context/Auth/UserState";
import Contact from "../Contact/Contact";
import "./Left.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { friendcontext } from "../../context/Auth/FriendState";
import Profile from "../Modals/Profile/Profile";

function Left() {
  const navigate = useNavigate()
  const {getUser,userData} = useContext(usercontext)
  const {getAllFriends,FriendsData} = useContext(friendcontext)
  const [openProfile, setopenProfile] = useState(false)
  const [openNavigation, setopenNavigation] = useState(false)
  const cookies = new Cookies();

  // get user data using use effect
  useEffect(() => {
    getUser().then(()=>{})
    getAllFriends().then(()=>{})
  }, [])
  

  const handlelog = () =>{
    openNavigation ? setopenNavigation(false) : setopenNavigation(true)
  }


  //logout function
  const handleLogout = () =>{
    cookies.remove("auth-token")
    navigate("/login")
  }


  const handleProfile = () =>{
    setopenProfile(true)
    setopenNavigation(false)
  }
 
  return (
    <>
    <Profile open={openProfile} toClose={()=>{setopenProfile(false)}} user={userData}/>
    <div className="left_section">
      <div className="left_side_header">
        <a href="/"><img src="https://dashboard.mychatglobal.com/site/images/logo/1.png" alt="mychat" className="left_side_logo" /></a>
        <div className="logging_area">
          <p className="logging_name">{userData?.name}</p>
          <img src={userData?.profile} alt="..." className="logging_image" onClick={handlelog} />
        </div>
      </div>

        {openNavigation && <ul className="profile_dropdown">
          <li className="item" onClick={handleProfile}><i class="fa-solid fa-user"></i>Profile</li>
          <li className="item" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i>Logout</li>
        </ul>}
      
      <div className="search_area">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for Mobile Numbers and Email Ids"
        />
        <i class="fa-solid fa-magnifying-glass search_icon"></i>
      </div>
      <div className="contact_box">
        <div class="scrollbar2" id="style-2">
          {FriendsData?.map((e)=>{
            return <Contact name={e?.name} profile={e?.profile} id={e?.id}  message="hii" time="11.25"/>
          })}
          
          
        </div>
      </div>
    </div>
    </>
  );
}

export default Left;
