import React from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from 'clsx';
import { Button, Menu, MenuItem } from '@material-ui/core';

const useStyles = makeStyles({

});
export default function EAMMenu({ id, onMenuItemClick, label, className, value , menuItemClass}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleItemClick = (event, itemId) => {
    event.stopPropagation();
    onMenuItemClick(itemId);
    handleClose();
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className={className} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {label}
      </div>
      <Menu
        id={id}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {value?.map(val => (
          <MenuItem key={val.label} className={menuItemClass} onClick={(event) => {handleItemClick(event, val.id)}}>{val.label}</MenuItem>
        ))}
      </Menu>
    </>
  );
}