import { makeStyles } from "@material-ui/styles";
import { useMemo } from "react";
import FormBoxControl from "../Form/FormBoxControl";

const BORDER_COLOR = {
  inProgress: '#FFA800',
  // F: '#FFA800',
  // RJ: 'Rejected'
}
const COLOR = {
  inProgress: '#33415C',
  CL: '#5C677D',
  F: '#5C677D',
  FR: '#5C677D',
  RJ: '#5C677D',
  AP: '#5C677D',
  C: '#5C677D'
}
const BACKGROUND_COLOR = {
  CL: '#AEFFCE',
  F: '#FFA800',
  FR: '#FFA800',
  RJ: '#F6C0C7',
  AP: '#FFA800',
  C: '#F6C0C7'
}
const valueMap = {
  CL: 'WR Closed',
  F: 'Awaiting Action',
  FR: 'Awaiting Action',
  RJ: 'WR Rejected',
  AP: 'Awaiting Action',
  C: 'WR Cancelled'
}
const useStyles = makeStyles({
  status: {
    fontSize: 13,
    lineHeight: '19px',
    fontWeight: 'bold',
    color: props => `${COLOR[props.value]}`,
    display: 'inline-flex',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    border: props => `1px solid ${BORDER_COLOR[props.value]}`,
    borderRadius: 3,
    background: props => `${BACKGROUND_COLOR[props.value]}`,

  },
});

export default function WorkRequestStatus(props) {
  const { title, value } = props;
  const classes = useStyles({ value });
  const formattedText = useMemo(() => {
    if (value === 'inProgress') {
      return 'In Progress'
    }
    return valueMap[value]
  }, [value])
  if (!title) {
    return (
      <div className={classes.status}>
        {formattedText}
      </div>
    )
  }
  return (
    <FormBoxControl
      title={title}
      hideBorder
    >
      <div className={classes.status}>
        {formattedText}
      </div>
    </FormBoxControl>
  );
}
