import react, { useState } from "react";
import FullScreenDialog from "../../../components/FullScreenDialog";
import { makeStyles } from "@material-ui/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import avatar from "./avatarImage.png";
import { useHistory, useLocation } from "react-router";

const useStyles = makeStyles({
    container: {
        "& .MuiTimelineItem-missingOppositeContent:before": {
            padding: 0,
        },
        "& span.MuiTimelineDot-root": {
            padding: 1,
        },
        "& .MuiTimelineConnector-root": {
            width: 1,
        },
    },
    status: {
        color: "#FFA800",
        paddingBottom: "10px",
        fontWeight: "700",
        fontSize: "12px",
    },
    contentWrapper: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        marginBottom: 10,
    },
    cardWrapper: {
        width: "80vw",
        height: "54px",
        background: "#F7F9FB",
        border: "1px solid #E9EBEF",
        boxSizing: "border-box",
        borderRadius: "3px",
        boxShadow: "none",
    },
    cardContent: {
        display: "flex",
        padding: 5,
    },
    userName: {
        paddingLeft: "20px",
        color: "#33415C",
        fontSize: "12px",
        fontWeight: "700",
    },
    description: {
        paddingLeft: "20px",
        color: "#33415C",
        fontSize: "12px",
        fontWeight: "400",
    },
    levelSection: {
        display: "flex",
        justifyContent: "space-between",
    },
    level: {
        fontSize: "12px",
        color: "#33415C",
        fontWeight: "700",
    },
});

const mockData = [
    {
        level: "Level 1",
        status: "Pending",
        avatarImage: avatar,
        userName: "John Doe",
        description: "Approval Remarks",
    },
    {
        level: "Level 2",
        status: "Pending",
        avatarImage: avatar,
        userName: "Apple Doe",
        description: "Approval Remarks",
    },
];

const timeLineContentRenderer = (item, classes) => {
    const { avatarImage, description, level, status, userName } = item;
    return (
        <TimelineItem>
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent className={classes.contentWrapper}>
                <div className={classes.levelSection}>
                    <div className={classes.level}>{level}</div>
                    <div className={classes.status}>{status}</div>
                </div>
                <div>
                    <Card className={classes.cardWrapper}>
                        <CardContent className={classes.cardContent}>
                            <Avatar src={avatarImage}></Avatar>
                            <div>
                                <Typography className={classes.userName}>
                                    {userName}
                                </Typography>
                                <Typography className={classes.description}>
                                    {description}
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </TimelineContent>
        </TimelineItem>
    );
};

export default function ApprovalHistory() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [openHistory, setOpenHistory] = useState(true);

    const handleCloseHistory = () => {
        const loc = location.pathname;
        const newLoc = loc.replace("/history", "");
        history.push(newLoc);
    };

    return (
        <>
            <FullScreenDialog
                modalTitle='RPT/ID/2021/105 - Approval History'
                open={openHistory}
                modalContent={
                    <div className={classes.container}>
                        <Timeline>
                            {mockData.map(item =>
                                timeLineContentRenderer(item, classes)
                            )}
                        </Timeline>
                    </div>
                }
                onClose={handleCloseHistory}
                borderHeader
            />
        </>
    );
}
