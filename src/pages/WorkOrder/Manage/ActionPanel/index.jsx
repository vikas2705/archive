import { makeStyles } from "@material-ui/styles";
import { Button } from "@sencha/ext-react-modern";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../../actions";
import EAMButton from "../../../../components/EAMButton";
import { selectors } from "../../../../reducers";

const useStyles = makeStyles({
  submitBtnWrapper: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    "& .x-button-raised.x-button": {
      height: 46,
      width: "100%",
    },
    "& .x-button.x-has-text .x-text-el": {
      color: "#ffffff",
      textTransform: "capitalize",
      fontWeight: "700",
    },
  },
  submitBtn: {
    width: '100%',
    minWidth: 380,
    margin: 'auto'
  }
})

export default function ActionPanel(props) {
  const dispatch = useDispatch();
  const saveStatus = useSelector(state => selectors.workOrder(state).saveStatus);
  const handleSubmitClick = useCallback(
    () => {
      dispatch(actions.workOrder.update.save());
    },
    [dispatch],
  )
  const isSaveInProgress = saveStatus === 'saving';
  const classes = useStyles();
  return (
    <div className={classes.submitBtnWrapper}>
        <EAMButton
          className={classes.submitBtn}
          disabled={isSaveInProgress}
          onClick={handleSubmitClick}
        >
          {isSaveInProgress ? 'Saving...' : 'Submit'}
        </EAMButton>
    </div>
  )
}