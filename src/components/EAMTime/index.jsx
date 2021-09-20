import { makeStyles } from "@material-ui/styles";
import { convertUtcToTimezone } from "../../utils/date";
import { KeyboardTimePicker } from '@material-ui/pickers';
import { useMemo } from "react";
import moment from "moment";
import FormBoxControl from "../Form/FormBoxControl";
import ClockIcon from "../../assets/Icons/ClockIcon";

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
export default function EAMTime({ id, title, value, onFieldChange }) {
  const classes = useStyles();
  const handleChange = (newValue) => {
    const formattedDate = convertUtcToTimezone({
      date: newValue,
      dateFormat: 'HH:mm:ss',
      isDateOnly: true,
    });
    onFieldChange(id, formattedDate);
  };

  const inputValue = useMemo(() => {
    if (value)
      return moment(value, 'HH:mm:ss').toDate();
    return new Date();
  }, [value])


  return (
    <FormBoxControl
      title={title}
    >
      <KeyboardTimePicker
        InputAdornmentProps={{
          classes: {
            root: classes.root
          }
        }}
        keyboardIcon={<ClockIcon />}
        className={classes.datePicker}
        showTodayButton
        todayLabel="now"
        value={inputValue}
        minutesStep={5}
        onChange={handleChange}
      />
    </FormBoxControl>
  )
}