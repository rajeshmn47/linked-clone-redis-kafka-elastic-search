import {TextField,Button} from "@material-ui/core"
import { Paper } from '@material-ui/core';

export const Postjob=()=>{
    const handlesubmit=()=>{
        console.log('ok')
    }
    return(
        <div className="container">
    <Paper style={{width:'80vw',display:'flex',justifyContent:'center'}}>
       
            <div className="postjobform">
<form className="postjobforms" onSubmit={handlesubmit}>
<TextField placeholder='job title' variant='outlined'/>
<TextField placeholder='description' variant='outlined'/>
<TextField placeholder='job title' variant='outlined'/>
</form>
<form className='postjobforms' onSubmit={handlesubmit}>
<TextField placeholder='description' variant='outlined'/>
<TextField placeholder='job title' variant='outlined'/>
<TextField placeholder='description' variant='outlined'/>
<Button color='primary' type='submit' variant='outlined' style={{width:'90%',height:'5vmax'}}>
    post job</Button>
</form>

</div>
</Paper>
</div>
    )
}
export default Postjob