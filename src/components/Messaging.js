import { io } from "socket.io-client";
import { useRef,useEffect } from "react";
import Navbar from './Navbar'
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useState} from 'react'


export const Messaging=()=>{
    const navigate=useNavigate()
    const {user}= useSelector((state) => state.user);
    const socket=useRef()
    const [users,setUsers]=useState()
    const [onlinefriends,setOnlinefriends]=useState()
    const[onlineusers,setOnlineusers]=useState()
    useEffect(async() => {
        const data=await axios.get('http://127.0.0.1:3001/auth/getusers')
        console.log(data.data.users)
        setUsers(data.data.users)

        socket.current = io("ws://localhost:8000");
        {user&&socket.current.emit('addUser',user?._id)}
        socket.current.on("getUsers", (data) => {
           console.log(data)
           setOnlineusers(data)
            console.log('ok')			
           });
        socket.current.on("getMessage", (data) => {
           
         console.log('ok')			
        });
      }, []);
      useEffect(()=>{
const a=users&&users?.filter((u)=> onlineusers?.map((o)=>(o.userId===u._id)))
console.log(a)
setOnlinefriends(a)
      },[])
      const logout=(e)=>{
        localStorage.removeItem('server_token')
        navigate('/')
    }
    return(
        <>
      <div className="container">
<div className="chatcontainer">
    <div className="messages">
        <div className="top">
<h5 style={{padding:'100px'}}>Messaging</h5>
</div>
<div className="messagercontainer">
<h1>hi</h1>
</div>
    </div>
    <div className='chatbox'>
        {false?<><div className="top">
<h5>conversations box</h5>
</div>
<div className="boxtop">
<input placeholder="Write a message..." className="messagebox"/>
<input type='button' value='send' className='messagebutton'/>
</div>
    </>:'no convo'}</div>
    <div className='online'>
        <div className="top">
<h5 >Online</h5>
</div>
<div className="onlineuser">
<h5>rajesh</h5>
</div>
    </div>

</div>

</div>
</>
    )
}
export default Messaging