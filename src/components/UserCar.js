import ima from './images/noprofile.jpeg'
import { useSelector,useDispatch} from 'react-redux'
import axios from 'axios'

export const UserCar=(user1)=>{
    const {user}= useSelector((state) => state.user);
        console.log(user)
    console.log(user1)
    const email=user1.user1.email
const accept=async (email)=>{
    console.log('jhgfd')
    await axios.post('http://127.0.0.1:3001/auth/respondtorequest',{email:email,first_name:'krs',second_name:'lrs',
    job_title:'software develloper',experience:4,action:'accept',useremail:user.email
})
console.log('basic')
}
const reject=async (email)=>{
   await  axios.post('http://127.0.0.1:3001/auth/respondtorequest',{email:email,first_name:'krs',second_name:'lrs',
    job_title:'software develloper',experience:4,action:'reject'})
}
    return(
        <>
    <div className="usercard">
        <img src={ima} alt='' width='70' style={{border:'5px solid red',borderRadius:'50%'}}/>
{email}
<button className='buttons' onClick={()=>accept(email)}>accept</button>
<button className='buttons' onClick={()=>reject(email)}>cancel</button>
</div>
</>
    )
}
export default UserCar