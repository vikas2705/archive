import React, { useState, useRef } from "react";
import { ExtContainer, ExtDatefield, ExtButton, ExtFormpanel } from "@sencha/ext-react-modern";
import { useDispatch, shallowEqual, useSelector, } from "react-redux";

import { RTSelect, RTText, RTPopup } from "../../../../components/src/components";

import NameAndCodeField from "../../../../components/NameAndCodeField";
import { deepClone } from 'fast-json-patch';
import FullScreenDialog from "../../../../components/FullScreenDialog";
import actions from "../../../../actions";

function FilterPopup(props) {
    const { display, onHide } = props;
    const wrkReqMetadata = useSelector(state => state.workrequest.wrkReqMetadata || {}, shallowEqual),
        wrkReqListFilter = useSelector(state => deepClone(state.workrequest.wrkReqListFilter) || {}, shallowEqual);

    const [value, setValue] = useState(wrkReqListFilter);
    const formRef = useRef();
    const dispatch = useDispatch();

    const handleSubmit = function (reset) {
        var form = formRef.current.cmp;
        if (reset) {
            form.reset();
            setValue({});
        } else {
            var values = form.getValues();
            dispatch(actions.workRequest.applyFilter(values));
            onHide();
            dispatch(actions.workRequest.refresh(true));
        }
    };


    const handleFieldChange = (field, value) => {
    };

    return (
        <FullScreenDialog
            modalTitle="Filter"
            open={display}
            modalContent={
                <ExtFormpanel ref={formRef}>
                    <ExtContainer layout="vbox" cls="filterpopup_bodycontainer">
                        <RTSelect
                            label="Search In"
                            options={wrkReqMetadata.workreqfilterinformation}
                            displayField="workfiltercmbdesc"
                            valueField="workfiltercmbcode"
                            name="srchby"
                            value={value.srchby || ""}
                        />
                        <RTText label="Search Text" name="srchbyinpval" value={value.srchbyinpval || ""} />
                        <RTSelect
                            label="Request On"
                            options={wrkReqMetadata.workReqOnInformation}
                            displayField="wrOnDesc"
                            valueField="wrOnCode"
                            name="workrequestOn"
                            value={value.workrequestOn || ""}
                        />
                        <NameAndCodeField
                            id="eqplocCode"
                            label={"Equipment Name & code"}
                            type="equipment"
                            value={value.equipmentCode || ""}
                            onFieldChange={handleFieldChange}
                        />
                        <NameAndCodeField
                            id="locationCode"
                            type="location"
                            label={"Location Name & code"}
                            value={value.locationCode || ""}
                            onFieldChange={handleFieldChange}
                        />
                        <RTSelect
                            label="Type"
                            options={wrkReqMetadata.typeInformation}
                            displayField="typeDesc"
                            valueField="typeCode"
                            name="Type"
                            value={value.Type || ""}
                        />
                        <ExtContainer layout="hbox">
                            <RTSelect
                                label="Category"
                                options={wrkReqMetadata.categoryInformation}
                                displayField="categoryDesc"
                                valueField="categoryCode"
                                className="rtfieldbox-flex"
                                name="Category"
                                value={value.Category || ""}
                            />
                            <RTSelect
                                label="Priority"
                                options={wrkReqMetadata.priorityInformation}
                                displayField="priorityDesc"
                                valueField="priorityCode"
                                labelAlign="left"
                                className="rtfieldbox-flex"
                                name="Priority"
                                value={value.Priority || ""}
                            />
                        </ExtContainer>
                        <RTSelect
                            label={"Work Group Name & Code"}
                            options={deepClone(wrkReqMetadata.workgroupinformation)}
                            displayField="workgroupdesc"
                            valueField="workgroupcode"
                            name="workGroup"
                            value={value.workGroup || ""}
                            isCombine="true"
                        />
                        <RTSelect
                            label={"Planning Group Name & Code"}
                            options={deepClone(wrkReqMetadata.Plangroupinformation)}
                            displayField="PlangroupDesc"
                            valueField="PlangroupCode"
                            name="PlangroupCode"
                            value={value.PlangroupCode || ""}
                            isCombine="true"
                        />
                        <ExtContainer layout="hbox">
                            <ExtDatefield
                                destroyPickerOnHide
                                label="From Date"
                                picker="floated"
                                cls="rtfieldbox rtfieldbox-flex"
                                name="fromDate"
                                value={value.fromDate || ""}
                            /> <ExtDatefield
                                destroyPickerOnHide
                                label="To Date"
                                cls="rtfieldbox rtfieldbox-flex"
                                picker="floated"
                                name="toDate"
                                value={value.toDate || ""}
                            />
                        </ExtContainer>
                        <RTSelect
                            label={"Reported By"}
                            options={wrkReqMetadata.reportedbyinformation}
                            displayField="reportedbyname"
                            valueField="reportedbycode"
                            name="reportedBy"
                            value={value.reportedBy || ""}
                        />
                    </ExtContainer>
                    <ExtContainer>
                        <ExtContainer layout="hbox" cls="filterpopup_btmcontainer" >
                            <ExtButton text="Reset" cls="filterpopup_btmbtns" onTap={() => { handleSubmit(true) }} />
                            <ExtButton text="Apply" cls="filterpopup_btmbtns apply" onTap={() => { handleSubmit() }} />
                        </ExtContainer>
                    </ExtContainer>
                </ExtFormpanel>
            }
            onClose={onHide}
        />
    )
}


export default FilterPopup;