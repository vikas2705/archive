import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import PageHeader from "../../../components/PageHeader";
import TabContainer from "../../../components/TabContainer";
import SearchBar from "../SearchBar";
import ProjectCard from "./Card";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  wrap: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#E5E5E5",
    overflow: "auto",
  },
  pageHeader: {
    "& > div": {
      backgroundImage: "none",
      backgroundColor: "#E1F0FF",
      borderBottom: "1px solid rgba(0, 115, 230, 0.3)",
    },
  },
});

const recUpdatedData = [
  {
    index: 1,
    title: "Tank 13 and 15",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Generic | Small",
    comp: "In-Trouble",
  },
  {
    index: 2,
    title: "Batemans Bay Bridge THP",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Construction | Big",
    comp: "On-Track",
  },
  {
    index: 3,
    title: "Batemans Bay - Term Hire",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Construction | Big",
    comp: "At-Risk",
  },
];

const toDoData = [
  {
    index: 1,
    title: "Tank 13 and 15",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Generic | Small",
    comp: "In-Trouble",
    identifiedTasks: "4",
  },
  {
    index: 2,
    title: "Batemans Bay Bridge THP",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Construction | Big",
    comp: "On-Track",
    identifiedTasks: "7",
  },
  {
    index: 3,
    title: "Batemans Bay - Term Hire",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Construction | Big",
    comp: "At-Risk",
    identifiedTasks: "12",
  },
];
const allProjectData = [
  {
    index: 1,
    title: "Willmar Sugar Mills Project",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Generic | Small",
    comp: "In-Trouble",
  },
  {
    index: 2,
    title: "Batemans Bay Bridge THP",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Construction | Big",
    comp: "On-Track",
  },
  {
    index: 3,
    title: "Batemans Bay - Term Hire",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Construction | Big",
    comp: "At-Risk",
  },
  {
    index: 4,
    title: "Tank 13",
    date: "20/ 07/ 2021 - 20/ 09/ 2021",
    footer: "Billable | Construction | Big",
    comp: "At-Risk",
  },
];

const PT_TABS = {
  REC_UPDATED: "PT_INFO",
  TO_DO: "DETAIL",
  ALL_PROJECT: "ATTACHMENT",
};

const tabsData = [
  {
    index: 1,
    title: "Rec. Updated",
    type: PT_TABS.REC_UPDATED,
    active: true,
  },
  {
    index: 2,
    type: PT_TABS.TO_DO,
    title: "To Do",
  },
  {
    index: 3,
    type: PT_TABS.ALL_PROJECT,
    title: "All Project",
  },
];
export default function ProjectTrackingList(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(1);
  const onTabChange = (index) => {
    setActiveTab(index);
  };
  const handleClick = () => {
    history.push(`${location.pathname}/summary`);
  };
  return (
    <>
      <div className={classes.pageHeader}>
        <PageHeader title="Project Tracking" showNav/>
      </div>

      <TabContainer
        tabsData={tabsData}
        activeTab={activeTab}
        onChange={onTabChange}
        showCount={false}
      />
      <div className={classes.wrap}>
        {activeTab === 1
          ? recUpdatedData.map((item) => (
              <ProjectCard {...item} onClick={handleClick} />
            ))
          : null}
        {activeTab === 2
          ? toDoData.map((item) => (
              <ProjectCard {...item} onClick={handleClick} />
            ))
          : null}
        {activeTab === 3 ? (
          <>
            <SearchBar title={""} number={4} />
            {allProjectData.map((item) => (
              <ProjectCard {...item} onClick={handleClick} />
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}
