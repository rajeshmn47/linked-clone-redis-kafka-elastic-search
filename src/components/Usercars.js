import axios from 'axios'
import { useEffect,useState } from 'react'

export const Usercars=({post})=>{
  const[use,setUse]=useState()
useEffect(async()=>{
const r=await axios.get(`http://127.0.0.1:3001/auth/getuser/${post.userId}`)
console.log(r,'kkkk')
setUse(r.data.user)
},[])
    return(
       <>
       <div className='usercardd'>
           {post.timestamp}
       <img src={use?.profilePicture?`http://127.0.0.1:3001/images/${use.profilePicture}`:`http://127.0.0.1:3001/images/noprofile.jpeg`} 
       style={{borderRadius:'50%',marginRight:'1vmax'}}height='30' width='30'/>
        {use?.first_name}
    
        </div>
        </>
    )
}
export default Usercars