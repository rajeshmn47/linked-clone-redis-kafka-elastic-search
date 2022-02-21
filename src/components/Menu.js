import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CustomizedDialogs from './Dialogbox'
import {useState} from 'react'

const options = [
  'Edit',
  'Delete',
];

const ITEM_HEIGHT = 48;

export default function LongMenu({post}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const[dialogstate,setDialogstate]=useState(false)
  const open = Boolean(anchorEl);
console.log('inside longmenu',post)
  const handleClick = (event) => {
   
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDialogstate(true)
  };

  return (
    <div>
        <CustomizedDialogs dialogstate={dialogstate}  setDialogstate={setDialogstate} post={post}/>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={()=>handleClose()}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}