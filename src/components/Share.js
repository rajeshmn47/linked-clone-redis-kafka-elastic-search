import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {useState,useRef} from 'react'
import {
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
  } from "@material-ui/icons";
  import axios from 'axios'

export const Share=()=>{
    const[file,setFile]=useState(null)
    const [value,setValue]=useState()
    const share=useRef()
    const navigate=useNavigate()
    const {user}= useSelector((state) => state.user);
    console.log(user)
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
const handlesubmit= async (e)=>{
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("http://127.0.0.1:3001/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("http://127.0.0.1:3001/auth/post", newPost);
      window.location.reload();
    } catch (err) {}
  };


    return(
        <>
    <form onSubmit={(e)=>handlesubmit(e)}>
    <div className='feed'>
<input type='text' placeholder='share a post' className='sharepost' onChange={(e)=>setValue(e.target.value)}/>
<input ref={share}
               className='milk'
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
<div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" onClick={()=>addfiles()} />
              <span className="shareOptionText">Photo or Video</span>
            
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>

              <button className='postbtn'>post</button>
</div>
</form>
</>
    )
}
export default Share