import PeopleIcon from '@material-ui/icons/People';
import {Link} from 'react-router-dom'
import WorkIcon from '@material-ui/icons/Work';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import FindInPageIcon from '@material-ui/icons/FindInPage';

export const Navbar=(user,logout)=>{
    console.log(user.user.email,logout)
    return(
        <div  style={{backgroundColor:'white',zIndex:'100',display:'flex',alignItems:'center',padding:'1vmax',position:'fixed',width:'100vw'}}>
        <div style={{flex:1,marginTop:'0px',}}>
        <h3 style={{color:'blue'}}>Linked<span style={{backgroundColor:'blue',color:'white',marginLeft:'2px'}}>in</span></h3>
            </div>
        <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',flex:1,opacity:'0.5',padding:'5px',fontSize:'0.5vmax'}}>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <FindInPageIcon/>Discover</div>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}><PeopleIcon/>People</div>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <LocalLibraryIcon/>Learning</div>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}><WorkIcon/>Jobs</div>
        </div>
        <div style={{flex:0.5,margin:'5px',height:'1vmax',opacity:'0.5',}}>
        <span style={{borderLeft:'1px solid black',marginRight:'3px'}}></span>
        join now</div>
        <div style={{flex:2,padding:'5px'}}><button style={{outline:'none',backgroundColor:'white',border:'1px solid blue',
        color:'blue',borderRadius:'10px',padding:'2px'}}>
        Sign<span  style={{marginLeft:'1vmax'}}>in</span></button> </div>
        <div style={{height:'4vmax',width:'10vw',alignItems:'center',padding:'0px 20px',display:'flex',justifyContent:'space-between'}}>
            <div style={{alignItems:'flex-end',float:'right'}}>U Are {user.user.email}</div>
            <div onClick={logout}>Logout</div>
       
        </div>
        </div>

    )
}
export default Navbar