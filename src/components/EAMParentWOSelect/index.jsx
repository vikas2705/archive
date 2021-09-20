import React, { useEffect } from "react";
import { selectors } from "../../reducers";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import actions from "../../actions";
import EAMSelect from "../EAMSelect";

const emptySet = [];
export default function EAMParentWOSelect({ onFieldChange, eqpLocCode, eqpOrLoc, value, title, id, }) {
  const dispatch = useDispatch();
  const options = useSelector(state => selectors.workOrderParentList(state, { eqpLocCode, eqpOrLoc }) || emptySet, shallowEqual);
  useEffect(() => {
    dispatch(actions.workOrder.update.parentListItem.request({ eqpLocCode, eqpOrLoc }))
  }, [dispatch, eqpLocCode, eqpOrLoc])
  return (
    <>
      <EAMSelect
        id={id}
        title={title}
        shouldFormat
        value={value}
        onFieldChange={onFieldChange}
        labelField="ParentWODesc"
        valueField="ParentWOCode"
        options={options}
      />
    </>
  );
}