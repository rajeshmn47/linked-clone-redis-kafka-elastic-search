import axios from 'axios'

export const Editprofile=()=>{

    return(
        <>
        <div className='container'>
        <form className='editform'>
        <input type='file' placeholder='profilepic'/>
        <input type='submit' placeholder='upload'/>
        </form>
        </div>
        </>
    )
}
export default Editprofile