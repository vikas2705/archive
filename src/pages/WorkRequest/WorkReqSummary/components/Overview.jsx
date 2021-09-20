import React, { useState, useEffect } from 'react';
import { ExtContainer, ExtButton, ExtLabel } from '@sencha/ext-react-modern';
import moment from "moment";
import { connect, useDispatch } from 'react-redux';
import { GET_WRK_REQ_LIST } from '../../../../queries/workRequest/getWrkReqsBySts';
import { GET_OVERVIEW_CARD } from '../../../../queries/workRequest/getOverviewCard';
import { DOWNLOAD_FILE } from '../../../../queries/workRequest/downloadFile';
import { RTText, RTTextArea } from '../../../../components/src/components';

const Ext = window.Ext,
  BusyCursor = window.BusyCursor;

function Overview(props) {
  const { wrkReqSummary, wrkReqOverview, onAssign, wrkReqOverviewCard, wrkReqOverviewCardImage } = props;
  const dispatch = useDispatch();
  const fetchWrkReqList = GET_WRK_REQ_LIST({}, wrkReqSummary.activeTab.hdn_card_code, wrkReqSummary.data.workrequestNoout),
    fetchOverviewCard = GET_OVERVIEW_CARD(wrkReqOverview.workrequestOnout, wrkReqOverview.equipmentCodeout, wrkReqOverview.locationCodeout),
    downloadFile = DOWNLOAD_FILE(wrkReqOverviewCard.eqpLocDefaultImage, "photos");

  useEffect(() => {
    fetchWrkReqList.refetch();
  }, []);

  useEffect(() => {
    if (wrkReqOverview.workrequestOnout) {
      fetchOverviewCard.refetch();
    }
    if (wrkReqOverview.SuggestedOrAssignedWOFlag === "Y") {
      onAssign();
    }
  }, [wrkReqOverview.workrequestOnout]);

  let download = false;
  if (!Ext.Object.isEmpty(wrkReqOverviewCard)) {
    download = wrkReqOverviewCard.eqpLocDefaultImage ? true : false;
  }
  useEffect(() => {
    if (download) {
      downloadFile.refetch();
    }
  }, [download]);

  useEffect(() => {
    let { data, error, isLoading, isSuccess } = fetchWrkReqList;
    if (isLoading) {
      console.log("loading");
      BusyCursor.show();
    }
    else if (isSuccess && data.workRequest_getWrkReqsBySts) {
      let getthelistofWorkRequests = data.workRequest_getWrkReqsBySts.getthelistofWorkRequests,
        wrkList = getthelistofWorkRequests.data && getthelistofWorkRequests.data.GetWorkReqInfo[0];
      dispatch({ type: "wrkreqoverview", payload: wrkList });
      BusyCursor.hide();
    }
    else if (error) {
      BusyCursor.hide();
      console.log(error);
      Ext.Msg.alert("Error", error.message);
      Ext.Msg.setHideAnimation(null);
    }
  }, [fetchWrkReqList]);

  useEffect(() => {
    let { data, error, isLoading, isSuccess } = fetchOverviewCard;
    if (isLoading) {
      console.log("loading");
      BusyCursor.show();
    }
    else if (isSuccess && data.location_getEqpLocDet) {
      let equipDetails = data.location_getEqpLocDet.getEquipmentLocationDetails,
        payloadData = equipDetails && equipDetails.data && equipDetails.data[0];
      dispatch({ type: "wrkreqoverviewcard", payload: payloadData });
      BusyCursor.hide();
    }
    else if (error) {
      BusyCursor.hide();
      console.log(error);
      Ext.Msg.alert("Error", error.message);
      Ext.Msg.setHideAnimation(null);
    }
  }, [fetchOverviewCard]);


  useEffect(() => {
    let { data, error, isLoading, isSuccess } = downloadFile;
    if (isLoading) {
      console.log("loading");
      BusyCursor.show();
    }
    else if (isSuccess && data.downloadFile) {
      let byteArray = data.downloadFile;
      var binary = '';
      var bytes = new Uint8Array(byteArray);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      var payloadData = 'data:image/jpeg;base64,' + window.btoa(binary);
      dispatch({ type: "wrkreqoverviewcardimage", payload: payloadData });
      BusyCursor.hide();
    }
    else if (error) {
      BusyCursor.hide();
      console.log(error);
      Ext.Msg.alert("Error", error.message);
      Ext.Msg.setHideAnimation(null);
    }
  }, [downloadFile]);

  let parentName = ((wrkReqOverviewCard.ParentDesc || "__") + " (" + (wrkReqOverviewCard.ParentCode || "__") + " )"),
    problemDesc = ((wrkReqOverview.problemDesc || "__") + "(" + (wrkReqOverview.problemCode || "__") + ")"),
    Locationdesc = ((wrkReqOverview.Locationdesc || "__") + "(" + (wrkReqOverview.locationCodeout || "__") + ")"),
    reportedByNameout = ((wrkReqOverview.reportedByNameout || "__") + "(" + (wrkReqOverview.reportedByCodeout || "__") + ")"),
    observationDate = ((wrkReqOverview.observationDate) ? moment(wrkReqOverview.observationDate).format("DD/MM/YYYY") : "__"),
    observationTime = ((wrkReqOverview.observationTime) ? moment(wrkReqOverview.observationTime).format("h:mm A") : "__");

  if (!wrkReqOverviewCard.ParentDesc && !wrkReqOverviewCard.ParentCode) {
    parentName = "__"
  }
  if (!wrkReqOverview.problemDesc && !wrkReqOverview.problemCode) {
    problemDesc = "__"
  }
  if (!wrkReqOverview.Locationdesc && !wrkReqOverview.locationCodeout) {
    Locationdesc = "__"
  } if (!wrkReqOverview.reportedByNameout && !wrkReqOverview.reportedByCodeout) {
    problemDesc = "__"
  }
  return (
    <ExtContainer scrollable="true" height="75vh">
      <ExtContainer layout="hbox" cls="wrksumcard-overview">
        <img src={wrkReqOverviewCardImage} style={{ width: '130px', paddingTop: '5px' }} />
        <ExtContainer layout="vbox" width="60%" padding="2px 0px 0px 10px">
          {wrkReqOverviewCard.WorkGroupTeamLeadContactNo &&
            <a href={"tel:+" + wrkReqOverviewCard.WorkGroupTeamLeadContactNo} style={{ height: "40" }}
              className="wrkreqsum-cardphone nebula-icons phone-nbicon"></a>}
          <ExtLabel html={(wrkReqOverview.workrequestOnout === "E") ? "Equipment" : "Location"} cls="wrkreqsum-cardtitle" />
          <ExtLabel html={wrkReqOverviewCard.EqpLocDesc || "__"} />
          <ExtLabel html={wrkReqOverviewCard.EqpLocCode || "__"} />
          <ExtLabel html="↓" />
          <RTText
            label={"Parent Name & code"}
            value={parentName}
            disabled="true"
            className="wrkreqsum-overviewtext wrkreqsum-carddesc"
          />
        </ExtContainer>
      </ExtContainer>
      <ExtContainer padding="20 10 10 10">
        <RTText
          label={"Problem Description & code"}
          value={problemDesc}
          disabled="true"
          className="wrkreqsum-overviewtext"
        />
        <RTText
          label={"Location Name & code"}
          value={Locationdesc}
          disabled="true"
          className="wrkreqsum-overviewtext"
        />
        <RTText
          label={"Reported By Name & code"}
          value={reportedByNameout}
          disabled="true"
          className="wrkreqsum-overviewtext"
        />
        <RTText
          label="Work Group"
          value={wrkReqOverview.Workgroupdesc || "__"}
          disabled="true"
          className="wrkreqsum-overviewtext"
        />
        <ExtContainer layout="hbox">
          <RTText
            label="Work Phone"
            value={wrkReqOverview.workPhone || "__"}
            disabled="true"
            className="wrkreqsum-overviewtext"
            width="35%"
          />
          {!!wrkReqOverview.workPhone &&
            <ExtContainer>
              <a href={"tel:+" + wrkReqOverview.workPhone} style={{ height: "30px", margin: "18px" }}
                className="wrkreqsum-cardphone nebula-icons phone-nbicon"></a>
            </ExtContainer>}
        </ExtContainer>
        <ExtContainer layout="hbox">
          <RTText
            label="Observation Date"
            value={observationDate}
            disabled="true"
            className="wrkreqsum-overviewtext"
          />
          <RTText
            label="Observation Time"
            value={observationTime}
            disabled="true"
            className="wrkreqsum-overviewtext"
          />
        </ExtContainer>
        <RTTextArea
          label="Short Description"
          value={wrkReqOverview.observationDetails || "__"}
          disabled="true"
          className="wrkreqsum-overviewtext wrkreqsum-textarea"
        />
        <RTTextArea
          label="Work Request Description"
          value={wrkReqOverview.wrDesc || "__"}
          disabled="true"
          className="wrkreqsum-overviewtext wrkreqsum-textarea"
        />
      </ExtContainer>
    </ExtContainer>
  );
}

const mapStateToProps = (
  {
    workrequest: {
      wrkReqOverview, wrkReqOverviewCard, wrkReqOverviewCardImage
    }
  }
) => {
  return {
    wrkReqOverview, wrkReqOverviewCard, wrkReqOverviewCardImage
  };
};

export default React.memo(connect(mapStateToProps)(Overview));
