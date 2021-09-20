import { FormLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  label:{
    fontSize: 12,
    color: '#979DAC !important',
    lineHeight: '18px',
    // fontFamily: 'Heebo',
  }
});

export default function EAMFormLabel({ children }) {
  const classes = useStyles();

  return (
    <FormLabel
     className={classes.label}
     component="legend">
      {children}
    </FormLabel>
  )
}