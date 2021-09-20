import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import Attachments from './Attachments';
import FormRow from "../../../components/Form/FormRow";
import EAMText from "../../../components/EAMText";
import WorkRequestStatus from "../../../components/WorkRequestStatus";
import EAMRadioButtonGroup from "../../../components/EAMRadioButtonGroup";
import EAMTextarea from "../../../components/EAMTextarea";
import EAMDate from "../../../components/EAMDate";
import EAMSlider from "../../../components/EAMSlider";
import EAMSwitch from "../../../components/EAMSwitch";
import EAMParentWOSelect from "../../../components/EAMParentWOSelect";
import NameAndCodeField from "../../../components/NameAndCodeField";
import EAMSelect from "../../../components/EAMSelect";
import { selectors } from "../../../reducers";
import EAMEqpLocFieldText from "../../../components/EAMEqpLocFieldText";
import { WO_TABS } from './constant';
import IsVisible from "../../../components/Form/IsVisible";
import EAMDateTime from "../../../components/EAMDateTime";

const emptyValue = "-------";
const emptySet = {};
export default function WOForm({ activeTab, onFieldChange }) {

  const workOrder = useSelector(state => selectors.workOrder(state).value || emptySet, shallowEqual)
  const { Supervisorinfo, Categoryinfo, Probleminfo, PlanningGroupinfo, WorkGroupinfo, Typeinfo, Priorityinfo } = useSelector(state => selectors.workOrderItems(state))
  const [isWOComplete, setIsWOComplete] = useState(false);
  useEffect(() => {
    if (isWOComplete) {
      onFieldChange("percentCompleted", "100");
    }
  }, [isWOComplete, onFieldChange])

  return (
    <>
      <IsVisible
        visible={activeTab === WO_TABS.WO_INFO}>
        <FormRow noSpaceBottom>
          <EAMText
            id=""
            title='Work Order No'
            isReadOnly
            value={emptyValue}
          />
          <WorkRequestStatus
            value="inProgress"
            title="WO Status"
          />
        </FormRow>
        <EAMRadioButtonGroup
          title="Work Order On"
          id="WoOnEqpLocFlag"
          value={workOrder.WoOnEqpLocFlag || "E"}
          onFieldChange={onFieldChange}
          onChangeResetFieldId={["WoEqpLocCode"]}
          resetFieldValue=""
          options={[
            {
              id: "equipment",
              value: "E",
              label: "Equipment",
              name: "radios",
            },
            {
              id: "location",
              value: "L",
              label: "Location",
              name: "radios",
            },
          ]}
        />
        <NameAndCodeField
          id="WoEqpLocCode"
          type={workOrder.WoOnEqpLocFlag === 'E' ? 'equipment' : 'location'}
          value={workOrder.WoEqpLocCode || ''}
          onFieldChange={onFieldChange}
        />
        <EAMEqpLocFieldText
          title="Location"
          labelName="locationDesc"
          valueName="locationcode"
          eqpLocCode={workOrder.WoEqpLocCode}
          eqpLocFlag={workOrder.WoOnEqpLocFlag}
        />
        <FormRow>
          <EAMEqpLocFieldText
            title="Criticality"
            labelName="CriticalityDesc"
            eqpLocCode={workOrder.WoEqpLocCode}
            eqpLocFlag={workOrder.WoOnEqpLocFlag}
          />
          <EAMEqpLocFieldText
            title="Failure Group"
            labelName="FailureGroupDesc"
            eqpLocCode={workOrder.WoEqpLocCode}
            eqpLocFlag={workOrder.WoOnEqpLocFlag}
          />
        </FormRow>
        <Attachments slideView />
        <EAMTextarea
          id="WorkOrderDesc"
          title='Details'
          value={workOrder.WorkOrderDesc}
          onFieldChange={onFieldChange}
        />
        <EAMSelect
          id="WoPriority"
          title='Priority'
          value={workOrder.WoPriority}
          onFieldChange={onFieldChange}
          labelField="PriorityDesc"
          valueField="PriorityCode"
          options={Priorityinfo}
        />
        <FormRow>
          <EAMSelect
            id="WoType"
            title='Type'
            value={workOrder.WoType}
            onFieldChange={onFieldChange}
            labelField="TypeDesc"
            valueField="TypeCode"
            options={Typeinfo}
          />
          <EAMDate
            id="FailureDate"
            title="Failure Date"
            value={workOrder.FailureDate}
            onFieldChange={onFieldChange}
          />
        </FormRow>
        <EAMSelect
          id="SupervisorCode"
          shouldFormat
          title='Supervisor'
          value={workOrder.SupervisorCode}
          onFieldChange={onFieldChange}
          labelField="SupervisorName"
          valueField="SupervisorCode"
          options={Supervisorinfo}
        />
        <EAMDateTime
          id="WoScheduledStartDate"
          title="Start Date & Time"
          dateId="WoScheduledStartDate"
          timeId="WoScheduledStartTime"
          dateValue={workOrder.WoScheduledStartDate}
          timeValue={workOrder.WoScheduledStartTime}
          onFieldChange={onFieldChange}
        />
        <EAMDateTime
          title="Completion Date & Time"
          dateId="WoScheduledStartDate"
          timeId="WoScheduledStartTime"
          dateValue={workOrder.WoScheduledComplDate}
          timeValue={workOrder.WoScheduledComplTime}
          onFieldChange={onFieldChange}
        />
      </IsVisible>
      <IsVisible
        visible={activeTab === WO_TABS.DETAIL}>
        <EAMSelect
          id={{
            value: "MajorProblemCode",
            label: "MajorProblemDesc",
          }}
          title='Reported Problem'
          shouldFormat
          value={workOrder.MajorProblemCode}
          onFieldChange={onFieldChange}
          labelField="ProblemDesc"
          valueField="ProblemCode"
          options={Probleminfo}
        />
        <EAMSlider
          id="percentCompleted"
          title='Completion %'
          disabled={isWOComplete}
          value={workOrder.percentCompleted}
          onFieldChange={onFieldChange}
        />
        <EAMSwitch
          title="WO Complete?"
          isChecked={isWOComplete}
          onFieldChange={(id, value) => {
            setIsWOComplete(value);
          }}
        />
        <FormRow>
          <EAMSelect
            id="WoCategory"
            title='Category'
            value={workOrder.WoCategory}
            onFieldChange={onFieldChange}
            labelField="CategoryDesc"
            valueField="CategoryCode"
            options={Categoryinfo}
          />
          <EAMSwitch
            title="Perform RCA?"
            isChecked={workOrder.PerformRCAFlag === '1'}
            onFieldChange={(id, value) => {
              onFieldChange('PerformRCAFlag', value ? '1' : '0')
            }}
          />
        </FormRow>
        <FormRow>
          <EAMText
            id="WoDuration"
            title='WO Duration'
            value={workOrder.WoDuration}
            onFieldChange={onFieldChange}
            unit="Hrs"
          />
          <EAMText
            id="WoMiscCost"
            title='WO Misc. Cost'
            value={workOrder.WoMiscCost}
            onFieldChange={onFieldChange}
            unit="USD"
          />
        </FormRow>
        <EAMSelect
          id="WorkGroup"
          title='Work Group'
          shouldFormat
          value={workOrder.WorkGroup}
          onFieldChange={onFieldChange}
          labelField="WorkGroupName"
          valueField="WorkGroupCode"
          options={WorkGroupinfo}
        />
        <EAMSelect
          title='Planning Group'
          shouldFormat
          id="PlanningGroup"
          value={workOrder.PlanningGroup}
          onFieldChange={onFieldChange}
          labelField="PlanningGroupName"
          valueField="PlanningGroupCode"
          options={PlanningGroupinfo}
        />
        <EAMParentWOSelect
          id="ParentWOCode"
          title='Parent WO'
          eqpLocCode={workOrder.WoEqpLocCode}
          eqpOrLoc={workOrder.WoOnEqpLocFlag}
          value={workOrder.ParentWOCode}
          onFieldChange={onFieldChange}
        />
        <EAMText
          id="WorkPhone1"
          title='Phone 1'
          value={workOrder.WorkPhone1}
          onFieldChange={onFieldChange}
        />
        <EAMText
          id="WorkPhone2"
          title='Phone 2'
          value={workOrder.WorkPhone2}
          onFieldChange={onFieldChange}
        />

        <EAMTextarea
          id="Remarks"
          title='Additional Remarks'
          value={workOrder.Remarks}
          placeholder=""
          onFieldChange={onFieldChange}
        />
      </IsVisible>
      <IsVisible
        visible={activeTab === WO_TABS.ATTACHMENT}>
        <Attachments onFieldChange={onFieldChange} />
      </IsVisible>

      {/* <FormRow>
        <EAMText
          id=""
          title='WO Date'
          isReadOnly
          value={workOrder.WoDate}
        />



        
      </FormRow>
      <FormRow>
        <EAMDate
          id="WoScheduledStartDate"
          title="Start Date"
          value={workOrder.WoScheduledStartDate}
          onFieldChange={onFieldChange}
        />
        <EAMTime
          id="WoScheduledStartTime"
          title="Start Time"
          value={workOrder.WoScheduledStartTime}
          onFieldChange={onFieldChange}
        />
      </FormRow>
      <FormRow>
        <EAMDate
          id="WoScheduledComplDate"
          title="Completion Date"
          value={workOrder.WoScheduledComplDate}
          onFieldChange={onFieldChange}
        />
        <EAMTime
          id="WoScheduledComplTime"
          title="Completion Time"
          value={workOrder.WoScheduledComplTime}
          onFieldChange={onFieldChange}
        />
      </FormRow> */}
      {/* <EAMSelect
          id="WoType"
          title='Supervisor Name & Code'
          value={workOrder.WoType}
          onFieldChange={onFieldChange}
          labelField="TypeDesc"
          valueField="TypeCode"
          options={Typeinfo}
        /> */}
      {/* <EAMTextarea
        id="WorkOrderDesc"
        title='Work Order Desc'
        value={workOrder.WorkOrderDesc}
        onFieldChange={onFieldChange}
      /> */}
    </>
  );
}
