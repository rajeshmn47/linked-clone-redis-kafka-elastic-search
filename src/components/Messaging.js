import { io } from "socket.io-client";
import { useRef,useEffect } from "react";
import Navbar from './Navbar'
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useState} from 'react'
import Conversation from './Conversation'
import Message from './Message'


export const Messaging=()=>{
    const navigate=useNavigate()
    const {user}= useSelector((state) => state.user);
    const socket=useRef()
    const scroll=useRef()
    const [users,setUsers]=useState()
    const[currentchat,setCurrentchat]=useState(null)
    const[text,setText]=useState()
    const[conversations,setConversations]=useState([])
    const[messages,setMessages]=useState(null)
    const [onlinefriends,setOnlinefriends]=useState()
    const[onlineusers,setOnlineusers]=useState()

    useEffect(async()=>{
        const tata =await axios.get(`http://127.0.0.1:3001/message/conversations/${user._id}`)
        
setConversations(tata.data)
    },[user])
useEffect(async()=>{
    const data =await axios.get(`http://127.0.0.1:3001/message/currentchat/${currentchat?._id}`)
console.log(data)
setMessages(data?.data)
},[currentchat])
    useEffect(async() => {
        const data=await axios.get('http://127.0.0.1:3001/auth/getusers')
        setUsers(data.data.users)
        socket.current = io("ws://localhost:8000");
        {user&&socket.current.emit('addUser',user?._id)}
        socket.current.on("getUsers", (data) => {
      
           });
        socket.current.on("getMessage", (data) => {
           
  
        });
      }, []);
      useEffect(()=>{
const a=users&&users?.filter((u)=> onlineusers?.map((o)=>(o.userId===u._id)))
setOnlinefriends(a)
      },[])
      const logout=(e)=>{
        localStorage.removeItem('server_token')
        navigate('/')
    }
const handlesubmit=async(e)=>{
e.preventDefault()


const receiverId = currentchat.members.find(
    (member) => member !== user._id
  );

  socket.current.emit("sendMessage", {
    senderId: user._id,
    receiverId,
    text: text,
  });
  await axios.post('http://127.0.0.1:3001/message/currentchat',
{conversationId:currentchat._id,sender:user?._id,reciever:receiverId,text:text})
const data =await axios.get(`http://127.0.0.1:3001/message/currentchat/${currentchat?._id}`)
setMessages(data?.data)
if(scroll.current){
    scroll.current.scrollIntoView({behavior:"smooth"})}
}
    return(
        <>
      <div className="container">
<div className="chatcontainer">
    <div className="messages">
        <div className="top">
<h5 style={{padding:'1vmax'}}>Messaging</h5>
</div>
<div className="messagercontainers">
{conversations&&conversations?.map((o)=><>  
 <div className='messagecontainer' onClick={()=>setCurrentchat(o)}><Conversation o={o}/>
</div>
</>)}

</div>
    </div>
    <div className='chatbox' >
        {currentchat?<><div className="top">
<h5 style={{padding:'1vmax'}}>conversations box</h5>
</div>
<div className="messaged" >
{messages&&messages.map((m,index)=><>
<div ref={scroll}>
<Message m={m} own={user?._id===m.sender} last={messages.length-1===index} />
</div>
</>)}
</div>
<div className="boxtop">
    <form onSubmit={handlesubmit}>
<input placeholder="Write a message..." className="messagebox" onChange={(e)=>setText(e.target.value)} />
<input type='submit' value='send' className='messagebutton'/>
</form>
</div>
    </>:<h5>No Convo</h5>}</div>
    <div className='online'>
        <div className="top">
<h5 style={{padding:'1vmax'}} >Online</h5>
</div>

<div className="onlineuser">
    <div className="onlineitem">
<h5>rajesh</h5>
</div>
<div className="bluebadge">

</div>
</div>

<div className="onlineuser">
    <div className="onlineitem">
<h5>rajesh</h5>
</div>
<div className="greybadge">

</div>
</div>
<div className="onlineuser">
    <div className="onlineitem">
<h5>rajesh</h5>
</div>
<div className="greybadge">

</div>
</div>
<div className="onlineuser">
    <div className="onlineitem">
<h5>rajesh</h5>
</div>
<div className="greybadge">

</div>
</div>


    </div>

</div>

</div>
</>
    )
}
export default Messaging