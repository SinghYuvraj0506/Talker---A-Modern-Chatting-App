import React,{useEffect, useState,useRef} from "react";
import SideBar from "../SideBar/SideBar";
import "./Main.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Chat from "../Chat/Chat";
import Friends from "../Friends/Friends";
import Favorites from "../Favorites/Favorites";
import Cookies from 'universal-cookie';
import Loading1 from "../../Modals/Loading1";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";
import Options from "../../Modals/MesaageOptions/Options";
import Profile from "../../Modals/Profile/Profile";
import {io} from "socket.io-client"
import People from "../../Modals/All people/People";


function Main() {
  const cookies = new Cookies();
  const navigate = useNavigate()



  //Redux -----------------------------------------
  const messageOptionsState = new useSelector(state=>state.messageOptionsState)   /// gets the value of message options
  const LoadingState = useSelector(state=>state.LoadingState)   /// gets the value of loading
  const ProfileState = useSelector(state=>state.ProfileState)   /// gets the value of profile data
  const addFriendsPopupState = useSelector(state=>state.addFriendsPopupState)   /// opens the add friends popup
  
  const dispatch= useDispatch()
  const {changeMessageOptionsState,changeProfileState,addFrinedsPopup} = bindActionCreators(actionCreators,dispatch)

  useEffect(() => {
    if(!cookies.get("auth-token")){
      navigate("/login")
    }
  
  }, [])

  if(!cookies.get("auth-token")){
    return <Loading1/>
  }


  return (
    <>
    {LoadingState && <Loading1/>}
    <div className="main_box">
      <People open={addFriendsPopupState} toClose={()=>{addFrinedsPopup(false)}}/>
    <Profile open={ProfileState?.bool} toClose={()=>{changeProfileState({bool:false})}} user={ProfileState?.user}/>
      <Options open={messageOptionsState?.bool} toClose={()=>{changeMessageOptionsState({bool:false,id:""})}} type={messageOptionsState?.type}/>
      <SideBar />
      <div className="right_side_main">
        <Routes>
          <Route path="/chats" element={<Chat />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/favorites" element={<Favorites/>} />
        </Routes>
      </div>
    </div>
    </>
  );
}

export default Main;
