
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import '../../../resources/css/workRequest/dashboard.css';
import { GETCOUNTBYSTS } from '../../../queries/workRequest/getCountBySts';
import { FILTERMETADATA } from '../../../queries/workRequest/filterMetaData';
import DashboardShimmer from './dashboardShimmer';
import PageHeader from '../../../components/PageHeader';
import EAMGridView from '../../../components/EAMGridView';
import { makeStyles } from '@material-ui/styles';
import EAMExpandButton from '../../../components/EAMExpandButton';
import actions from "../../../actions";
import { useLazyQuery } from "@apollo/react-hooks";
import EAMSelect from '../../../components/EAMSelect';

const Ext = window.Ext;

function Dashboard() {

  const refreshContext = useSelector(state => state.workrequest.refreshContext || false, shallowEqual),
    wrkReqMetadata = useSelector(state => state.workrequest.wrkReqMetadata || {}, shallowEqual),
    countBySts = useSelector(state => state.workrequest.countBySts || {}, shallowEqual);

  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [value, setValue] = useState("Priority");

  const [fetchCount, fetchCountStatus] = useLazyQuery(GETCOUNTBYSTS, { fetchPolicy: "no-cache" });

  let queryInputData = {
    Category: "",
    LocDesc: "",
    PlangroupCode: "",
    Priority: "",
    Type: "",
    WorkrequestNo: "",
    WorkrequestOn: "",
    equipmentCode: "",
    fromDate: "",
    locationCode: "",
    reportedBy: "",
    srchby: "",
    srchbyinpval: "",
    toDate: "",
    workGroup: "",
    status: "",
    groupBy: value,
    Actionflag: "WorkReq_WS_fetch"
  };
    
  const useStyles = makeStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    wrapper: {
      height: '100%',
      flex: '1',
      display: 'flex',
      flexDirection: 'column'
    },
    filterPanel: {
      padding: '18px 30px',
      background: '#FFFFFF',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
    },
    gridWrapper: {
      flex: 1,
    },
    bottomWrapper: {
      height: 80,
      width: '100%'
    }
  });
  const classes = useStyles();
  const [fetchMetaData, fetchMetaDataStatus] = useLazyQuery(FILTERMETADATA);

  useEffect(() => {
    fetchCount({ variables: { ...queryInputData } });
    fetchMetaData();
  }, []);

  useEffect(() => {
    if (refreshContext) {
      fetchCount({ variables: { ...queryInputData } });

      dispatch(actions.workRequest.refresh(false));
    }
  }, [refreshContext]);

  useEffect(() => {
    let { loading, error, data } = fetchCountStatus;
    if (loading) {
      console.log("loading");
    }
    else if (data) {
      let getcountsts = data.workRequest_getCountBySts && data.workRequest_getCountBySts.gettheCountofWorkRequestsgroupedbyStatus,
        countData = getcountsts && getcountsts.data;
      dispatch(actions.workRequest.getCountSuccess(countData));
        setDataLoaded(true);
    }
    else if (error) {
      Ext.Msg.alert("Error", error.message);
      Ext.Msg.setHideAnimation(null);
      console.log(error);
    }
  }, [fetchCountStatus]);

  useEffect(() => {
    let { data, error, loading } = fetchMetaDataStatus;
    if (loading) {
      console.log("loading");
    }
    else if (data) {
      let filterData = data.workRequest_getWrkReqMetaData && data.workRequest_getWrkReqMetaData.getListItems && data.workRequest_getWrkReqMetaData.getListItems.data;
      dispatch(actions.workRequest.comboItems.received(filterData));
    }
    else if (error) {
      Ext.Msg.alert("Error", error.message);
      Ext.Msg.setHideAnimation(null);
      console.log(error);
    }
  }, [fetchMetaDataStatus]);

  const toggleAction = function (e) {
    history.push(`${location.pathname}/list`, {
      tabdata: "Fresh",
      hdn_card_code: "F",
      groupBy: queryInputData.groupBy,
      allStatus:true,
      Actionflag: "status_click"
    });

    dispatch(actions.workRequest.getCountSuccess({}));
  };

  const handleGridClick = function(data){
    var tabdata = "", hdn_card_code = "";
    if (data) {
      tabdata = data.tabdata;
      hdn_card_code = data.hdn_card_code;
    }
    debugger;
    let Actionflag = "", grpBy = queryInputData.groupBy;
    if (grpBy.includes("Priority")) {
      Actionflag = "Priority_Filter";
    } else if (grpBy.includes("Status")) {
      Actionflag = "Browse_Work_Requests_UI_Fetch";
    } else if (grpBy.includes("RepDate")) {
      Actionflag = "ReportedDate_Filter";
    }

    setTimeout(() => {
      history.push(`${location.pathname}/list`, {
        tabdata: tabdata, hdn_card_code: hdn_card_code, Actionflag: Actionflag, groupBy: grpBy
      });
    }, 250);

    dispatch(actions.workRequest.getCountSuccess({}));

  };

  const navBarightIcons = [{
    id: "1",
    type: "icon",
    iconCls: "neb-timeline",
    action: toggleAction
  }];

  const onFieldChange = function (field, data) {
    setValue(data);
    queryInputData.groupBy = data;
    fetchCount({ variables: { ...queryInputData } });
  };

  return (
    <div>
      {!dataLoaded && <DashboardShimmer />}
      {!!dataLoaded && <>
          <PageHeader
            title='Work Request'
            rightActions={navBarightIcons}
          />
          <div class={classes.wrapper}>
              <div className={classes.filterPanel}>
                <EAMSelect
                  id="groupBy"
                  value={value}
                  labelField="workhubcmbdesc"
                  valueField="workhubcmbcode"
                  onFieldChange={onFieldChange}
                  options={wrkReqMetadata.workhubinformation}
                /> 
				</div>
              <div className={classes.gridWrapper}>
                <EAMGridView
                  variant="colored"
                  value={countBySts.workrequestcount}
                  onClick={handleGridClick}
                />
              </div>
              <div className={classes.bottomWrapper}>
                <EAMExpandButton onClick={()=>{
                    history.push(`${location.pathname}/create`);
                }} />
              </div>
            </div>
            </>
      }
    </div>
  );
}

export default Dashboard;