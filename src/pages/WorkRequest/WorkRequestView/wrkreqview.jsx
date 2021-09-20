import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { ExtContainer } from '@sencha/ext-react-modern';
import '../../../resources/css/workRequest/wrkreqview.css';
import { RTNavBar, RTFab } from '../../../components/src/components';
import WorkStatusTab from './components/WorkStatusTab';
import { GET_WRK_REQ_LISTACTIONS } from '../../../queries/workRequest/getWrkReqListActions';
import { useHistory } from 'react-router-dom';
import actions from '../../../actions';
import { useLazyQuery } from "@apollo/react-hooks";
import PageHeader from '../../../components/PageHeader';

const Ext = window.Ext, BusyCursor = window.BusyCursor;

function WorkRequestView(props) {
  const { location } = props;
  const [activeTab, setActiveTab] = useState({
    tabdata: "Fresh",
    hdn_card_code: "F"
  });
  const [display, setDisplay] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const queryInputData = {
    DocumentNo:"",
    DocumentStatus: activeTab.hdn_card_code
  };

  const [fetchWrkReqListActions, fetchWrkReqListActionStatus] = useLazyQuery(GET_WRK_REQ_LISTACTIONS,{
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    debugger;
    let grpBy = location.state.groupBy;
     if (grpBy.includes("Status") || location.state.allStatus) {
      if (activeTab.hdn_card_code !== location.state.hdn_card_code) {
        setActiveTab({
          tabdata: location.state.tabdata,
          hdn_card_code: location.state.hdn_card_code
        });
      }
    } else{
      setActiveTab({
        tabdata: "",
        hdn_card_code: ""
      });
    }
  }, []);

  useEffect(() => {
    fetchWrkReqListActions({ variables: { ...queryInputData } });
  }, [activeTab]);

  const onTabChange = ({ sender }) => {
    var selection = sender && sender.getSelection(),
      data = selection && selection.data,
      status = data && data.hdn_card_code,
      itemCls = "x-wrkreqtab-active-" + (status);
    setActiveTab({
      tabdata: data && data.tabdata,
      hdn_card_code: status
    });
    sender.setItemCls(itemCls);
  };

  useEffect(() => {
    let { data, error, loading } = fetchWrkReqListActionStatus;
    if (loading) {
      console.log("loading");
      BusyCursor.show();
    }
    else if (data && data.workRequest_getlistOfAllowedActions) {
      let listActions = data.workRequest_getlistOfAllowedActions.listOfAllowedActions && data.workRequest_getlistOfAllowedActions.listOfAllowedActions.data;
      dispatch(actions.workRequest.getListActionSuccess(listActions));
      BusyCursor.hide();
    }
    else if (error) {
      BusyCursor.hide();
      console.log(error);
      Ext.Msg.alert("Error", error.message);
      Ext.Msg.setHideAnimation(null);
    }
  }, [fetchWrkReqListActionStatus]);

  const filterAction = function (e) {
    setDisplay(true);
    },
    filter = [{
      id: "1",
      type: "icon",
      iconCls: "filter_list-nbicon",
      action: filterAction
    }],
    statusText = [{
      id: "1",
      type: "status",
      cls: "wrkreqview-titlestatus",
      text: location.state.tabdata
    }],
    clearBack = [{ type: "wrkReqListFilter", payload: {} },
    { type: "wrkReqBySts", payload: [] }];

  const navBarightIcons = (location.state && location.state.allStatus) ? filter : statusText;

  const onPopupHide = () => {
    setDisplay(false)
  };

  return (
    <div>
       <PageHeader
            title='Work Request'
            rightActions={navBarightIcons}
          />
      {/*<RTNavBar title="All Work Requests" rightIcons={navBarightIcons} isDispatch={clearBack}></RTNavBar>*/}
      <RTFab iconCls="x-fa fa-plus" onTap={() => {
              history.push(`${location.pathname}/create`);
      }} />
      <ExtContainer layout="vbox" height="100%">
        <WorkStatusTab activeTab={activeTab} location={location} onTabChange={onTabChange} display={display} onPopupHide={onPopupHide} />
      </ExtContainer>
    </div>
  )
}

export default WorkRequestView;