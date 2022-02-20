import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {useState,useRef,useEffect} from 'react'
import Share from './Share'
import {
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
  } from "@material-ui/icons";
import axios from 'axios'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';


export const Home=()=>{
    const[file,setFile]=useState(null)
    const [posts,setPosts]=useState([])
    const share=useRef()
    const navigate=useNavigate()
    const {user}= useSelector((state) => state.user);
    console.log(user)
    useEffect(async()=>{
const {data}=await axios.get('http://127.0.0.1:3001/auth/getposts')
console.log(data.data)
setPosts(data.data)
    },[])
    const logout=(e)=>{
        localStorage.removeItem('server_token')
        navigate('/')
    }
    const addfiles=()=>{
        console.log('raju')
        share.current.classList.add("water")
        share.current.classList.remove("milk")
        console.log('kgf')
    }

    return(
        <>
          {user&&<Navbar user={user} logout={logout}/>}
<div className='container'>
    
<Share/>
</div>
<div className='feedcontainer'>
{posts&&posts.map((p)=><>
<div className='div'>
    <p>{p.text}</p>
{p.img&&<img src={`http://127.0.0.1:3001/images/${p.img}`} height='200'/>}
<div className='icons'>
    <div className='icon'>
<ThumbUpAltOutlinedIcon htmlColor='rgb(138, 132, 132)'/>Like
</div>
<div className='icon'>
<CommentOutlinedIcon htmlColor='rgb(138, 132, 132)'/>Comment
</div>
<div className='icon'>
<ShareOutlinedIcon htmlColor='rgb(138, 132, 132)'/>Share
</div>
</div>
</div>
</>)}
</div>
</>
    )
}
export default Home