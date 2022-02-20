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


export const Post=({p})=>{
    console.log(p)
    return(
        <>
   {p.userId&&<Usercars post={p} />}
    <p>{p.text}</p>
{p.img&&<img src={`http://127.0.0.1:3001/images/${p.img}`}  height='200'/>}
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
</>
    )
}
export default Post