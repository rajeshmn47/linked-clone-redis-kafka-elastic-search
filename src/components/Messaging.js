import { io } from "socket.io-client";
import { useRef,useEffect } from "react";
import Navbar from './Navbar'
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
export const Messaging=()=>{
    const navigate=useNavigate()
    const {user}= useSelector((state) => state.user);
    const socket=useRef()
    useEffect(() => {
        socket.current = io("ws://localhost:8000");
        socket.current.on("getMessage", (data) => {
           
         console.log('ok')			
        });
      }, []);
      const logout=(e)=>{
        localStorage.removeItem('server_token')
        navigate('/')
    }
    return(
        <>
      

</>
    )
}
export default Messaging