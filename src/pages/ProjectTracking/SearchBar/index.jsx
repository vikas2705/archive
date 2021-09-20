import React from "react";
import { makeStyles } from "@material-ui/core";
import SearchBlueIcon from "../../../assets/Icons/SearchBlueIcon";
import SortIcon from "../../../assets/Icons/SortIcon";
import GenieImg from "../../../assets/img/Genie.png";
import ToggleChecklist from "../../../assets/Icons/ToggleChecklist";
const useStyles = makeStyles({
  searchBar: {
    minHeight: "38px",
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #C9CDD6",
    padding: "6px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
  left: {
    display: "flex",
  },
  toggleChecklist: {
    height: "fit-content",
    margin: "auto 0",
    marginRight: "5px",
  },
  totalTask: {
    fontSize: "13px",
    lineHeight: "20px",
    color: "#33415C",
    margin: "auto 0",
    marginLeft: "5px",
  },
  totalTaskNo: {
    fontWeight: "900",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#33415C",
    margin: "auto 0",
    marginLeft: "4px",
  },
  right: {
    display: "flex",
  },
  searchBlueIcon: {
    margin: "auto 0",
  },
  sortIcon: {
    margin: "auto 0",
    marginLeft: "16px",
  },
});
export default function SearchBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.searchBar}>
      <div className={classes.left}>
        {props.toggle === true ? (
          <div className={classes.toggleChecklist}>
            <ToggleChecklist />
          </div>
        ) : null}
        <div className={classes.totalTask}>Total {props.title}</div>
        <span className={classes.totalTaskNo}>{props.number}</span>
      </div>
      <div className={classes.right}>
        <div className={classes.searchBlueIcon}>
          <SearchBlueIcon />
        </div>
        <div className={classes.sortIcon}>
          <SortIcon />
        </div>
        {props.genie === true ? (
          <img
            alt="GenieImg"
            src={GenieImg}
            style={{ margin: "auto 0", marginLeft: "16px" }}
          ></img>
        ) : null}
      </div>
    </div>
  );
}
