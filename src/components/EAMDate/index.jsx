import { makeStyles } from "@material-ui/styles";
import { convertUtcToTimezone } from "../../utils/date";
import { useMemo } from "react";
import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from "moment";
import FormBoxControl from "../Form/FormBoxControl";
import CalenderIcon from "../../assets/Icons/CalenderIcon";

const useStyles = makeStyles({
  datePicker: {
    border: 0,
    width: '100%',
    marginTop: 9,
    marginBottom: 12,
    '& > div > input': {
      fontSize: 13,
      fontWeight: 400,
      lineHeight: '16px',
      color: '#33415C',
    }
  },
  root: {
    color: 'red',
    '& > button': {
      padding: '0px !important',
    }
  }
})
export default function EAMDate({ id, title, value, onFieldChange }) {

  const handleChange = (date) => {
    const formattedDate = convertUtcToTimezone({
      date,
      dateFormat: 'YYYY-MM-DD',
      isDateOnly: true,
    });
    onFieldChange(id, formattedDate);
  };

  const valueToDisplay = useMemo(() => {
    if (value)
      return moment(value, 'YYYY-MM-DD').toDate()
    return new Date();
  }, [value])

  const oldDate = useMemo(() => {
    return moment().subtract(1, "year");
  }, [])

  const classes = useStyles();
  return (
    <FormBoxControl
      title={title}
    >
      <KeyboardDatePicker
        InputAdornmentProps={{
          classes: {
            root: classes.root
          }
        }}
        keyboardIcon={<CalenderIcon />}
        className={classes.datePicker}
        // clearable
        value={valueToDisplay}
        placeholder="10/10/2018"
        onChange={handleChange}
        minDate={oldDate}
        format="dd/MM/yyyy"
      />
    </FormBoxControl>
  )
}