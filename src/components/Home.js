import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {useState,useRef,useEffect} from 'react'
import Share from './Share'
import Post from './Post'
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
import Usercars from './Usercars'


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
    return(
        <>
      
<div className='container'>
    
<Share/>
</div>
<div className='feedcontainer'>
{posts&&posts.map((o)=><>
<div className='div'>
 <Post p={o}/>
</div>
</>)}
</div>
</>
    )
}
export default Home