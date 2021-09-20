import { makeStyles } from "@material-ui/core";
import YellowInfoIcon from "../../../../assets/Icons/YellowInfoIcon";

const useStyles = makeStyles({
  card: {
    minHeight: "90px",
    backgroundColor: "#FFFFFF",
    borderRadius: "2px",
    margin: "4px 4px 0 4px",
    padding: "11px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "22px",
    color: "#33415C",
  },
  comp: {
    backgroundColor: "#E01E37",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "3px 8px",
    borderRadius: "4px",
    color: "#FFFFFF",
    fontSize: "12px",
    lineHeight: "14px",
  },
  date: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "11px",
    lineHeight: "20px",
    color: "#5C677D",
    marginTop: "3px",
  },
  footer: {
    fontStyle: "italic",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "20px",
    color: "#5C677D",
    marginTop: "2px",
  },
  identifiedTasks: {
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: "12px",
    lineHeight: "22px",
    color: "#33415C",
    display: "flex",
    marginTop: "2px",
    "& > svg": {
      margin: "auto 0",
      marginRight: "4px",
    },
    "& > div": {
      margin: "auto 0",
    },
  },
});

export default function ProjectCard({
  onClick,
  title,
  comp,
  date,
  footer,
  identifiedTasks,
}) {
  const classes = useStyles();

  return (
    <div className={classes.card} onClick={onClick}>
      <div className={classes.header}>
        <div className={classes.title}>{title}</div>
        {comp ? (
          <div className={classes.comp}>
            <div>{comp}</div>
          </div>
        ) : null}
      </div>
      <div className={classes.date}>{date}</div>
      <div className={classes.footer}>{footer}</div>
      {identifiedTasks ? (
        <div className={classes.identifiedTasks}>
          <YellowInfoIcon />
          <div>{`${identifiedTasks} Identified tasks for progress update`}</div>
        </div>
      ) : null}
    </div>
  );
}
