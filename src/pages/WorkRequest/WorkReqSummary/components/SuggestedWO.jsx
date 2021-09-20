import { ExtButton, ExtContainer, ExtLabel } from '@sencha/ext-react-modern';
import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { GET_SUGGESTED_WO } from '../../../../queries/workRequest/getSuggestedWO';
import { POST_ASSIGN_WO } from '../../../../queries/workRequest/postAssignWO';
import moment from "moment";
import AssignedWO from './AssignedWO';

const Ext = window.Ext,
  BusyCursor = window.BusyCursor;

function SuggestedWO(props) {
  const { activeTab, wrkReqSuggestedWO, wrkReqSummary, onAssign, assignedWO } = props;
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({});

  const fetchSuggestedWo = GET_SUGGESTED_WO(wrkReqSummary.data.workrequestNoout);

  useEffect(() => {
    fetchSuggestedWo.refetch();
  }, [activeTab]);

  useEffect(() => {
    let { data, error, isLoading, isSuccess } = fetchSuggestedWo;
    if (isLoading) {
      console.log("loading");
      BusyCursor.show();
    }
    else if (isSuccess && data.workRequest_getWRWorkorder) {
      let listofwo = data.workRequest_getWRWorkorder.listofopenWorkordersraisedontheEquipmentLocation,
        payload = listofwo && listofwo.data && listofwo.data.WorkOrderInfo;
      dispatch({ type: "wrkreqsuggestedwo", payload: payload });
      BusyCursor.hide();
    }
    else if (error) {
      BusyCursor.hide();
      console.log(error);
      Ext.Msg.alert("Error", error.message);
    }
  }, [fetchSuggestedWo]);

  const mutation = POST_ASSIGN_WO(postData);

  useEffect(() => {
    let { data, error, isLoading, isSuccess, isError } = mutation;
    if (isLoading) {
      console.log("loading");
      BusyCursor.show();
    }
    else if (isSuccess && data) {
      BusyCursor.hide();
      onAssign();
    }
    else if (isError && error) {
      BusyCursor.hide();
      console.log(error);
      Ext.Msg.alert("Error", error.message);
      Ext.Msg.setHideAnimation(null);
    }
  }, [mutation]);

  return (
    <>
      {!assignedWO && wrkReqSuggestedWO && wrkReqSuggestedWO.length > 0 &&
        <ExtContainer layout="vbox" scrollable="true" height="75vh" padding="5 5 50 5">
          {wrkReqSuggestedWO.map((data, index) =>
            <>
              <ExtContainer cls="wrkreqstatus_listsec" itemId={"wrkreq_suggestedwo_" + index}>
                <ExtContainer layout="hbox" itemId={"wrkreq_suggestedwo_hbox" + index}>
                  <ExtLabel html={data.woNo} cls="wrkreq_suggestedwo" itemId={"wrkreq_suggestedwo_woNo" + index} />
                  {data.woCriticality &&
                    <ExtButton text="Critical" cls="wostatus-critical wrkreq_suggestedwo_status" itemId={"wrkreq_suggestedwo_woCriticality" + index} />}
                  <ExtButton text={data.woStatus} cls="wostatus-progress wrkreq_suggestedwo_status" itemId={"wrkreq_suggestedwo_woStatus" + index} />
                </ExtContainer>
                <ExtLabel html={data.woOndesc + " | " + data.woTypedesc} cls="wrkreq_suggestedwo_shortdesc" itemId={"wrkreq_suggestedwo_woOndesc" + index} />
                <ExtLabel html={data.woDesc} cls="wrkreq_suggestedwo_desc" itemId={"wrkreq_suggestedwo_woDesc" + index} />
                <ExtContainer layout="hbox" itemId={"wrkreq_suggestedwo_hbox2" + index}>
                  <ExtButton text={data.woDate ? moment(data.woDate).format("DD/MM/YYYY") : ""} iconCls="x-fa fa-calendar-day" cls="wrkreq_suggestedwo_datecode" itemId={"wrkreq_suggestedwo_woDate" + index} />
                  <ExtButton text={data.woOnCode} iconCls="x-fa fa-cog" cls="wrkreq_suggestedwo_datecode" itemId={"wrkreq_suggestedwo_woOnCode" + index} />
                </ExtContainer>
                <ExtContainer cls="wrkreq-assigncontainer" itemId={"wrkreq_suggestedwo_assign" + index}>
                  <ExtButton text="Assign Work Request" iconCls="x-fa fa-arrow-circle-right"
                    cls="wrkreq_suggestedwo_assignwrbtn" itemId={"wrkreq_suggestedwo_assignwrbtn" + index}
                    onTap={() => {
                      setPostData({
                        workrequestNo: wrkReqSummary.data.workrequestNoout,
                        workorderNo: data.woNo
                      });
                      mutation.mutate();
                    }} />
                </ExtContainer>
              </ExtContainer>
            </>
          )}
        </ExtContainer>
      }
      {!!assignedWO && wrkReqSuggestedWO && wrkReqSuggestedWO.length > 0 &&
        <ExtContainer layout="vbox" scrollable="true" padding="5 5 50 5" height="80vh">
          <AssignedWO wrkReqSuggestedWO={wrkReqSuggestedWO[0]} />
        </ExtContainer>}
    </>
  );
}


const mapStateToProps = (
  {
    workrequest: {
      wrkReqSuggestedWO
    }
  }
) => {
  return {
    wrkReqSuggestedWO
  };
};

export default connect(mapStateToProps)(SuggestedWO);
