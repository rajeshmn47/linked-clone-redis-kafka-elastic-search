import axios from 'axios'
import { useEffect,useState } from 'react'


export const Usercart=({id})=>{
  const[user,setUser]=useState()
useEffect(async()=>{
const r=await axios.get(`http://127.0.0.1:3001/auth/getuser/${id}`)

setUser(r.data.user)
},[user])
    return(
       <>
       <div className='usercardd'>
          
       <img src={user?.profilePicture?`http://127.0.0.1:3001/images/${user.profilePicture}`:`http://127.0.0.1:3001/images/noprofile.jpeg`} 
       style={{borderRadius:'50%'}} height='30'  width='30'/>
   
        <div style={{display:'block',marginLeft:'5px'}}>
        {user?.first_name}</div>     
        </div>
    
        </>
    )
}
export default Usercart