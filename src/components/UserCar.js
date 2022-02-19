import ima from './images/noprofile.jpeg'


export const UserCar=(user)=>{
    console.log(user.user.email)
    const email=user.user.email
    return(
        <>
    <div className="usercard">
        <img src={ima} alt='' style={{border:'5px solid red',borderRadius:'50%'}}/>
{email}
<button className='buttons'>accept</button>
<button className='buttons'>cancel</button>
</div>
</>
    )
}
export default UserCar