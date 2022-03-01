import ima from './images/noprofile.jpeg'
import { useEffect,useState} from 'react'
import axios from 'axios'

export const Connecteduser=(usermail)=>{
    const[use,setUse]=useState()
    console.log(usermail.email)
    useEffect(async()=>{
        const r=await axios.get(`http://127.0.0.1:3001/auth/getuserbymail/${usermail.email}`)
        console.log(r,'kkkk')
        setUse(r.data.user)
        },[])
    return(
        <>
    <div className="usercard">
        <img src={ima} alt='' style={{border:'3px solid red',borderRadius:'50%'}} width='70'/>
        {use?.first_name}
        <button className='buttons'>message</button>
<button className='buttons'>cancel</button>
</div>
</>
    )
}
export default Connecteduser