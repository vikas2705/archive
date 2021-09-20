import React from "react";
import { makeStyles } from "@material-ui/core";
import LessThanIcon from "../../../assets/Icons/LessThanIcon";
import IconButton from "../../../components/IconButton";
import { useHistory, useLocation } from "react-router";
import SearchBar from "../SearchBar";
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
  comp: {
    height: "18px",
    backgroundColor: "#3B9DFF",
    padding: "3px 8px",
    borderRadius: "4px",
    color: "#FFFFFF",
    fontSize: "12px",
    lineHeight: "14px",
    display: "flex",
    alignItems: "center",
  },
  subHeading: {
    backgroundColor: "#F7F9FB",
  },
  wrap2: {
    margin: "7px 16px",
  },
  subtitle: {
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "20px",
    color: "#33415C",
  },
  date: {
    marginTop: "4px",
    fontSize: "12px",
    lineHeight: "20px",
    color: "#33415C",
  },
  wrap: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#E5E5E5",
    overflow: "auto",
  },
  card: {
    minHeight: "90px",
    backgroundColor: "#FFFFFF",
    borderRadius: "2px",
    margin: "4px 4px 0 4px",
    padding: "13px 17px 11px 17px",
  },
  cardHeading: {
    color: "#33415C",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "20px",
  },
  cardBody: {
    marginTop: "4px",
    color: "#5C677D",
    fontSize: "12px",
    lineHeight: "20px",
  },
  cardFooter: {
    marginTop: "4px",
    fontSize: "12px",
    color: "#979DAC",
  },
});

const taskListData = [
  {
    index: "1.1.1",
    title: "Earth Work",
    date: "3 Jul 2021 - 12 Aug 2021",
    floor: "Ground Floor",
    cmpl: "65",
    bal: "35",
    uom: "M",
  },
  {
    index: "1.1.2",
    title: "Steel Work",
    date: "3 Jul 2021 - 12 Aug 2021",
    floor: "1st Floor",
    cmpl: "65",
    bal: "35",
    uom: "Quintal",
  },
  {
    index: "1.1.3",
    title: "Masonary Work",
    date: "3 Jul 2021 - 12 Aug 2021",
    floor: "1st Floor",
    cmpl: "65",
    bal: "35",
    uom: "M",
  },
  {
    index: "1.1.4",
    title: "Fishing Works",
    date: "3 Jul 2021 - 12 Aug 2021",
    floor: "1st Floor",
    cmpl: "65",
    bal: "35",
    uom: "M",
  },
  {
    index: "1.1.5",
    title: "Electrical Works",
    date: "3 Jul 2021 - 12 Aug 2021",
    floor: "1st Floor",
    cmpl: "65",
    bal: "35",
    uom: "M",
  },
];

export default function OrderDetails(props) {
  const classes = useStyles();
  const location = useLocation();

  const history = useHistory();
  const handleTaskClick = () => {
    history.push(`${location.pathname}/tasks`);
  };
  return (
    <>
      <div className={classes.header}>
        <div className={classes.lessThanIcon}>
          <IconButton onClick={history.goBack}>
            <LessThanIcon />
          </IconButton>
        </div>

        <div className={classes.title}>ORD/002</div>
        <div className={classes.comp}>
          <p style={{ margin: "0" }}>Draft</p>
        </div>
      </div>
      <div className={classes.subHeading}>
        <div className={classes.wrap2}>
          <div className={classes.subtitle}>
            US016 Nuplex Industries Limited
          </div>
          <div className={classes.date}>2 Aug 2021</div>
        </div>
      </div>
      <SearchBar title={"Task"} number={7} toggle={true} />
      <div className={classes.wrap}>
        {taskListData.map((item) => (
          <div className={classes.card} onClick={handleTaskClick}>
            <div className={classes.cardHeading}>{item.title}</div>
            <div className={classes.cardBody}>
              {`${item.index} | ${item.date} | ${item.floor}`}
            </div>
            <div className={classes.cardFooter}>
              Cmpl. Qty. <span style={{ color: "#1BC54E" }}>{item.cmpl}</span> |
              Bal. Qty. <span style={{ color: "#FFA800" }}>{item.bal}</span> |
              UOM <span style={{ color: "#33415C" }}>{item.uom}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
