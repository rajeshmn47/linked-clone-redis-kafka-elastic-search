import { useState,useEffect } from "react"
import {format} from 'timeago.js'

export const Message=({m,own,last})=>{

console.log(last)
    return(
        <>
        <div className={own?"ownmessage":"message"}>
{m.text}

</div>
<div className={own?"right":"left"}>
    {format(m.createdAt)}
{own&&last&&(m.seen?'seen':' not seen')}
</div>
</>
    )
}
export default Message