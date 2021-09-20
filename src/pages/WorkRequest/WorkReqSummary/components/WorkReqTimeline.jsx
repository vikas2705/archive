import { ExtButton, ExtContainer, ExtLabel } from '@sencha/ext-react-modern';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { GET_WRK_REQ_TIMELINE } from '../../../../queries/workRequest/getWrkReqTimeline';
import moment from "moment";

const Ext = window.Ext,
  BusyCursor = window.BusyCursor;

function WorkReqTimeline(props) {
  const { wrkReqTimeline, wrkReqSummary } = props;
  const dispatch = useDispatch();

  const fetchWrkReqTimeline = GET_WRK_REQ_TIMELINE(wrkReqSummary.data.workrequestNoout);

  useEffect(() => {
    let { data, error, isLoading, isSuccess } = fetchWrkReqTimeline;
    if (isLoading) {
      console.log("loading");
      BusyCursor.show();
    }
    else if (isSuccess && data.workRequest_getWRTimeline) {
      let payload = data.workRequest_getWRTimeline.getthetimelinemapoftheWorkRequest && data.workRequest_getWRTimeline.getthetimelinemapoftheWorkRequest.data;
      dispatch({ type: "wrkreqtimeline", payload: payload });
      BusyCursor.hide();
    }
    else if (error) {
      BusyCursor.hide();
      console.log(error);
      Ext.Msg.alert("Error", error.message);
      Ext.Msg.setHideAnimation(null);
    }
  }, [fetchWrkReqTimeline]);


  return (
    <ExtContainer layout="vbox" scrollable="true" height="70vh" padding="20 5">
      {wrkReqTimeline && wrkReqTimeline.length > 0 && wrkReqTimeline.map((data, index) =>
        <>
          <ExtContainer key={"wrkreqtimeline_" + index} height="29" layout="hbox" padding="0 0 0 10">
            <ExtButton key={"wrkreqtimeline_btn" + index}
              iconCls={"nebula-icons nbicon-" + (data.iconcode ? data.iconcode : "CR")}
              ui="round" cls="wrkreqtimeline-btnindicator" />
            <ExtLabel cls="wrkreqtimeline-historytitle" html={data.HistoryTitle || ""} />
          </ExtContainer>
          <ExtContainer height="60px" >
            <ExtContainer layout="hbox" height="60px">
              {index !== wrkReqTimeline.length - 1 &&
                <ExtContainer cls="wrkreqtimeline"></ExtContainer>
              }
              {index === wrkReqTimeline.length - 1 &&
                <ExtContainer margin="0 0 0 30" cls="wrkreqtimeline-lastitem" padding="0 0 0 20"></ExtContainer>
              }
              <ExtContainer height="60px">
                <ExtLabel cls="wrkreqtimeline-username" html={data.username || ""} />
                <ExtLabel cls="wrkreqtimeline-date" html={data.HistoryDatetime ? moment(data.HistoryDatetime).format("DD/MM/YYYY") : ""} />
              </ExtContainer>
            </ExtContainer>
          </ExtContainer>
        </>
      )}
    </ExtContainer>
  );
}


const mapStateToProps = (
  {
    workrequest: {
      wrkReqTimeline
    }
  }
) => {
  return {
    wrkReqTimeline
  };
};

export default connect(mapStateToProps)(WorkReqTimeline);
