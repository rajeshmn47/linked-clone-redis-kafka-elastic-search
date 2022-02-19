import PeopleIcon from '@material-ui/icons/People';
import {Link} from 'react-router-dom'
import WorkIcon from '@material-ui/icons/Work';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import HomeIcon from '@material-ui/icons/Home';
import TelegramIcon from '@material-ui/icons/Telegram';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';

export const Navbar=(user,logout)=>{
    console.log(user.user.email,logout)
    return(
        <div  style={{backgroundColor:'white',zIndex:'100',display:'flex',alignItems:'center',padding:'1vmax',position:'fixed',width:'100vw'}}>
        <div style={{flex:1,marginTop:'0px',}}>
        <h3 style={{color:'blue'}}>Linked<span style={{backgroundColor:'blue',color:'white',marginLeft:'2px'}}>in</span></h3>
            </div>
        <div style={{flex:3,marginLeft:'10px',border:'none',outline:'none',display:'flex',backgroundColor:'rgba(163, 153, 173, 0.877)',width:'20vw'}}>
            <SearchIcon/>
            <input type='text' placeholder='search jobs' style={{height:'3vmax',backgroundColor:'rgba(163, 153, 173, 0.877)',border:'none',outline:'none'}}/></div>
        <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',flex:6,opacity:'0.5',padding:'5px',fontSize:'1vmax'}}>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <HomeIcon/>Home</div>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}><PeopleIcon/>My network</div>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <NotificationsIcon/>Notifications</div>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}><WorkIcon/>Jobs</div>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <TelegramIcon/>Messaging</div>
        </div>
     
        <div style={{flex:2,padding:'5px'}}>
            {!user?<button style={{outline:'none',backgroundColor:'white',border:'1px solid blue',
        color:'blue',borderRadius:'10px',padding:'2px'}}>
Sign<span  style={{marginLeft:'1vmax'}}>in</span></button>:null} </div>
        <div style={{height:'2vmax',width:'35vw',alignItems:'center',padding:'0px 20px',display:'flex',justifyContent:'space-between'}}>
            <div style={{alignItems:'flex-end',float:'right'}}>U Are {user.user.email}</div>
            <div onClick={logout}>Logout</div>
       
        </div>
        </div>

    )
}
export default Navbar