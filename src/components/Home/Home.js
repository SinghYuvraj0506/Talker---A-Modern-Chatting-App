import React,{useState,useEffect} from 'react'
import Cookies from 'universal-cookie';
import Left from '../Left_Home_Side/Left.js'
import Right from '../Right_Home_Side/Right.js'
import "./Home.css"
import { useNavigate } from 'react-router-dom';
import Loading1 from '../Modals/Loading1.js';
import Options from '../Modals/MesaageOptions/Options.js';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/index.js';

function Home () {
  // redux statemnets to change the values
  const messageOptionsState = new useSelector(state=>state.messageOptionsState)   /// gets the value of message options
  const dispatch= useDispatch()
  const {changeMessageOptionsState} = bindActionCreators(actionCreators,dispatch)

  const cookies = new Cookies();
  const navigate = useNavigate()

  useEffect(() => {
    if(!cookies.get("auth-token")){
      navigate("/login")
    }
  
  }, [])
  

  if(!cookies.get("auth-token")){
    return <Loading1/>
  }

  return (
    <div className="home_section">
      <Options open={messageOptionsState?.bool} toClose={()=>{changeMessageOptionsState({bool:false,id:""})}} type={messageOptionsState?.type}/>
      <Left />
      <Right/>
    </div>
  )
}

export default Home