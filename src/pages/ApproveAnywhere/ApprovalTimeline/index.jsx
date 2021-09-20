import react, { useState } from "react";
import FullScreenDialog from "../../../components/FullScreenDialog";
import { makeStyles } from "@material-ui/styles";
import { useHistory, useLocation } from "react-router";
import EAMTimeline from "../../../components/EAMTimeline";

const useStyles = makeStyles({
    container: {
        "& .MuiTimelineItem-missingOppositeContent:before": {
            padding: "0px",
        },
    },
});
const timeline = [
    {
        date: "21/10/2021",
        username: "John",
        HistoryTitle: "XYZ",
        iconcode: "PENCIL",
    },
    {
        date: "21/10/2021",
        username: "John",
        HistoryTitle: "PQR",
        iconcode: "CHECK",
    },
    {
        date: "21/10/2021",
        username: "John",
        HistoryTitle: "ABC",
        iconcode: "PENCIL",
    },
    {
        date: "21/10/2021",
        username: "John",
        HistoryTitle: "PQR",
        iconcode: "CHECK",
    },
    {
        date: "21/10/2021",
        username: "John",
        HistoryTitle: "ABC",
        iconcode: "PENCIL",
    },
    {
        date: "21/10/2021",
        username: "John",
        HistoryTitle: "ABC",
        iconcode: "CHECK",
    },
];

export default function ApprovalHistory() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [openHistory, setOpenHistory] = useState(true);
    const handleCloseHistory = () => {
        const loc = location.pathname;
        const newLoc = loc.replace("/timeline", "");
        history.push(newLoc);
    };

    return (
        <>
            <FullScreenDialog
                modalTitle='RPT/ID/2021/105 - Timeline'
                open={openHistory}
                modalContent={
                    <div className={classes.container}>
                        <EAMTimeline value={timeline} />
                    </div>
                }
                onClose={handleCloseHistory}
                borderHeader
            />
        </>
    );
}
