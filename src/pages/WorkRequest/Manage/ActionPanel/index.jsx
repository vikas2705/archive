import { makeStyles } from "@material-ui/styles";
import { Button } from "@sencha/ext-react-modern";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../../actions";
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
    submitBtn:{
        minWidth: 380,
        margin: 'auto'
    }
})

export default function ActionPanel(props){
    const dispatch = useDispatch();
    const saveStatus = useSelector(state => selectors.workflow(state).saveStatus);
    const handleSubmitClick = useCallback(
        () => {
            dispatch(actions.workflow.update.save());
        },
        [dispatch],
    )
    const isSaveInProgress = saveStatus === 'saving' ;
    const classes = useStyles();
    return (
        <div className={classes.submitBtnWrapper}>
            <div className={classes.submitBtn}>
                <Button
                    ui='action raised' 
                    enableToggle 
                    disabled={isSaveInProgress}
                    text={isSaveInProgress ? 'Saving...': 'Submit'}
                    handler={handleSubmitClick}
                 />
            </div>
        </div>
    )
}