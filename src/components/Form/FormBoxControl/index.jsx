import clsx from 'clsx';
import { makeStyles } from "@material-ui/styles";
import { FormLabel, FormControl } from "@material-ui/core";

const useStyles = makeStyles({
  formControl: {
    width: "100%",
    // height: "50px",
    border: props => props.hideBorder ? '0px' : "1px solid #E9EBEF",
    color: "#979DAC",
    display: "inline-block",
    borderRadius: "4px",
    fontSize: "12px",
    paddingLeft: props => props.hideBorder ? 4 : 14,
    paddingRight: 12,
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      border: "none",
    },
    "& .MuiInput-underline:before": {
      border: "none",
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
    "& .MuiSelect-select.MuiSelect-select": {
      fontSize: 13,
    },
  },
  label: {
    fontSize: 12,
    color: '#979DAC !important',
    lineHeight: '18px',
    marginTop: -9,
    marginLeft: -2,
    background: 'white',
    width: 'fit-content',
    paddingLeft: 2,
    paddingRight: 2,
    // fontFamily: 'Heebo',
  }
});

export default function FormBoxControl({ className, children, title, ...others }) {
  const classes = useStyles(others);

  return (
    <FormControl
      className={clsx(classes.formControl, className)}
      component="legend">
      {title && (<FormLabel
        className={classes.label}
        component="legend">
        {title}
      </FormLabel>
      )}
      {children}
    </FormControl>
  )
}