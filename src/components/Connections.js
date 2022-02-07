import {useState,useEffect} from 'react'
import axios from 'axios'

export const Connections=()=>{
const [users,setUsers]=useState([])
useEffect(async() => {
  
  const g=await axios.get("http://127.0.0.1:3001/auth/getusers");
  setUsers(g)
     }, []);
    return(
        <h1>friends list</h1>
    )
}
export default Connections