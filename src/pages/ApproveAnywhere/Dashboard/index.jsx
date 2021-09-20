import React, { useState } from "react";
import PageHeader from "../../../components/PageHeader";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { useHistory, useLocation } from "react-router";
import EAMTabs from "../../../components/EAMTabs";
import Spinner from "../../../components/Spinner";
import EAMGridView from "../../../components/EAMGridView";

const useStyles = makeStyles({
  tabs: {
    '& > div': {
      justifyContent: 'space-around',
    }
  },
  wrapper: {
    padding: 15,
    background: '#e5e5e599',
    flex: 1,
    '& > div': {
      background: '#FFFFFF',
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.05)',
      borderRadius: 10,
    }
  },
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }
});

const countArr = [
  { circlecolor: '#0073E6', tabdata: 'Issues', tabvalue: '8' },
  { circlecolor: '#00AE50', tabdata: 'Receipts', tabvalue: '10' },
  { circlecolor: '#CC4A00', tabdata: 'Returns', tabvalue: '10' },
  { circlecolor: '#FF3333', tabdata: 'Discrepancies', tabvalue: '15' },
  { circlecolor: '#8773FF', tabdata: 'Std. Cost Revaluation', tabvalue: '20' },
  { circlecolor: '#007435', tabdata: 'Stk Transfers', tabvalue: '100' },
  { circlecolor: '#0073E6', tabdata: 'Material Requests', tabvalue: '35' },
  { circlecolor: '#DD9200', tabdata: 'Product Conversion', tabvalue: '10' },
]
const tabsData = [
  { label: 'Today' },
  { label: '2-7 days old' },
  { label: '> 7 days old' },
]
export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <div className={classes.root}>
      <PageHeader title="Approve Anywhere" showNav />
      <EAMTabs
        classes={{
          scroller: classes.tabs
        }}
        tabsData={tabsData} value={activeTabIndex} onChange={(event, ind) => {
          setActiveTabIndex(ind);
        }} />
      <div className={classes.wrapper}>
        {countArr?.length ? (
          <EAMGridView
            variant="colored"
            keyProp="tabdata"
            value={countArr}
            onClick={() => {
              history.push(`${location.pathname}/list`);
            }}
          />
        ) : <Spinner speed={0.5} className={classes.spinner} type="moon" size={100} />}
      </div>
    </div>
  );
}
