import {format} from 'timeago.js'

export const Notification=({body,time,status})=>{
    console.log(status==='not_read')
    return(
        <div className={status==='not_read'?'newnotification':'notification'}>
<p>{body}</p>
<p>{format(time)}</p>
</div>
    )
}
export default Notification