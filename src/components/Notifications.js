import { io } from "socket.io-client";
import { useRef,useEffect,useState } from "react";
import Navbar from './Navbar'
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
export const Notifications=()=>{
    const[notifications,setNotifications]=useState()
    useEffect(async()=>{
        console.log('noifications')
const data=await axios.get("http://127.0.0.1:3001/auth/getnotifications")
console.log(data)
setNotifications(data?.data)
    },[])
  
    return(
        <>
          <div className="container">
{notifications?.length>0?<><h1>u have notifications</h1></>:<h5>no notifications</h5>}
</div>
</>
    )
}
export default Notifications