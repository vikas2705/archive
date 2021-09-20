import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    textWrapper: {},
    dot: {},
    text: {
        color: "#33415C",
        fontWeight: "bold",
        fontSize: 13,
    },
    name: {
        color: "#5C677D",
        fontSize: 13,
    },
    date: {
        color: "#979DAC",
        fontSize: 11,
    },
    timeline: {},
    timelineItem: {
        minHeight: 90,
        "&::before": {
            display: "none",
        },
    },
    paper: {},
    hideSeperator: {
        "& >span:last-child": {
            display: "none",
        },
    },
    iconWrapper: {
        backgroundColor: "transparent",
        boxShadow: "unset",
        padding: 0,
        margin: 0,
        // width: 23,
        "& > *": {
            display: "flex",
            width: 34,
            height: 35,
            // padding: 5,
            borderRadius: "50%",
        },
        "& > *:before": {
            fontSize: 18,
            margin: "auto",
        },
        "& > .icon-AP": {
            background: "#1BC54E",
            "&::before": {
                content: '"\\101a"',
            },
        },
        "& > .icon-C": {
            background: "#E01E37",
            "&::before": {
                content: '"\\101b"',
            },
        },
        "& > .icon-CL": {
            background: "#7D8597",
            ":before": {
                content: '"\\101c"',
            },
        },
        "& > .icon-CR": {
            background: "#0073E6",
            "&::before": {
                content: '"\\101d"',
            },
        },
        "& > .icon-FWT": {
            background: "#8773FF",
            "&::before": {
                content: '"\\101e"',
            },
        },
        "& > .icon-M": {
            background: "darkblue",
            "&::before": {
                content: '"\\101f"',
            },
        },
        "& > .icon-RJ": {
            background: "#FF5C00",
            "&::before": {
                content: '"\\1020"',
            },
        },
        "& > .icon-SC": {
            background: "#FF5C00",
            "&::before": {
                content: '"\\1020"',
            },
        },
        "& > .icon-IN": {
            background: "#FF5C00",
            "&::before": {
                content: '"\\1020"',
            },
        },
        "& > .icon-R": {
            background: "darkgoldenrod",
            "&::before": {
                content: '"\\1021"',
            },
        },
        "& > .icon-APWO": {
            background: "#1BC54E",
            "&::before": {
                content: '"\\101a"',
            },
        },
        "& > .icon-CM": {
            background: "#1BC54E",
            "&::before": {
                content: '"\\101a"',
            },
        },
        "& > .icon-CHECK": {
            background: "#1BC54E",
            "&::before": {
                content: '"\\2714"',
            },
        },
        "& > .icon-PENCIL": {
            background: "#0073E6;",
            "&::before": {
                content: '"\\270E"',
            },
        },
    },
});

const TimelineText = ({ text, name, date }) => {
    const classes = useStyles();
    return (
        <div className={classes.textWrapper}>
            <Typography variant='h6' className={classes.text}>
                {text}
            </Typography>
            <Typography variant='h6' className={classes.name}>
                {name}
            </Typography>
            <Typography variant='h6' className={classes.date}>
                {date}
            </Typography>
        </div>
    );
};

export default function EAMTimeline({ value }) {
    const classes = useStyles();
    return (
        <>
            <Timeline className={classes.timeline} align='left'>
                {value.map((item, ind) => (
                    <TimelineItem
                        key={`${item.date}-${ind}`}
                        className={classes.timelineItem}
                    >
                        <TimelineSeparator
                            className={clsx({
                                [classes.hideSeperator]:
                                    value.length - 1 === ind,
                            })}
                        >
                            <TimelineDot className={classes.iconWrapper}>
                                <span
                                    className={`icon-${item.iconcode}`}
                                ></span>
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <TimelineText
                                text={item.HistoryTitle}
                                name={item.username}
                                date={item.date}
                            />
                            {item.child ? (
                                <EAMTimeline value={item.child} />
                            ) : null}
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </>
    );
}
