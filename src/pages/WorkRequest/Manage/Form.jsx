import { shallowEqual, useSelector } from "react-redux";
import EAMDate from "../../../components/EAMDate";
import EAMEqpLocFieldText from "../../../components/EAMEqpLocFieldText";
import EAMRadioButtonGroup from "../../../components/EAMRadioButtonGroup";
import EAMSelect from "../../../components/EAMSelect";
import EAMSwitch from "../../../components/EAMSwitch";
import EAMText from "../../../components/EAMText";
import EAMTextarea from "../../../components/EAMTextarea";
import EAMTime from "../../../components/EAMTime";
import FormRow from "../../../components/Form/FormRow";
import IsVisible from "../../../components/Form/IsVisible";
import NameAndCodeField from "../../../components/NameAndCodeField";
import { selectors } from "../../../reducers";
import WorkRequestAttachments from "./Attachments";
import { WR_TABS } from "./constant";
import { useTranslation } from 'react-i18next';

// const emptyValue = "-------";
const emptySet = {};
export default function WRForm({ activeTab, onFieldChange }) {
  const { t } = useTranslation();
  const workRequest = useSelector(state => selectors.workflow(state).value || emptySet, shallowEqual);
  const { workgroupinformation, reportedbyinformation, eqpConditionInformation, probleminformation, typeInformation, priorityInformation, categoryInformation } = useSelector(state => selectors.workflowItems(state))

  return (
    <>
      <IsVisible
        visible={activeTab === WR_TABS.WR_INFO}>
        <EAMRadioButtonGroup
          title={t('requestOn')}
          id="wrOn"
          value={workRequest.wrOn || "E"}
          onFieldChange={onFieldChange}
          onChangeResetFieldId={["eqplocCode", "locationCode"]}
          resetFieldValue=""
          options={[
            {
              id: "equipment",
              value: "E",
              label: t('equipment'),
              name: "radios",
            },
            {
              id: "location",
              value: "L",
              label: t('location'),
              name: "radios",
            },
          ]}
        />
        {workRequest.wrOn === 'E' ? (
          <NameAndCodeField
            id="eqplocCode"
            type="equipment"
            value={workRequest.eqplocCode || ''}
            onFieldChange={onFieldChange}
          />
        ) :
          (
            <NameAndCodeField
              id="locationCode"
              type="location"
              value={workRequest.locationCode || ''}
              onFieldChange={onFieldChange}
            />
          )}
          <WorkRequestAttachments slideView />
        <EAMTextarea
          id="wrDesc"
          title={t("details")}
          value={workRequest.wrDesc}
          onFieldChange={onFieldChange}
        />
        <EAMEqpLocFieldText
          title={t('location')}
          labelName="locationDesc"
          valueName="locationcode"
          eqpLocCode={workRequest.wrOn === 'E' ? workRequest.eqplocCode : workRequest.locationCode}
          eqpLocFlag={workRequest.wrOn}
        />
        <EAMSelect
          id="wrPriority"
          title={t('priority')}
          value={workRequest.wrPriority}
          onFieldChange={onFieldChange}
          labelField="priorityDesc"
          valueField="priorityCode"
          options={priorityInformation}
        />
        <FormRow>
          <EAMSelect
            id="wrType"
            title={t("type")}
            value={workRequest.wrType}
            onFieldChange={onFieldChange}
            labelField="typeDesc"
            valueField="typeCode"
            options={typeInformation}
          />
          <EAMSelect
            id="wrCategory"
            title={t("category")}
            value={workRequest.wrCategory}
            onFieldChange={onFieldChange}
            labelField="categoryDesc"
            valueField="categoryCode"
            options={categoryInformation}
          />
        </FormRow>
        <FormRow>
          <EAMDate
            id="observationDate"
            title={t("reportedDate")}
            value={workRequest.observationDate}
            onFieldChange={onFieldChange}
          />
          <EAMTime
            id="observationTime"
            title={t("reportedTime")}
            value={workRequest.observationTime}
            onFieldChange={onFieldChange}
          />
        </FormRow>
      </IsVisible>
      <IsVisible
        visible={activeTab === WR_TABS.DETAIL}>
        <EAMSelect
          id={{
            value: "problemCode",
            label: "problemDesc",
          }}
          title={t("reportedProblem")}
          shouldFormat
          value={workRequest.problemCode}
          onFieldChange={onFieldChange}
          labelField="problemDesc"
          valueField="problemCode"
          options={probleminformation}
        />
        <EAMSelect
          id="equipmentCondition"
          title={t("equipmentCondition")}
          value={workRequest.equipmentCondition}
          onFieldChange={onFieldChange}
          labelField="eqpConditionDesc"
          valueField="eqpConditionCode"
          options={eqpConditionInformation}
        />
        <FormRow>
          <EAMDate
            id="targetDate"
            title={t("targetDate")}
            value={workRequest.targetDate}
            onFieldChange={onFieldChange}
          />
          <EAMTime
            id="targetTime"
            title={t("targetTime")}
            value={workRequest.targetTime}
            onFieldChange={onFieldChange}
          />
        </FormRow>
        <EAMSwitch
          title={t("autoClose")}
          isChecked={workRequest.autoCloseFlag === 'Y'}
          onFieldChange={(id, value) => {
            onFieldChange('autoCloseFlag', value ? 'Y' : 'N')
          }}
        />
        <EAMSelect
          id={{
            value: "reportedByCode",
            label: "reportedByName",
          }}
          title={t("reportedBy")}
          shouldFormat
          value={workRequest.reportedByCode}
          onFieldChange={onFieldChange}
          labelField="reportedbyname"
          valueField="reportedbycode"
          options={reportedbyinformation}
        />
        <EAMText
          id="workPhone"
          title='Phone'
          value={workRequest.workPhone}
          onFieldChange={onFieldChange}
        />
        <EAMSelect
          title='Work Group'
          shouldFormat
          id="workGroup"
          value={workRequest.workGroup}
          onFieldChange={onFieldChange}
          labelField="workgroupdesc"
          valueField="workgroupcode"
          options={workgroupinformation}
        />
        <EAMTextarea
          id="observationDetails"
          title='Additional Remarks'
          value={workRequest.observationDetails}
          placeholder="Enter additional remarks (optional)"
          onFieldChange={onFieldChange}
        />
      </IsVisible>
      <IsVisible
        visible={activeTab === WR_TABS.ATTACHMENT}>
        <WorkRequestAttachments onFieldChange={onFieldChange} />
      </IsVisible>

    </>
  )
}