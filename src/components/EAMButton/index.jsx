import React from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from 'clsx';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  btn: {
    padding: '8px 16px',
    fontSize: 15,
    fontWeight: 'bold',
    borderRadius: 0,
    textTransform: 'none',
  },
  primary: {
    background: '#0073E6',
    color: '#F0F0F0',
    '&:hover':{
      background: '#0073e6db',
    }
  },
  secondary: {
    background: '#FFFFFF',
    color: '#0073E6',
    '&:hover':{
      background: '#f3f3f3db',
    }
  }
});
export default function EAMButton({ className, id, disabled, variant = "primary", label, onClick, children }) {
  const classes = useStyles();
  return (
    <Button className={
      clsx(className,
        classes.btn, {
        [classes.primary]: variant === 'primary',
        [classes.secondary]: variant === 'secondary'
      })
    }
    onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}