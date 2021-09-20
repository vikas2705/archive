import clsx from 'clsx';
import { FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  formControl:{
      width: '100%',
      paddingLeft: 14,
  }
});

export default function EAMFormControl({ children, className }) {
  const classes = useStyles();

  return (
    <FormControl
     className={clsx(classes.formControl, className)}
     component="legend">
      {children}
    </FormControl>
  )
}