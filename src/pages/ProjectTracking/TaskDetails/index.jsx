import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TabContainer from "../../../components/TabContainer";
import { useHistory } from "react-router";
import ApprovedIcon from "../../../assets/Icons/ApprovedIcon";
import PendingIcon from "../../../assets/Icons/PendingIcon";
const useStyles = makeStyles({
  root: {
    padding: "0 12px",
  },
  hr: {
    color: "#C9CDD6",
    border: "1px solid",
    margin: "0",
  },
  hr2: {
    color: "#F0F0F0",
    border: "1px solid",
    margin: "0 12px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    margin: "16px 3px",
  },
  taskDetails: {
    color: "#33415C",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "22px",
  },
  cross: {
    backgroundColor: "#33415C",
    padding: "1px 5px",
    borderRadius: "2px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#E1F0FF",
    minHeight: "66px",
    padding: "12px",
    marginTop: "10px",
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "17px",
    color: "#33415C",
  },
  subTitle: {
    fontSize: "12px",
    lineHeight: "14px",
    color: "#5C677D",
    marginTop: "7px",
  },
  wrap: {
    margin: "24px 12px",
  },
  plannedDateOuter: {
    display: "flex",
    justifyContent: "space-between",
  },
  actualDateOuter: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "19px",
  },
  dateHeading: {
    color: "#979DAC",
    fontSize: "12px",
    lineHeight: "20px",
  },
  date: {
    color: "#33415C",
    fontWeight: "500",
    fontSize: "13px",
    lineHeight: "20px",
    marginTop: "4px",
  },
  qtyOuter: {
    display: "flex",
    justifyContent: "space-between",
    marginRight: "30px",
  },
  qtyHeading: {
    color: "#979DAC",
    fontSize: "12px",
    lineHeight: "20px",
    display: "flex",
    justifyContent: "center",
  },
  qty: {
    fontWeight: "bold",
    fontSize: "13px",
    lineHeight: "20px",
    color: "#33415C",
    marginTop: "4px",
    display: "flex",
    justifyContent: "center",
  },
  wrap2: {
    overflow: "auto",
  },

  wrap3: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "auto",
  },
  card2: {
    minHeight: "60px",
    backgroundColor: "#F7F9FB",
    borderRadius: "2px",
    margin: "4px 4px 0 4px",
    padding: "12px 16px",
  },
  wrap4: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardHeading2: {
    color: "#33415C",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "14px",
  },
  cardBody2: {
    marginTop: "8px",
    color: "#7D8597",
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
  qty2: {
    fontWeight: "bold",
    fontSize: "12px",
    color: "#33415C",
  },
});

const TD_TABS = {
  GEN_DETAILS: "GEN_DETAILS",
  PROGRESS_HISTORY: "PROGRESS_HISTORY",
};

const tabsData = [
  {
    index: 1,
    title: "General Details",
    type: TD_TABS.GEN_DETAILS,
    active: true,
  },
  {
    index: 2,
    title: "Progress History",
    type: TD_TABS.PROGRESS_HISTORY,
  },
];

const reportingData = [
  {
    index: 1,
    title: "RPT/ID/2021/101",
    date: "3 Jul 2021",
    status: "Approved",
    qty: "10",
  },
  {
    index: 2,
    title: "RPT/ID/2021/101",
    date: "3 Jul 2021",
    status: "Approved",
    qty: "25",
  },
  {
    index: 3,
    title: "RPT/ID/2021/101",
    date: "3 Jul 2021",
    status: "Approved",
    qty: "48",
  },
  {
    index: 4,
    title: "RPT/ID/2021/101",
    date: "3 Jul 2021",
    status: "Pending",
    qty: "65",
  },
];
export default function TaskDetails(props) {
  const classes = useStyles();
  const history = useHistory();

  const [activeTab, setActiveTab] = useState(1);
  const onTabChange = (index) => {
    setActiveTab(index);
  };
  return (
    <>
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.taskDetails}>Task Details</div>
          <div className={classes.cross} onClick={history.goBack}>
            X
          </div>
        </div>
        <hr className={classes.hr} />
        <div className={classes.container}>
          <div className={classes.taskTitle}>Steel Work</div>
          <div className={classes.subTitle}>1.1.2 | Ground Floor</div>
        </div>
        <TabContainer
          tabsData={tabsData}
          activeTab={activeTab}
          onChange={onTabChange}
          showCount={false}
        />
        {activeTab === 1 ? (
          <div className={classes.wrap2}>
            <div className={classes.wrap}>
              <div className={classes.plannedDateOuter}>
                <div>
                  <div className={classes.dateHeading}>
                    Planned Start Date & Time
                  </div>
                  <div className={classes.date}>01/07/2021 - 11:00:00</div>
                </div>
                <div>
                  <div className={classes.dateHeading}>
                    Planned End Date & Time
                  </div>
                  <div className={classes.date}>31/07/2021 - 11:00:00</div>
                </div>
              </div>
              <div className={classes.actualDateOuter}>
                <div>
                  <div className={classes.dateHeading}>
                    Actual Start Date & Time
                  </div>
                  <div className={classes.date}>01/07/2021 - 11:00:00</div>
                </div>
                <div>
                  <div className={classes.dateHeading}>
                    Actual End Date & Time
                  </div>
                  <div className={classes.date}>-</div>
                </div>
              </div>
            </div>
            <hr className={classes.hr2} />
            <div className={classes.wrap}>
              <div className={classes.qtyOuter}>
                <div>
                  <div className={classes.qtyHeading}>Output Qty.</div>
                  <div className={classes.qty}>65</div>
                </div>
                <div>
                  <div className={classes.qtyHeading}>Balance Qty.</div>
                  <div className={classes.qty}>
                    <span style={{ color: "#FFA800" }}>35</span>
                  </div>
                </div>
                <div>
                  <div className={classes.qtyHeading}>UOM</div>
                  <div className={classes.qty}>Quintal</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.wrap3}>
            {reportingData.map((item) => (
              <div className={classes.card2}>
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

                <div className={classes.cardBody2}>
                  {`${item.date} | Output Qty. `}
                  <span className={classes.qty2}>{item.qty} Quintal</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
