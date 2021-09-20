import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TabContainer from "../../../components/TabContainer";
import LessThanIcon from "../../../assets/Icons/LessThanIcon";
import MessegeIcon from "../../../assets/Icons/MessegeIcon";
import InfoIcon from "../../../assets/Icons/InfoIcon";
import IconButton from "../../../components/IconButton";
import { useHistory, useLocation } from "react-router";
import ApprovedIcon from "../../../assets/Icons/ApprovedIcon";
import SearchBar from "../SearchBar";
import PendingIcon from "../../../assets/Icons/PendingIcon";

const useStyles = makeStyles({
  header: {
    height: "120px",
    backgroundColor: "#E1F0FF",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
    borderBottom: "1px solid rgba(0, 115, 230, 0.3);",
    padding: "15px 16px 15px 46px",
  },
  lessThanIcon: {
    position: "absolute",
    left: "11px",
    top: "10px",
    width: "32px",
    height: "32px",
    cursor: "pointer",
  },
  messegeIcon: {
    position: "absolute",
    left: "85%",
    right: "9.44%",
    top: "9.69%",
    bottom: "87.19%",
  },
  messegeIconNo: {
    position: "relative",
    bottom: "34px",
    right: "-11px",
    color: "white",
    background: "#FF5C00",
    boxShadow: "0px 8px 10px rgb(2 62 125 / 20%)",
    padding: "2px 6px 2px 6px",
    borderRadius: "11px",
  },
  title: {
    fontWeight: "bold",
    fontSize: "15px",
    lineHeight: "22px",
    color: "#33415C",
  },
  headingWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  comp: {
    height: "18px",
    backgroundColor: "#1BC54E",
    padding: "3px 8px",
    borderRadius: "4px",
    color: "#FFFFFF",
    fontSize: "12px",
    lineHeight: "14px",
    display: "flex",
    alignItems: "center",
  },
  date: {
    fontWeight: "500",
    fontSize: "11px",
    lineHeight: "20px",
    color: "#33415C",
    marginTop: "7px",
  },
  subtitle: {
    marginTop: "3px",
    fontSize: "12px",
    lineHeight: "20px",
    color: "#33415C",
    fontStyle: "italic",
  },
  moreDetails: {
    color: "#0073E6",
    display: "flex",
    marginTop: "7px",
    "& > svg": {
      height: "10px",
      width: "10px",
      margin: "auto 0",
    },
  },
  moreDetailsText: {
    fontSize: "12px",
    lineHeight: "14px",
    marginLeft: "4px",
    margin: "auto 0",
  },
  searchBar: {
    height: "38px",
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #C9CDD6",
    padding: "6px 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
  left: {
    display: "flex",
  },
  toggleChecklist: {
    height: "fit-content",
    margin: "auto 0",
  },
  totalTask: {
    fontSize: "13px",
    lineHeight: "20px",
    color: "#33415C",
    marginLeft: "10px",
  },
  totalTaskNo: {
    fontWeight: "900",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#33415C",
    marginLeft: "4px",
  },
  right: {
    display: "flex",
  },
  searchBlueIcon: {
    margin: "auto 0",
    marginRight: "16px",
  },
  sortIcon: {
    margin: "auto 0",
    marginRight: "19px",
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
  card2: {
    minHeight: "60px",
    backgroundColor: "#FFFFFF",
    borderRadius: "2px",
    margin: "4px 4px 0 4px",
    padding: "12px 16px",
  },
  cardHeading: {
    color: "#33415C",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "20px",
  },
  cardHeading2: {
    color: "#33415C",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "14px",
  },
  cardBody: {
    marginTop: "4px",
    color: "#5C677D",
    fontSize: "12px",
    lineHeight: "20px",
  },
  cardBody2: {
    marginTop: "8px",
    color: "#5C677D",
    fontSize: "12px",
    lineHeight: "14px",
  },
  status: {
    display: "flex",
  },
  status1: {
    fontWeight: "600",
    marginRight: "3px",
    fontSize: "12px",
    lineHeight: "14px",
    color: "#1BC54E",
    "& > svg": {
      margin: "auto 0",
    },
  },
  status2: {
    fontWeight: "600",
    marginRight: "5px",
    fontSize: "12px",
    lineHeight: "14px",
    color: "#FFA800",
    "& > svg": {
      margin: "auto 0",
    },
  },
  wrap4: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardFooter: {
    marginTop: "4px",
    fontSize: "12px",
    color: "#979DAC",
  },
  wrap2: {
    display: "flex",
  },
  wrap3: {
    display: "flex",
    marginTop: "8px",
  },
  cardBody3: {
    color: "#5C677D",
    fontSize: "12px",
    lineHeight: "14px",
    marginLeft: "4px",
  },
  id: {
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "14px",
    color: "#5C677D",
  },
  date2: {
    color: "#7D8597",
    fontSize: "12px",
    lineHeight: "14px",
    marginLeft: "4px",
  },
});

const PD_TABS = {
  REC_UPDATED: "REC_UPDATED",
  TO_DO: "TO_DO",
  ALL_PROJECT: "ALL_PROJECT",
};

const tabsData = [
  {
    index: 1,
    title: "Task List",
    type: PD_TABS.REC_UPDATED,
    active: true,
  },
  {
    index: 2,
    type: PD_TABS.TO_DO,
    title: "Reporting",
  },
  {
    index: 3,
    type: PD_TABS.ALL_PROJECT,
    title: "Orders",
  },
];

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

const reportingData = [
  {
    index: 1,
    title: "RPT/ID/2021/101",
    date: "3 Jul 2021",
    status: "Approved",
  },
  {
    index: 2,
    title: "RPT/ID/2021/101",
    date: "3 Jul 2021",
    status: "Approved",
  },
  {
    index: 3,
    title: "RPT/ID/2021/101",
    date: "3 Jul 2021",
    status: "Approved",
  },
  {
    index: 4,
    title: "RPT/ID/2021/101",
    date: "3 Jul 2021",
    status: "Pending",
  },
];

const ordersData = [
  {
    index: 1,
    title: "ORD/002",
    date: "2 Aug 2021",
    id: "US016",
    company: "Nuplex Industries Limited",
  },
  {
    index: 2,
    title: "ORD/002",
    date: "2 Aug 2021",
    id: "US016",
    company: "Nuplex Industries Limited",
  },
  {
    index: 3,
    title: "ORD/002",
    date: "2 Aug 2021",
    id: "US016",
    company: "Nuplex Industries Limited",
  },
  {
    index: 4,
    title: "ORD/002",
    date: "2 Aug 2021",
    id: "US016",
    company: "Nuplex Industries Limited",
  },
];

export default function ProjectDetails(props) {
  const classes = useStyles();
  const location = useLocation();

  const history = useHistory();

  const [activeTab, setActiveTab] = useState(1);
  const onTabChange = (index) => {
    setActiveTab(index);
  };
  const handleMoreDetailClick = () => {
    history.push(`${location.pathname}/detail`);
  };
  const handleTaskClick = () => {
    history.push(`${location.pathname}/tasks`);
  };
  const handleOrderClick = () => {
    history.push(`${location.pathname}/order`);
  };
  return (
    <>
      <div className={classes.header}>
        <div className={classes.lessThanIcon}>
          <IconButton onClick={history.goBack}>
            <LessThanIcon />
          </IconButton>
        </div>
        <div className={classes.messegeIcon}>
          <div>
            <MessegeIcon />
            <span className={classes.messegeIconNo}>3</span>
          </div>
        </div>
        <div className={classes.headingWrapper}>
          <div className={classes.title}>Batemans Bay Bridge THP</div>
          <div className={classes.comp}>
            <p style={{ margin: "0" }}>On-Track</p>
          </div>
        </div>

        <div className={classes.date}>20/ 07/ 2021 - 20/ 09/ 2021</div>
        <div className={classes.subtitle}>Billable | Construction | Big</div>
        <div className={classes.moreDetails} onClick={handleMoreDetailClick}>
          <InfoIcon />
          <div className={classes.moreDetailsText}>More Details</div>
        </div>
      </div>

      <TabContainer
        tabsData={tabsData}
        activeTab={activeTab}
        onChange={onTabChange}
        showCount={false}
      />

      {activeTab === 1 ? (
        <>
          <SearchBar title={"Task"} number={7} toggle={true} genie={true} />

          <div className={classes.wrap}>
            {taskListData.map((item) => (
              <div className={classes.card} onClick={handleTaskClick}>
                <div className={classes.cardHeading}>{item.title}</div>
                <div className={classes.cardBody}>
                  {`${item.index} | ${item.date} | ${item.floor}`}
                </div>
                <div className={classes.cardFooter}>
                  Cmpl. Qty.{" "}
                  <span style={{ color: "#1BC54E" }}>{item.cmpl}</span> | Bal.
                  Qty. <span style={{ color: "#FFA800" }}>{item.bal}</span> |
                  UOM <span style={{ color: "#33415C" }}>{item.uom}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {activeTab === 2 ? (
        <>
          <SearchBar title={"Reports"} number={4} />

          <div className={classes.wrap}>
            {reportingData.map((item) => (
              <div className={classes.card2} onClick={handleTaskClick}>
                <div className={classes.wrap4}>
                  <div className={classes.cardHeading2}>{item.title}</div>
                  <div className={classes.status}>
                    {item.status === "Approved" ? (
                      <>
                        <div className={classes.status1}>{item.status}</div>
                        <ApprovedIcon />
                      </>
                    ) : (
                      <>
                        <div className={classes.status2}>{item.status}</div>
                        <PendingIcon />
                      </>
                    )}
                  </div>
                </div>

                <div className={classes.cardBody2}>{`${item.date}`}</div>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {activeTab === 3 ? (
        <>
          <SearchBar title={"Orders"} number={4} />

          <div className={classes.wrap}>
            {ordersData.map((item) => (
              <div className={classes.card2} onClick={handleOrderClick}>
                <div className={classes.wrap2}>
                  <div className={classes.cardHeading2}>{item.title}</div>
                  <div className={classes.date2}>{`${item.date}`}</div>
                </div>
                <div className={classes.wrap3}>
                  <div className={classes.id}>{item.id}</div>
                  <div className={classes.cardBody3}>{item.company}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
