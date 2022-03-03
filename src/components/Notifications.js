import { io } from "socket.io-client";
import { useRef,useEffect,useState } from "react";
import Navbar from './Navbar'
import {useNavigate} from 'react-router-dom'
import {getnotifications} from '../actions/userActions'
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";

export const Notifications=()=>{
    const dispatch=useDispatch()
    const {notifications}= useSelector((state) => state.user);
    useEffect(async()=>{
        console.log('noifications')
dispatch(getnotifications())
    },[])
  
    return(
        <>
          <div className="container">
              <div className="notifications">
{notifications?.length>0?<>{notifications.map((n)=><div className="notification">{n.body}</div>)}</>:<h5>no notifications</h5>}
</div>
</div>
</>
    )
}
export default Notifications