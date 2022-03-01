import { useState,useEffect } from "react"


export const Message=({m,own,last})=>{

console.log(last)
    return(
        <>
        <div className={own?"ownmessage":"message"}>
{m.text}
{last&&(m.seen?'seen':'not seen')}
</div>
</>
    )
}
export default Message