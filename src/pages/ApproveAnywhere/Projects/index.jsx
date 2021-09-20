import React from "react";
import { makeStyles } from "@material-ui/core";
import LessThanIcon from "../../../assets/Icons/LessThanIcon";
import IconButton from "../../../components/IconButton";
import { useHistory, useLocation } from "react-router";
import SearchBar from "../../ProjectTracking/SearchBar";
import ProjectCard from "../../ProjectTracking/List/Card";
const useStyles = makeStyles({
  header: {
    minHeight: "55px",
    backgroundColor: "#E1F0FF",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
    borderBottom: "1px solid rgba(0, 115, 230, 0.3);",
    padding: "15px 16px 15px 46px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lessThanIcon: {
    position: "absolute",
    left: "11px",
    top: "10px",
    width: "32px",
    height: "32px",
    cursor: "pointer",
  },

  title: {
    fontWeight: "bold",
    fontSize: "15px",
    lineHeight: "18px",
    color: "#33415C",
  },

  wrap: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#E5E5E5",
    overflow: "auto",
  },
});

const projectsData = [
  {
    index: 1,
    title: "Willmar Sugar Mills Project",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Generic | Small",
  },
  {
    index: 2,
    title: "Batemans Bay Bridge THP",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Construction | Big",
  },
  {
    index: 3,
    title: "Batemans Bay - Term Hire",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Construction | Big",
  },
  {
    index: 4,
    title: "Tank 13",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Construction | Big",
  },
  {
    index: 5,
    title: "Willmar Sugar Mills Project",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Generic | Small",
  },
  {
    index: 6,
    title: "Batemans Bay Bridge THP",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Construction | Big",
  },
  {
    index: 7,
    title: "Batemans Bay - Term Hire",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Construction | Big",
  },
  {
    index: 8,
    title: "Tank 13",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Construction | Big",
  },
];

export default function Projects(props) {
  const classes = useStyles();
  const location = useLocation();

  const history = useHistory();
  return (
    <>
      <div className={classes.header}>
        <div className={classes.lessThanIcon}>
          <IconButton onClick={history.goBack}>
            <LessThanIcon />
          </IconButton>
        </div>

        <div className={classes.title}>Projects</div>
      </div>

      <SearchBar title={""} number={12} toggle={true} />
      <div className={classes.wrap}>
        {projectsData.map((item) => (
          <ProjectCard {...item} />
        ))}
      </div>
    </>
  );
}
