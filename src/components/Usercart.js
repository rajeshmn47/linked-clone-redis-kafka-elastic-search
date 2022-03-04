import axios from 'axios'
import { useEffect,useState } from 'react'


export const Usercart=({id})=>{
  const[user,setUser]=useState()
useEffect(async()=>{
const r=await axios.get(`http://127.0.0.1:3001/auth/getuser/${id}`)
console.log(r)
setUser(r.data.user)
console.log(user)
console.log('rtyuiop')
},[id])
    return(
       <>
       <div className='usercart'>
       <img src={user?.profilePicture?`http://127.0.0.1:3001/images/${user.profilePicture}`:`http://127.0.0.1:3001/images/noprofile.jpeg`} 
       style={{borderRadius:'50%'}} height='30'  width='30'/>
   
        <div style={{display:'block',marginLeft:'4px'}}>
        
        {user?.email?user.username:'no name'}
        </div>     
        </div>
    
        </>
    )
}
export default Usercart