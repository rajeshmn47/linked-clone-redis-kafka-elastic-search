import ima from './images/noprofile.jpeg'

export const UserCard=(user)=>{
    console.log(user.user.email)
    const email=user.user.email
    return(
        <>
    <div className="usercard">
        <img src={ima} alt='' width='70' style={{border:'3px solid red',borderRadius:'50%'}}/>
{email.slice(0,14)}
<button className='buttons'>cancel</button>
</div>
</>
    )
}
export default UserCard