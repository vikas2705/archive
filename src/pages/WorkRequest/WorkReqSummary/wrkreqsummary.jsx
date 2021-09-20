import React, { Component } from 'react';
import { connect } from "react-redux";
import { ExtTabbar, ExtTab, ExtContainer } from '@sencha/ext-react-modern';

import '../../../resources/css/workRequest/workreqsummary.css';
import { RTNavBar } from '../../../components/src/components';
import Overview from "./components/Overview";
import WorkReqBtmBtnAction from "../WorkRequestView/components/WorkReqBtmBtnAction"
import WorkReqTimeline from './components/WorkReqTimeline';
import SuggestedWO from './components/SuggestedWO';
import Attachments from './components/Attachments';

class WorkReqSummary extends Component {

  state = {
    activeTab: "overview",
    assignedWO: false
  }

  onTabChange = ({ sender, value, oldValue }) => {
    this.setState({ activeTab: value.getItemId() })
  }

  onAssign = () => {
    this.setState({
      activeTab: this.state.activeTab,
      assignedWO: true
    });
  }

  onShow = ({ sender }) => {
    sender.setActiveTab("overview");
  }

  render() {
    const { activeTab, assignedWO } = this.state,
      wrkReqSummary = this.props.location.state,
      navBarightIcons = [{
        id: "1",
        type: "status",
        cls: "wrkreqsum-titlestatus " + wrkReqSummary.activeTab.hdn_card_code,
        text: wrkReqSummary.activeTab.tabdata
      }], clearBack = [{ type: "wrkreqoverview", payload: {} },
      { type: "wrkreqoverviewcard", payload: {} }, { type: "wrkreqtimeline", payload: [] },
      { type: "wrkreqsuggestedwo", payload: [] },{ type: "wrkreqoverviewcardimage", payload: "" },
      { type: "wrkreqdetailAttachments", payload: [] }];

    return (
      <div>
        <RTNavBar title={wrkReqSummary.data.workrequestNoout + "-Details"} isDispatch={clearBack} rightIcons={navBarightIcons}></RTNavBar>
        <ExtTabbar width="100vw" shadow onActiveTabchange={this.onTabChange} activeTab="overview" onPainted={this.onShow} cls="wrkreqsum-tabbar">
          <ExtTab key='1' itemId="overview" title="Overview" cls="wrkreqsum-tab" iconCls="x-fa fa-globe" />
          <ExtTab key='2' itemId="timeline" title="Timeline" cls="wrkreqsum-tab" iconCls="x-fa fa-stream" />
          <ExtTab key='3' itemId="suggestedwo" title={assignedWO ? "Assigned WO" : "Suggested WO"} cls="wrkreqsum-tab" iconCls="x-fa fa-clipboard-list" />
          <ExtTab key='4' itemId="attachments" title="Attachments" cls="wrkreqsum-tab" iconCls="x-fa fa-paperclip" />
        </ExtTabbar>
        <ExtContainer layout="vbox" scrollable="true" cls="wrkreqsum-outercontainer">
          {activeTab && activeTab === "overview" &&
            <ExtContainer cls="wrkreqsum-innercontainer">
              <Overview activeTab={activeTab} wrkReqSummary={wrkReqSummary} onAssign={this.onAssign} />
            </ExtContainer>
          }
          {activeTab && activeTab === "timeline" &&
            <ExtContainer cls="wrkreqsum-innercontainer">
              <WorkReqTimeline wrkReqSummary={wrkReqSummary}/>
            </ExtContainer>
          }
          {activeTab && activeTab === "suggestedwo" &&
            <SuggestedWO onAssign={this.onAssign} wrkReqSummary={wrkReqSummary} activeTab={activeTab} assignedWO={assignedWO} />}

          {activeTab && activeTab === "attachments" &&
            <Attachments />}
        </ExtContainer>
        {wrkReqSummary.popUpList.length > 0 &&
          <ExtContainer cls="wrksum_btmsec">
            <WorkReqBtmBtnAction popUpList={wrkReqSummary.popUpList} wrkReqSummary={wrkReqSummary} />
          </ExtContainer>
        }
      </div>
    )
  }
}


export default React.memo(WorkReqSummary);