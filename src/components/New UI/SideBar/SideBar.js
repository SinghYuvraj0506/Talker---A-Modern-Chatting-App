import React,{useState,useEffect,useContext} from 'react'
import "./SideBar.css"
import {AiOutlinePoweroff} from "react-icons/ai"
import {BsFillChatSquareTextFill} from "react-icons/bs"
import {GoChevronDown} from "react-icons/go"
import {MdFavorite} from "react-icons/md"
import {IoMdContacts} from "react-icons/io"
import { Link, useNavigate } from 'react-router-dom'
import Cookies from "universal-cookie";
import { usercontext } from '../../../context/Auth/UserState'
import {FiEdit} from "react-icons/fi"
import {CgProfile} from "react-icons/cg"
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../state/index'

function SideBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { changeMessageOptionsState } = bindActionCreators(actionCreators, dispatch);

  const [option, setOption] = useState("")
  const cookies = new Cookies();
  const {getUser,userData} = useContext(usercontext)


  //logout function
  const handleLogout = () =>{
    cookies.remove("auth-token")
    navigate("/login")
  }

  // created to change the options theme----------------------------------------
  useEffect(() => {
    setOption(window.location.pathname)
  }, [window.location.pathname])
  


  useEffect(() => {
    getUser().then(()=>{})
    //getAllFriends().then(()=>{})
  }, [])

  return (
    <div className="sidebar_conatiner">
      <section className="sidebar_profile_section">
        <img src={userData?.profile} alt="user" />
        <span>{userData?.name} <GoChevronDown size={17} style={{marginLeft:"6px",cursor:"pointer"}} onClick={()=>{changeMessageOptionsState({bool:true,type:"profile",user:userData})}}/></span>  
      </section>
      <section className="sidebar_options">
        <Link to="/chats"><span className={(option === "/chats" || window.location.pathname === "/chats") ? "options_active" : "options_span" } onClick={()=>setOption("/chats")}><BsFillChatSquareTextFill size={25} className='icons_sidebar'/>Chat</span></Link>
        <Link to="/friends"><span className={option === "/friends" || window.location.pathname === "/friends" ? "options_active" : "options_span" } onClick={()=>setOption("/friends")}><IoMdContacts size={25} className='icons_sidebar'/>Friends</span></Link>
        <Link to="/favorites"><span className={option === "/favorites" || window.location.pathname === "/favorites" ? "options_active" : "options_span" } onClick={()=>setOption("/favorites")}><MdFavorite size={25} className='icons_sidebar'/>Favorites</span></Link>
      </section>
      <section className="extra_options">
        <span onClick={handleLogout}><AiOutlinePoweroff size={25} className='icons_sidebar'/>Logout</span>
      </section>

    </div>
  )
}

export default SideBar