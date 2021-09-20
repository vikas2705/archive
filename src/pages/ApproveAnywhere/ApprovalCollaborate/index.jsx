import react, { useState } from "react";
import FullScreenDialog from "../../../components/FullScreenDialog";
import { makeStyles } from "@material-ui/styles";
import { useHistory, useLocation } from "react-router";

const useStyles = makeStyles({
    container: {
        "& .MuiTimelineItem-missingOppositeContent:before": {
            padding: "0px",
        },
    },
});

export default function ApprovalCollaborate() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [openHistory, setOpenHistory] = useState(true);
    const handleCloseHistory = () => {
        const loc = location.pathname;
        const newLoc = loc.replace("/collaborate", "");
        history.push(newLoc);
    };

    return (
        <>
            <FullScreenDialog
                modalTitle='RPT/ID/2021/105 - Collaborate'
                open={openHistory}
                modalContent={
                    <div className={classes.container}>
                        Approval collaborate content here
                    </div>
                }
                onClose={handleCloseHistory}
                borderHeader
            />
        </>
    );
}
