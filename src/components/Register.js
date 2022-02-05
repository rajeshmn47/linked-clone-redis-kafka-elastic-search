import React, { useState } from 'react';
import {AppBar,TextField,Button} from '@material-ui/core'
import '../App.css'
import im from '../images/table.jpeg'
import {Link} from 'react-router-dom'
import PeopleIcon from '@material-ui/icons/People';
import WorkIcon from '@material-ui/icons/Work';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import axios from 'axios'

export const Register=()=>{
    const[first_name,setFirst_name]=useState('')
    const [last_name,setLast_name]=useState('')
    const[email,setEmail]=useState('')
    const [password,setPassword]=useState()
    const [confirmpassword,setConfirmpassword]=useState('')
const handlesubmit= async(e)=>{
e.preventDefault()
const newPost = {
    first_name: first_name,
    last_name: last_name,
    password:password,
    email:email,
  };
await axios.post("http://127.0.0.1:3001/auth/signup", newPost);
}
    return(
        <>
<div  style={{backgroundColor:'white',display:'flex',alignItems:'center'}}>
<div style={{flex:1,marginTop:'0px',}}>
<h3 style={{color:'blue'}}>Linked<span style={{backgroundColor:'blue',color:'white',marginLeft:'2px'}}>in</span></h3>
    </div>
    <div style={{display:'flex',justifyContent:'space-evenly',flex:1,opacity:'0.5',padding:'5px'}}>
<div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
    <FindInPageIcon size='small' />Discover</div>
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
   <div style={{display:'flex',flexDirection:'column',height:'70vh',justifyContent:'space-between'}}>
<TextField placeholder='firstname' variant='outlined' value={first_name} onChange={(e)=>setFirst_name(e.target.value)} />
<TextField placeholder='lastname' variant='outlined' value={last_name} onChange={(e)=>setLast_name(e.target.value)} />
<TextField placeholder='email' variant='outlined' value={email} onChange={(e)=>setEmail(e.target.value)} />
<TextField placeholder=' password' variant='outlined' value={password} onChange={(e)=>setPassword(e.target.value)} />
<TextField placeholder=' confirm password' variant='outlined' value={confirmpassword} onChange={(e)=>setConfirmpassword(e.target.value)} />
<p>Already have account <span><Link to={'/'}>sign in now</Link></span></p>
<Button type='submit' style={{borderRadius:'2vmax',height:'4vmax', backgroundColor:'blue',color:'white'}}>Register</Button>
</div>
</form>
 </div>
 
 <div style={{marginLeft:'1vmax'}}>
   <img src={im} height='500'/>
 </div>
</div>
</>
    )
}
export default Register