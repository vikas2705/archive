import { makeStyles } from "@material-ui/styles";
import { useCallback, useState } from "react";
import IconButton from "../IconButton";
import ExpandIcon from "../../assets/Icons/ExpandIcon";

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    right: 30,
    bottom: 25,
  }
})
export default function EAMExpandButton({ children, onClick }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const classes = useStyles();
  const handleClick = useCallback(() => {
    if(onClick){
      onClick();
      return;
    }
    setIsExpanded(!isExpanded)
  },[isExpanded, onClick])
  return (
    <div className={classes.root}>
    {children}
    <IconButton
      onClick={handleClick}>
        {isExpanded ? (<ExpandIcon />) : (<ExpandIcon />)
      }
    </IconButton>
    </div>
  )
}