import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MinusBlueIcon from "../../../../../assets/Icons/MinusBlueIcon";
import PlusBlueIcon from "../../../../../assets/Icons/PlusBlueIcon";

const useStyles = makeStyles({
  text: {
    background: '#FFFFFF',
/* Text/Grey5 */
  border: '1px solid #C9CDD6',
  boxSizing: 'border-box',
  borderRadius: 5,
  marginLeft: 5,
  marginRight: 5,
  // width: 100,
  },
  label: {
    color: '#979DAC',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 9,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    '& > svg': {
      width: 45,
      height: 30,
    }
  }
})
export default function QuantityField({title}) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.label}>
          {title}
      </div>
      <div className={classes.wrapper}>
        <PlusBlueIcon />
        <TextField className={classes.text}/>
        <MinusBlueIcon />


      </div>
    </div>
  )
}