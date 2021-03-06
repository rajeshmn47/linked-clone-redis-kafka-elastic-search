import axios from 'axios'
import { useEffect,useState } from 'react'
import {format} from 'timeago.js'
import LongMenu from './Menu'
import {useSelector} from 'react-redux'

export const Usercars=({post})=>{
    const {user}= useSelector((state) => state.user);
  const[use,setUse]=useState()
  console.log(post)
useEffect(async()=>{
const r=await axios.get(`http://127.0.0.1:3001/auth/getuser/${post.userId}`)
console.log(r,'kkkk')
setUse(r.data.user)
},[])
    return(
       <>
       <div className='usercardd'>
          
       <img src={use?.profilePicture?`http://127.0.0.1:3001/images/${use.profilePicture}`:`http://127.0.0.1:3001/images/noprofile.jpeg`} 
       style={{borderRadius:'50%'}} height='30'  width='30'/>
   
        <div style={{display:'block',marginLeft:'5px'}}>
        {use?.first_name}</div>
        <span style={{marginLeft:'1vmax',display:'flex',fontSize:'1vmax'}}>
          {format(post.createdAt)}
          {user&&post&&user._id===post.userId?<LongMenu post={post} />:null}
          </span>        
        </div>
    
        </>
    )
}
export default Usercars