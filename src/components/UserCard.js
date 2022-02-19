import ima from './images/noprofile.jpeg'

export const UserCard=(user)=>{
    console.log(user.user.email)
    const email=user.user.email
    return(
        <>
    <div className="usercard">
        <img src={ima} alt='' style={{border:'3px solid red',borderRadius:'50%'}}/>
{email}
<button className='buttons'>cancel</button>
</div>
</>
    )
}
export default UserCard