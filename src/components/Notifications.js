import { io } from "socket.io-client";
import { useRef,useEffect,useState } from "react";
import Navbar from './Navbar'
import {useNavigate} from 'react-router-dom'
import {getnotifications} from '../actions/userActions'
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import Notification from './Notification'
import store from '../store'
import { loadUser } from '../actions/userActions';

export const Notifications=()=>{
    const dispatch=useDispatch()
    const {notifications}= useSelector((state) => state.user);
    const[page,setPage]=useState(1)
    const[notificationsperpage,setNotificationsperpage]=useState()
    useEffect(async()=>{
       
dispatch(getnotifications())
console.log(notifications)
    },[dispatch])
    useEffect(async()=>{
        store.dispatch(loadUser());
            },[dispatch])

            const change=(event,value)=>{
                console.log(event,value)
                setPage(value)}
    return(
        <>
          <div className="container">
              <div className="notifications">
{notifications?.length>0?<>{notifications.map((n)=><>
    <Notification body={n.body} time={n.time} status={n.status}/>
</>)}</>:<h5>no notifications</h5>}
</div>

</div>
</>
    )
}
export default Notifications