import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from 'clsx';
import FormBoxControl from "../Form/FormBoxControl";

const useStyles = makeStyles({
  fieldsetContainer: {
    border: props => props.isReadOnly ? '0px' : "1px solid #E9EBEF",
  },
  text: {
    paddingLeft: 4,
    marginTop: 4,
    marginBottom: 8,
    width: '100%',
    '& > div > fieldset': {
      borderColor: 'transparent !important',
    }
  },
  input: {
    '& > div:after': {
      borderBottom: 0,
    },
    '& > div > input': {
      fontSize: 13,
      fontWeight: 500,
      color: '#33415C',
    }
  },
  endSeperation: {
    borderLeft: '1px solid #C9CDD6',
    paddingLeft: 12,
    color: '#7D8597',
    fontSize: 13,
    fontWeight: 'bold',
  }
});
export default function EAMText(props) {
  const { id, title, onFieldChange = () => { }, value = '', className, isReadOnly, unit = '', ...others } = props;
  const classes = useStyles(props);
  const handleChange = (event) => {
    onFieldChange(id, event.target.value)
  };
  const showUnit = 'unit' in props;
  return (
    <FormBoxControl
      title={title}
      className={classes.fieldsetContainer}
      hideBorder={isReadOnly}
    >
      <TextField
        className={clsx(classes.text, className)}
        InputProps={{
          readOnly: isReadOnly,
          endAdornment: showUnit ? (
            <div className={classes.endSeperation}>{unit}</div>
          ) : null
        }}
        classes={{
          root: classes.input
        }}
        value={value}
        onChange={handleChange}
        {...others}
      />
      <div></div>
    </FormBoxControl>
  );
}
