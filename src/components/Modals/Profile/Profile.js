import React,{useState,useEffect} from "react";
import "./Profile.css";
import { FaShare } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import Moment from "moment";
import { useContext } from "react";
import { usercontext } from "../../../context/Auth/UserState";

function Profile({open, toClose,user}) {

  const {getFeaturesOfProfile} = useContext(usercontext)
  const [data, setdata] = useState([])


  useEffect(() => {
    getFeaturesOfProfile().then(e=>{
      setdata(e.data)
    })

  }, [])




  if(!open){
    return null;
  }

  const date = Moment(user?.date).format("DD MMM YYYY")     /// date using moment for the profile popup

  return (
    <div onClick={toClose} className="profile_showing_modal">
      <div onClick={(e)=>e.stopPropagation()} className="profile_box">
        <RxCross1 cursor="pointer" size={22} className="cross_icon" onClick={toClose}/>
        {/* <FiEdit className="edit_profile_span" size={22}/> */}
        <section className="user_details">
          <div>
            <img
              src={user?.profile}
              alt=""
            />
          </div>
          <h2 className="user_name_profile_box">{user?.name}</h2>
          <p>{user?.email}</p>
          <span>Since {date}</span>
        </section>
        <section className="user_features">
          <div>
            <span>{data?.friends}</span>
            <p>Friends</p>
          </div>
          <div>
            <span>{data?.messages}</span>
            <p>Messages</p>
          </div>
          <div>
            <span>{data?.favorites}</span>
            <p>made you as thier favorites</p>
          </div>
          <div>
            <FaShare color="yellow" size={34} m />
            <p>Share yor profile</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
