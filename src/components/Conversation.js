import { useEffect,useState } from "react"
import { useSelector } from "react-redux";
import Usercart from './Usercart'

export const Conversation=({o})=>{
    const {user}= useSelector((state) => state.user);
    const[id,setId]=useState()
    useEffect(()=>{
        const friendId = o.members.find((m) => m !== user?._id);
      
setId(friendId)
    },[])

    return(
        <>
    <Usercart id={id}/>
    </>    )
}
export default Conversation