import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import actions from "../../../../actions";
import EAMButton from "../../../../components/EAMButton";
import EAMSelect from "../../../../components/EAMSelect";
import FormRow from "../../../../components/Form/FormRow";
import FormWrapper from "../../../../components/Form/FormWrapper";
import FullScreenDialog from "../../../../components/FullScreenDialog";
import NameAndCodeField from "../../../../components/NameAndCodeField";
import { selectors } from "../../../../reducers";

const emptyObj = {};
export default function WorkRequestListFilter({ onClose }) {
  const match = useRouteMatch();
  const { groupBy } = match.params;
  const dispatch = useDispatch();
  const filterDefault = useSelector(state => selectors.workRequestListFilter(state, groupBy));
  const [filter, setFilter] = useState(filterDefault || {});
  const handleClose = () => {
    onClose();
  }
  const handleFilterSave = () => {
    dispatch(actions.workRequestV2.list.setFilter(groupBy, filter));
    handleClose();
  }
  const { reportedbyinformation, Plangroupinformation, workgroupinformation, priorityInformation, categoryInformation, workReqOnInformation, workreqfilterinformation, } = useSelector(state => selectors.workRequestFilterOptions(state)?.value || emptyObj, shallowEqual);
  const handleChange = (id, value) => {
    console.log("id, value", id, value)
    setFilter({ ...filter, [id]: value });
  }
  useEffect(() => {
    dispatch(actions.workRequestV2.filterOpts.init());
  }, [dispatch])
  return (
    <FullScreenDialog
      modalTitle="Filter"
      open
      onClose={handleClose}
      modalContent={(
        <>
          <FormWrapper>
            <EAMSelect
              id="srchby"
              shouldFormat
              title='Search In'
              value={filter.SupervisorCode}
              onFieldChange={handleChange}
              labelField="workfiltercmbdesc"
              valueField="workfiltercmbcode"
              options={workreqfilterinformation}
            />
            <EAMSelect
              id="WorkrequestOn"
              shouldFormat
              title='Request On'
              value={filter.WorkrequestOn}
              onFieldChange={handleChange}
              labelField="wrOnDesc"
              valueField="wrOnCode"
              options={workReqOnInformation}
            />
            <NameAndCodeField
              id="equipmentCode"
              label={"Equipment Name & code"}
              type="equipment"
              value={filter.equipmentCode || ""}
              onFieldChange={handleChange}
            />
            <NameAndCodeField
              id="locationCode"
              type="location"
              label={"Location Name & code"}
              value={filter.locationCode || ""}
              onFieldChange={handleChange}
            />
            <FormRow>
              <EAMSelect
                id="Category"
                shouldFormat
                title='Category'
                value={filter.Category}
                onFieldChange={handleChange}
                labelField="categoryDesc"
                valueField="categoryCode"
                options={categoryInformation}
              />
              <EAMSelect
                id="Priority"
                shouldFormat
                title='Priority'
                value={filter.Category}
                onFieldChange={handleChange}
                labelField="priorityDesc"
                valueField="priorityCode"
                options={priorityInformation}
              />
            </FormRow>
            <EAMSelect
              id="workGroup"
              shouldFormat
              title='Work Group Name & Code'
              value={filter.workGroup}
              onFieldChange={handleChange}
              labelField="workgroupdesc"
              valueField="workgroupcode"
              options={workgroupinformation}
            />
            <EAMSelect
              id="PlangroupCode"
              shouldFormat
              title='Planning Group Name & Code'
              value={filter.PlangroupCode}
              onFieldChange={handleChange}
              labelField="PlangroupDesc"
              valueField="PlangroupCode"
              options={Plangroupinformation}
            />
            <EAMSelect
              id="reportedBy"
              shouldFormat
              title='Reported By'
              value={filter.reportedBy}
              onFieldChange={handleChange}
              labelField="reportedbyname"
              valueField="reportedbycode"
              options={reportedbyinformation}
            />
          </FormWrapper>
          <EAMButton variant="primary" onClick={handleFilterSave}>Save</EAMButton>

        </>
      )

      }
    />
  )
}