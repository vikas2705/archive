import { makeStyles } from "@material-ui/styles";
import { convertUtcToTimezone } from "../../utils/date";
import { useMemo } from "react";
import { DateTimePicker } from '@material-ui/pickers';
import moment from "moment";
import FormBoxControl from "../Form/FormBoxControl";
import { IconButton, InputAdornment } from "@material-ui/core";
import CalenderIcon from "../../assets/Icons/CalenderIcon";

const useStyles = makeStyles({
  control: {
    width: '100%',
    paddingBottom: 7,
    paddingTop: 5,
    '& > div': {
      fontSize: 13,
      color: '#33415C',
    }
  },
  endBtn:{
    '& > button': {
      paddingLeft: 0,
      paddingRight: 0,
    }
  }
})
export default function EAMDateTime({ dateId, timeId, title, dateValue, timeValue, onFieldChange }) {
  const classes = useStyles();
  const handleDateChange = (date) => {
    const formattedDate = convertUtcToTimezone({
      date,
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      isDateOnly: true,
    });
    onFieldChange(dateId, formattedDate.split(' ')[0]);
    onFieldChange(timeId, formattedDate.split(' ')[1]);
  };

  const valueToDisplay = useMemo(() => {
    if (dateValue && timeValue)
      return moment(`${dateValue} ${timeValue}`, 'YYYY-MM-DD HH:mm').toDate();
    return new Date();
  }, [dateValue, timeValue])

  const oldDate = useMemo(() => {
    return moment().subtract(1, "year");
  }, [])
  return (
    <FormBoxControl
      title={title}
    >
      <DateTimePicker
        // autoOk
        ampm={false}
        className={classes.control}
        disableFuture
        value={valueToDisplay}
        minDate={oldDate}
        onChange={handleDateChange}
        format="dd/MM/yyyy - hh:mm a"
        InputProps={{
          endAdornment: (
            <InputAdornment className={classes.endBtn} position="end">
              <IconButton>
                <CalenderIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormBoxControl>
  )
}