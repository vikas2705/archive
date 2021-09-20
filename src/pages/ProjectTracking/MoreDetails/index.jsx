import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TabContainer from "../../../components/TabContainer";
import { useHistory } from "react-router";

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
    minHeight: "70px",
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
  subHeading: {
    color: "#979DAC",
    fontSize: "12px",
    lineHeight: "20px",
    marginTop: "24px",
  },
  values: {
    marginTop: "4px",
    fontWeight: "bold",
    fontSize: "13px",
    lineHeight: "20px",
    color: "#33415C",
  },
  wrap: {
    margin: "0 12px",
    overflow: "auto",
  },
  wrap2: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  card: {
    minHeight: "90px",
    backgroundColor: "#F7F9FB",
    marginTop: "4px",
    padding: "13px 18px",
  },
  title1: {
    fontSize: "12px",
    lineHeight: "14px",
    color: "#33415C",
    fontWeight: "600",
  },
  title2: {
    fontSize: "12px",
    lineHeight: "14px",
    color: "#33415C",
    marginLeft: "5px",
  },
  body: {
    fontSize: "12px",
    lineHeight: "20px",
    color: "#7D8597",
    marginTop: "8px",
  },
  footer: {
    fontSize: "12px",
    lineHeight: "14px",
    color: "#7D8597",
    marginTop: "8px",
  },
  wrap3: {
    display: "flex",
  },
});

const MD_TABS = {
  GENERAL: "GENERAL",
  REF_DOC: "REF_DOC",
  GANTT: "GANTT",
};

const genData = [
  {
    index: 1,
    title: "General",
    type: MD_TABS.GENERAL,
    active: true,
  },
  {
    index: 2,
    title: "Ref. Doc.",
    type: MD_TABS.REF_DOCS,
  },
  {
    index: 3,
    title: "Gantt",
    type: MD_TABS.GANTT,
  },
];

const refDocData = [
  {
    index: 1,
    title: "PO/1002",
    subtitle: "Purchase Order",
    name: "HEWLETT PACKARD",
    footer: "3 Jul 2021 | General | Fresh",
  },
  {
    index: 2,
    title: "PO/1002",
    subtitle: "Purchase Order",
    name: "HEWLETT PACKARD",
    footer: "3 Jul 2021 | General | Fresh",
  },
  {
    index: 3,
    title: "PO/1002",
    subtitle: "Purchase Order",
    name: "HEWLETT PACKARD",
    footer: "3 Jul 2021 | General | Fresh",
  },
  {
    index: 4,
    title: "PO/1002",
    subtitle: "Purchase Order",
    name: "HEWLETT PACKARD",
    footer: "3 Jul 2021 | General | Fresh",
  },
];

export default function MoreDetails(props) {
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
          <div className={classes.taskDetails}>Project Details</div>
          <div className={classes.cross} onClick={history.goBack}>
            X
          </div>
        </div>
        <hr className={classes.hr} />
        <div className={classes.container}>
          <div className={classes.taskTitle}>Batemans Bay Bridge THP</div>
          <div className={classes.subTitle}>PJ/0005/21</div>
        </div>
        <TabContainer
          tabsData={genData}
          activeTab={activeTab}
          onChange={onTabChange}
          showCount={false}
        />
        {activeTab === 1 ? (
          <div className={classes.wrap}>
            <div className={classes.subHeading}>Project Type</div>
            <div className={classes.values}>Billable</div>
            <div className={classes.subHeading}>Project Definition</div>
            <div className={classes.values}>Construction</div>
            <div className={classes.subHeading}>Project Category</div>
            <div className={classes.values}>Big</div>
            <div className={classes.subHeading}>Project Manager</div>
            <div className={classes.values}>John Doe</div>
            <div className={classes.subHeading}>Plan Date</div>
            <div className={classes.values}>20/07/2021 - 20/09/2021</div>
            <div className={classes.subHeading}>Actual Date</div>
            <div className={classes.values}>20/07/2021 - 20/09/2021</div>
          </div>
        ) : null}

        {activeTab === 2 ? (
          <>
            <div className={classes.wrap2}>
              {refDocData.map((item) => (
                <div className={classes.card}>
                  <div className={classes.wrap3}>
                    <div className={classes.title1}>{item.title}</div>
                    <div className={classes.title2}>{item.subtitle}</div>
                  </div>
                  <div className={classes.body}>{item.name}</div>
                  <div className={classes.footer}>{item.footer}</div>
                </div>
              ))}
            </div>
          </>
        ) : null}
        {activeTab === 3 ? <></> : null}
      </div>
    </>
  );
}
