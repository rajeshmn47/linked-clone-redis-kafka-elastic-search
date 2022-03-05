import { useEffect,useState } from "react"
import { useSelector } from "react-redux";
import Usercart from './Usercart'
import axios from 'axios'
import {format} from 'timeago.js'

export const Conversation=({o})=>{
    const {user}= useSelector((state) => state.user);
    const[id,setId]=useState()
    const[count,setCount]=useState(0)
    const[lastmessage,setLastmessage]=useState()
    useEffect(async()=>{
        const friendId = o.members.find((m) => m !== user?._id);
setId(friendId)
const data=await axios.get(`http://127.0.0.1:3001/message/currentchat/${o._id}`)
o&&setLastmessage(data.data[data.data.length-1])
console.log(data.data[data.data.length-1])
var c=0
for(var i=0;i<data.data.length;i++){
if(data.data[i].reciever===user._id&&data.data[i].seen===false)
{
    c=c+1

}
}
setCount(c)
    },[o,user])

    return(
        <>
   <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
    <Usercart id={id}/>
    <div className={count?'messagexist':'notexist'}>
       {lastmessage?.text.slice(0,20)}
       </div>
       </div>
       <div>
           <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
       <p style={{fontSize:'1vmax',marginBottom:'10px'}}>{format(lastmessage?.createdAt)}</p>
    {count>0&&
    <div style={{backgroundColor:'blue',color:'white',borderRadius:'50%',padding:'0.5vmax'}}>
{count}
    </div>}
    </div>
   
    </div>
    </>    )
}
export default Conversation