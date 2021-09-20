import { Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FormBoxControl from "../Form/FormBoxControl";

const useStyles = makeStyles({
  track: {
    backgroundColor:'#0073E6 !important'
  },
  root: {
    // padding: 6,
    // borderRadius: '17%',
    // height: 26,
    // minWidth: 74,
    '& > span': {
      // paddingTop: 0,
      // paddingBottom: 0,
    }
  },
  input:{
      // paddingTop: 3,
      // paddingLeft: 0,
  }
});
export default function EAMSwitch(props) {
  const { id, title, onFieldChange = () => { }, isChecked } = props;
  const classes = useStyles(props);
  const handleChange = (event) => {
    onFieldChange(id, !isChecked)
  };
  return (
    <FormBoxControl
      title={title}
      hideBorder={true}
    >
      <Switch
        checked={isChecked}
        className={classes.root}
        onChange={handleChange}
        color='primary'
        name='checked'
        classes={{
          track: classes.track,
          input: classes.input,
        }}
        // value={isWOComplete}
        inputProps={{
          "aria-label": "primary checkbox",
        }}
      />
    </FormBoxControl>
  );
}
