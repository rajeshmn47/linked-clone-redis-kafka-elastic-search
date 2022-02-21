import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import { useState } from 'react';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({dialogstate,setDialogstate,post}) {
    console.log(dialogstate,setDialogstate)
  const [open, setOpen] = React.useState(false);
const[value,setValue]=useState(post.desc)
const headers = {
    'Accept': 'application/json'
};
  const handleClose = () => {
    setDialogstate(false);
  };
  const handlesubmit=async(id)=>{
    console.log(id)
    const servertoken=localStorage.getItem('server_token')&&localStorage.getItem('server_token') 
    const response  =  await axios.post("http://127.0.0.1:3001/auth/editpost", {id:id,value:value})

  }

  return (
    <div>
    
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={dialogstate}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
        <input value={value} onChange={(e)=>setValue(e.target.value)} style={{height:'20vmax',width:'40vw',padding:'1vmax',borderRadius:'1vmax'}}/>
        
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>handlesubmit(post._id)} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
