import React, { useState,useEffect } from 'react';
import {AppBar,TextField,Button} from '@material-ui/core'
import '../App.css'
import im from '../images/table.jpeg'
import PeopleIcon from '@material-ui/icons/People';
import {Link} from 'react-router-dom'
import WorkIcon from '@material-ui/icons/Work';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import axios from 'axios'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom'

export const Login=()=>{
    const navigate=useNavigate()
  
useEffect(() => {
 if(localStorage.getItem('server_token')){
     navigate('/home')
 }
     else{
         console.log('ok rahesh')
     }
   
  }, []);
const [user,setUser]=useState()
    const[email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const handlesubmit= async(e)=>{
        e.preventDefault()
        const newPost = {
            password:password,
            email:email,
          };
       const g=await axios.post("http://127.0.0.1:3001/auth/login", newPost);
       console.log(g.data.server_token)
       localStorage.setItem("server_token",g.data.server_token);
    navigate('/home')  
        }
    return(
        <>
        <div  style={{backgroundColor:'white',display:'flex',padding:'1vmax',}}>
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
<div style={{flex:1,margin:'5px',height:'1vmax',opacity:'0.5',}}>
<span style={{borderLeft:'1px solid black',marginRight:'3px'}}></span>
join now</div>
<div style={{flex:1,padding:'5px'}}><button style={{outline:'none',backgroundColor:'white',border:'1px solid blue',
color:'blue',borderRadius:'10px',padding:'2px'}}>
Sign<span  style={{marginLeft:'1vmax'}}>in</span></button></div>

</div>
<div style={{display:'flex',height:'40vw',justifyContent:'center'}}>
 <div style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}>
   <div style={{color:'rgb(119, 28, 28)',opacity:'0.9'}}>
   <h1>Welcome To Your</h1>
   <h1>Proffessional Community</h1>
   </div>

<form onSubmit={handlesubmit}>
<div style={{display:'flex',flexDirection:'column',height:'40vh',justifyContent:'space-between'}}>
<TextField placeholder='email' variant='outlined' value={email} onChange={(e)=>setEmail(e.target.value)} />
<TextField placeholder='password' type='password' variant='outlined' value={password} onChange={(e)=>setPassword(e.target.value)} />
<Button type='submit' style={{borderRadius:'2vmax',height:'4vmax', backgroundColor:'blue',color:'white'}}>signin</Button>
</div>
</form>
<p>dont have account <span><Link to={'/register'}>sign up now</Link></span></p>
 </div>
 <div style={{marginLeft:'1vmax'}}>
   <img src={im} height='500'/>
 </div>
</div>



</>
    )
}

export default Login;