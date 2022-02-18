import {useState,useEffect} from 'react'
import axios from 'axios'
import { Details } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { StepConnector } from '@material-ui/core';

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
     
        <button className='buttons' onClick={()=>connect(usermail.email)}>{connec?'connection sent':'connect'}</button>
        <button className={liked?'butter':'buttons'} onClick={()=>likeit()}>{liked?'unlike':'like'}</button>
        </>
    )
}

    return(
        <>
        <div style={{height:'4vmax',width:'98vw',alignItems:'center',padding:'0px 20px',
        backgroundColor:'black',color:'white',display:'flex',position:'fixed',justifyContent:'space-between'}}>
            <div style={{alignItems:'flex-end',float:'right'}}>U Are logged in as {user&&user.email}</div>
            <div onClick={logout}>Logout</div>
        </div>
        <div style={{display:'flex'}}>
            <div style={{flex:'1'}}>
        <h1>friends list</h1>
        {users&&users.map((item,index)=>
        <>
        <p>{item.email}{index}</p>
       
        {user&&<Usercard  k='liked' from={user}  usermail={item} pendinglist={pendinglist}/>}
        
        <button className='buttons' onClick={()=>Details(index)}>getdetails</button></>)}
        </div>
        <div style={{borderLeft:'1px solid black',height:'100vh',flex:'1',position:'fixed',marginLeft:'50vw',padding:'2vmax'}}>
            {user&&<Ira use={user}/>}
            </div>
        </div>
     </>
     
    )
}
export default Connections