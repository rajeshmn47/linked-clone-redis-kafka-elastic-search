import {useState,useEffect} from 'react'
import axios from 'axios'
import { Details } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { StepConnector } from '@material-ui/core';
import Navbar from './Navbar'
import { useSelector,useDispatch} from 'react-redux';
import { getAllUsers } from '../actions/userActions';
import SearchIcon from '@material-ui/icons/Search';
import UserCard from './UserCard'
import img from './images/noprofile.jpeg'
import UserCar from './UserCar'
import Connecteduser from './Connecteduser'

export const Connections=()=>{
const dispatch=useDispatch()
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { error, users } = useSelector((state) => state.allUsers);
    console.log(user&&user)
const navigate=useNavigate()
const [pendinglist,setPendinglist]=useState([])
const headers = {
    'Accept': 'application/json'
};

useEffect(() => {
 console.log('dispatch')
dispatch(getAllUsers())
console.log('l')
  }, []);
    useEffect(()=>{
        const pend=[]
        console.log(user)
       {user&&user.waiting?.map((m)=>pend.push(m.email))}
        setPendinglist(()=>pend)
        console.log(pendinglist)
        console.log('rajfvdfcsdh')
    },[user,dispatch])
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
console.log(usermail.connections,'rajeevsuri')
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
            <img src={img} alt='' style={{borderRadius:'50%'}} width='70'/>
     <p className='greyfonts'>{usermail.email.slice(0,15)}</p>
        <button className='buttons' onClick={()=>connect(usermail.email)}>{connec?'waiting':'Connect'}</button>
        </div>
        </>
    )
}

    return(
        <>
     
       
        <div style={{display:'flex'}} className='contained'>
       
      
       
      <div className='sent'>Connected Users</div>
       <div className='userslist'>
       {users&&user?.connections?.map((item,index)=>
       <>
       {user&&<Connecteduser  usermail={item}/>}
        </>
        )}

</div>
</div>
<div style={{display:'flex'}} className='contained'>
            <div style={{flex:'1'}}>
       
      
        <div className='userslist' >
        {users&&users.map((item,index)=>
        <>
        {user&&<Usercard  k='liked' from={user}  usermail={item} pendinglist={pendinglist}/>}
         </>
         )}
</div>
</div>

</div>

<div className='contained'>
<span style={{margin:'2vw 0vw',color:'white',width:'40vw',backgroundColor:'blue'}}
className='sent'>sent connections</span>

<div className='userslist'>{user?.waiting?.map((q)=><UserCard user={q} />)}</div>

</div>
<div className='contained'>
  
<div>
<div className='userslist'>{user?.pending?user?.pending?.map((q)=><UserCar user1={q} />):'no requests'}</div>
</div>
</div>
     </>
     
    )
}
export default Connections