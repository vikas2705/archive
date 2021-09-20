import { ExtButton, ExtContainer, ExtLabel } from '@sencha/ext-react-modern';
import React from 'react';
import moment from "moment";
import { RTText, RTTextArea } from '../../../../components/src/components';

function AssignedWO(props) {
  const { wrkReqSuggestedWO } = props;
  return (
    <ExtContainer cls="wrkreqsum-innercontainer" padding="10">
      <ExtContainer layout="hbox">
        <ExtLabel html={wrkReqSuggestedWO.woNo} cls="wrkreq_suggestedwo" />
        {wrkReqSuggestedWO.woCriticality &&
          <ExtButton text="Critical" cls="wostatus-critical wrkreq_suggestedwo_status" />}
        <ExtButton text={wrkReqSuggestedWO.woStatus} cls="wostatus-progress wrkreq_suggestedwo_status" />
      </ExtContainer>
      <RTText
        label="WO On"
        value={(wrkReqSuggestedWO.woOn === "E") ? "Equipment" : "Location"}
        disabled="true"
        className="wrkreqsum-overviewtext"
      />
      <ExtContainer layout="hbox">
        <RTText
          label="Type"
          value={wrkReqSuggestedWO.woTypedesc || "__"}
          disabled="true"
          className="wrkreqsum-overviewtext"
        />
        <RTText
          label="Category"
          value={wrkReqSuggestedWO.woCategorydesc || "__"}
          disabled="true"
          className="wrkreqsum-overviewtext"
        />
      </ExtContainer>
      <RTTextArea
        label="WO Description"
        value={wrkReqSuggestedWO.woDesc || "__"}
        disabled="true"
        className="wrkreqsum-overviewtext wrkreqsum-textarea"
      />
      <RTText
        label="Created On"
        value={wrkReqSuggestedWO.woDate ? moment(wrkReqSuggestedWO.woDate).format("DD/MM/YYYY") : ""}
        disabled="true"
        className="wrkreqsum-overviewtext"
      />
      <RTText
        label="Supervisor Name"
        value={wrkReqSuggestedWO.woSupervisorName || "__"}
        disabled="true"
        className="wrkreqsum-overviewtext"
      />
      <ExtContainer layout="hbox">
        <RTText
          label="Supervisor Phone"
          value={wrkReqSuggestedWO.woSupervisorPhone || "__"}
          disabled="true"
          className="wrkreqsum-overviewtext"
          width="40%"
        />
        {wrkReqSuggestedWO.woSupervisorPhone && 
        <a href={"tel:" + wrkReqSuggestedWO.woSupervisorPhone} style={{ height: "30", width: "40", margin: "0" }} 
        className="wrkreqsum-cardphone nebula-icons phone-nbicon"></a> }
      </ExtContainer>
        <RTText
          label="Scheduled Start Date"
          value={wrkReqSuggestedWO.woScheduledStartDate ? moment(wrkReqSuggestedWO.woScheduledStartDate).format("DD/MM/YYYY") : "__"}
          disabled="true"
          className="wrkreqsum-overviewtext"
        />
        <RTText
          label="Scheduled Completion Date"
          value={wrkReqSuggestedWO.woScheduledCompletionDate ? moment(wrkReqSuggestedWO.woScheduledCompletionDate).format("DD/MM/YYYY") : "__"}
          disabled="true"
          className="wrkreqsum-overviewtext"
        />
    </ExtContainer>
  );
}


export default AssignedWO;
