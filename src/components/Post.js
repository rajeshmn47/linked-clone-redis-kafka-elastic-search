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
import LongMenu from './Menu'
import {useSelector} from 'react-redux'
import { useEffect,useState} from "react";
import Collapse from '@material-ui/core/Collapse';
import {TextField,Button} from '@material-ui/core'
 
// format timestamp


export const Post=({p})=>{
    const {user}= useSelector((state) => state.user);
    const t=p.likes.includes(user?._id)
    console.log(t)
    console.log(p.likes.includes(user?._id))
    const[isliked,setIsliked]=useState(t)
    const[expanded,setExpanded]=useState(false)
    const[comment,setComment]=useState()
    const[comments,setComments]=useState()
    const[likes,setLikes]=useState(p.likes.length)
    console.log(p.comments,'raju')
    useEffect(() => {
        setIsliked(p.likes.includes(user?._id));
      }, [user, p.likes]);
      useEffect(() => {
        setComments(p.comments);
      }, [user, p.comments]);
  const commenthandler=()=>{
setExpanded(!expanded)
  }  
const addcomment=async(e)=>{
    console.log('ok')
    e.preventDefault()
    await axios.post('http://127.0.0.1:3001/auth/addcomment',{userid:user._id,postid:p._id,commenttext:comment}) 
setComments([...comments,{text:comment}])
console.log(comments,'avatar')
setComment('')
}
 
    const likehandler=async()=>{
        setIsliked(!isliked)
        if(isliked){
        setLikes(likes-1)
        }
        else{
            setLikes(likes+1)
        }
        console.log('rajesh')
await axios.post('http://127.0.0.1:3001/auth/likehandler',{userid:user._id,postid:p._id})
    }

    return(
        <>
        
   {p.userId&&<Usercars post={p} />}
 
    <p>{p.desc}</p>
{p.img&&<img src={`http://127.0.0.1:3001/images/${p.img}`}  height='200'/>}
<div className='icons'>
 {isliked? <div className='icon' onClick={()=>likehandler()}>
<ThumbUpAltOutlinedIcon htmlColor='green'/>likes({likes})
</div>
:
<div className='icon' onClick={()=>likehandler()}>
    <ThumbUpAltOutlinedIcon htmlColor='rgb(138, 132, 132)' />likes({likes})
    </div>
}
<div className='icon' onClick={()=>commenthandler()}>
<CommentOutlinedIcon htmlColor='rgb(138, 132, 132)'/>Comments({p.comments.length})
</div>
<div className='icon'>
<ShareOutlinedIcon htmlColor='rgb(138, 132, 132)'/>Share
</div>
</div>
<div style={{zIndex:'100',marginTop:'1vmax'}}>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
        <form onSubmit={(e)=>addcomment(e)}>
        <TextField style={{width:'40vw'}} variant='outlined' 
        value={comment} placeholder='comment here' onChange={(e)=>setComment(e.target.value)}/>
        <Button type='submit'>submit</Button>
       
        {comments?.map((t)=><p style={{marginTop:'1vmax'}}>{t.text}</p>
        )} 
        </form>      
        </Collapse>
</div>

</>
    )
}
export default Post