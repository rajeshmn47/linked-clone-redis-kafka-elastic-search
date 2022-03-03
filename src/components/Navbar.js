import PeopleIcon from '@material-ui/icons/People';
import WorkIcon from '@material-ui/icons/Work';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import HomeIcon from '@material-ui/icons/Home';
import TelegramIcon from '@material-ui/icons/Telegram';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import Collapse from '@material-ui/core/Collapse';
import {BrowserRouter,Routes,Route,Link,useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const Navbar=()=>{
    const[selected,setSelected]=useState(0)
    const {user}= useSelector((state) => state.user);
    const navigate=useNavigate()
    const logout=(e)=>{
        localStorage.removeItem('server_token')
        navigate('/')
      }
    console.log(user)
const selectnav=(i)=>{
    console.log(i)
setSelected(i)
}
useEffect(async()=>{
    console.log(user)
    const id=user._id
     const data=await axios.get(`http://127.0.0.1:3001/auth/notifications/${id}`)
        console.log(data)   
    },[user])

    return(
        <div  style={{backgroundColor:'white',zIndex:'100',display:'flex',alignItems:'center',zIndex:'10000',padding:'1vmax',position:'fixed',width:'100vw'}}>
        <div style={{flex:1,marginTop:'0px',}}>
        <h3 style={{color:'blue'}}>Linked<span style={{backgroundColor:'blue',color:'white',marginLeft:'2px'}}>in</span></h3>
            </div>
        <div style={{flex:3,marginLeft:'10px',alignItems:'center',border:'none',outline:'none',display:'flex',backgroundColor:'rgba(163, 153, 173, 0.877)',width:'20vw'}}>
            <SearchIcon/>
            <input type='text' placeholder='search jobs' style={{height:'3vmax',backgroundColor:'rgba(163, 153, 173, 0.877)',border:'none',outline:'none'}}/></div>
        <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',flex:6,opacity:'0.5',padding:'5px',fontSize:'1vmax'}}>
        <Link to='/home'><div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}} onClick={()=>selectnav(0)} className={selected===0?'selected':'ok'}>
            <HomeIcon/>Home</div></Link>
            <Link to='/connections'>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}} onClick={()=>selectnav(1)} className={selected===1?'selected':'ok'}><PeopleIcon/>My network</div>
        </Link>
        <Link to='/notifications'>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}} onClick={()=>selectnav(2)} className={selected===2?'selected':'ok'}>
     
       
          <Badge badgeContent={4} color="error">
          <NotificationIcon  />
</Badge>
     
   
   
            Notifications</div></Link>
            <Link to='/jobs'>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}} onClick={()=>selectnav(3)} className={selected===3?'selected':'ok'}><WorkIcon/>Jobs</div>
        </Link>
        <Link to='/messaging'>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}} onClick={()=>selectnav(4)} className={selected===4?'selected':'ok'}>
            <TelegramIcon/>Messaging</div></Link>
        </div>
    
        <div style={{flex:2,padding:'5px'}}>
            {!user?<button style={{outline:'none',backgroundColor:'white',border:'1px solid blue',
        color:'blue',borderRadius:'10px',padding:'2px'}}>
Sign<span  style={{marginLeft:'1vmax'}}>in</span></button>:null} </div>
        <div style={{height:'2vmax',width:'35vw',alignItems:'center',padding:'0px 20px',display:'flex',justifyContent:'space-between'}}>
            <div style={{alignItems:'flex-end',float:'right'}}>U Are {user?.email}</div>
            <div onClick={logout} style={{marginRight:'5vmax'}}>Logout</div>
       
        </div>
        </div>

    )
}
export default Navbar