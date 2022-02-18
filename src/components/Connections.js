import {useState,useEffect} from 'react'
import axios from 'axios'
import { Details } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { StepConnector } from '@material-ui/core';
import Navbar from './Navbar'

export const Connections=()=>{
const navigate=useNavigate()
const [users,setUsers]=useState([])
const [user,setUser]=useState()
const [pendinglist,setPendinglist]=useState([])
const headers = {
    'Accept': 'application/json'
};


     useEffect(async() => {
         if(!localStorage.getItem('server_token')){navigate('/')}
         const servertoken=localStorage.getItem('server_token')&&localStorage.getItem('server_token') 
         axios("http://127.0.0.1:3001/auth/loaduser", 
         {method:'get',headers: { ...headers,'Content-Type': 'application/json',servertoken:servertoken }}).then((response)=>{
             console.log(response.data.message[0])
             setUser(response.data.message[0])})
          
    
        axios("http://127.0.0.1:3001/auth/getusers", 
        {method:'get',headers: { ...headers,'Content-Type': 'application/json',servertoken:servertoken }}).then((response)=>{
            console.log(response.data.users)
            setUsers(response.data.users)})    
     
      
    
       }, []);
    useEffect(()=>{
        const pend=[]
        console.log(user)
        {user&&user.waiting.map((m)=>pend.push(m.email))}
        {user&&setPendinglist(()=>pend)}
        console.log(pendinglist)
        console.log('rajesh')
    },[user])
       const pendinglist1=()=>{
      console.log(user)
     
    } 
const Ira=({use})=>{
const sendrequest= async(email)=>{
 await axios.post("http://127.0.0.1:3001/auth/friendrequest",{'to':email,'from':'rajeshmn4567@gmail.com'})      
}

        console.log(use)
        return(
            <>
        <p>details of the user u clicked</p>
            <p>{use.email}</p>
     <button  className='buttons' onClick={()=>sendrequest(use.email)}>send request</button>
            </>
        )
    }
  const Details=(inde)=>{
    
      console.log(inde)
      {users&&console.log(users[inde])}
      {users&&setUser(users[inde])}
      console.log(user)
  }
 
const logout=(e)=>{
    localStorage.removeItem('server_token')
    navigate('/')
}
const Usercard= ({from,usermail,pendinglist})=>{
    const [connec,setConnec]=useState(false)
   
    console.log(pendinglist.includes(usermail.email))
const[liked,setLiked]=useState(false)
useEffect(()=>{
setConnec((pendinglist.includes(usermail.email)))
console.log(usermail.pending)
},[])
const connect=async(emai)=>{
    console.log(emai)
    const to={email:usermail.email,first_name:usermail.first_name,last_name:'kaiser',job_title:'cricketer'}
    await axios.post('http://127.0.0.1:3001/auth/addreq',{from:from.email,to:to})
    setConnec(!connec)
    const servertoken=localStorage.getItem('server_token')&&localStorage.getItem('server_token')
  
}
const [likedby,setLikedby]=useState(10)

const likeit= async()=>{
    await axios.post('http://127.0.0.1:3001/auth/addreq',{from:from.email,to:usermail})
setLiked(!liked)
if (!liked){
setLikedby(likedby+1)
}
if (liked){
    setLikedby(likedby-1)
    }
}

    return(
        <>
        <div className='usercard'>
     <h1>{usermail.pending.map((u)=>u.email)}</h1>
        <button className='buttons' onClick={()=>connect(usermail.email)}>{connec?'waiting':'Connect'}</button>
        <button className={liked?'butter':'buttons'} onClick={()=>likeit()}>{liked?'unlike':'like'}</button>
        </div>
        </>
    )
}

    return(
        <>
        {user&&<Navbar user={user} logout={logout}/>}
      
        <div style={{display:'flex'}}>
            <div style={{flex:'1'}}>
        <h1>friends list</h1>
        <div className='userslist'>
        {users&&users.map((item,index)=>
        <>
      
        {user&&<Usercard  k='liked' from={user}  usermail={item} pendinglist={pendinglist}/>}
        </>)}
      </div>
      </div>
      </div>
      <div style={{borderLeft:'1px solid black',height:'100vh',flex:'1',position:'fixed',marginLeft:'50vw',padding:'2vmax'}}>
            {user&&<Ira use={user}/>}
            </div>
        
     </>
     
    )
}
export default Connections