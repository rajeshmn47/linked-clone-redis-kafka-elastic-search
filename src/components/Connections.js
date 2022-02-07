import {useState,useEffect} from 'react'
import axios from 'axios'
import { Details } from '@material-ui/icons';


const Ira=({use})=>{
    console.log(use)
    return(
        <>
        <h1>{use.email}</h1>
        <h1>raj</h1>
        <h3>kaj</h3>
        </>
    )
}
export const Connections=()=>{
const [users,setUsers]=useState([])
const [user,setUser]=useState()
useEffect(async() => {
  
      axios.get("http://127.0.0.1:3001/auth/getusers").then((response)=>{
      
    setUsers(response.data.users)})
     }, []);
  const Details=(inde)=>{
    
      console.log(inde)
      {users&&console.log(users[inde])}
      {users&&setUser(users[inde])}
      console.log(user)
  }
    return(
        <>
        <div style={{display:'flex'}}>
            <div>
        <h1>friends list</h1>
        {users&&users.map((item,index)=>
        <>
        <p>{item.email}{index}</p>
        <button onClick={()=>Details(index)}>getdetails</button></>)}
        </div>
        <div>
            {user&&<Ira use={user}/>}
            </div>
        </div>
       </>
    )
}
export default Connections