import React, { useEffect, useRef, useState } from "react";
import { ExtContainer, ExtButton, ExtLabel, ExtFormpanel } from "@sencha/ext-react-modern";
import { connect, useDispatch } from "react-redux";

import { POST_WRK_REQ_ACTIONS } from '../../../../queries/workRequest/postWorkReqActions';
import { RTPopup, RTText, RTSelect } from "../../../../components/src/components";

import { deepClone } from 'fast-json-patch';

const Ext = window.Ext,
    BusyCursor = window.BusyCursor;


function WrkReqListActionPopup(props) {
    const { display, onHide, onOk, activeTab, singleWrkReqSelection, multiWrkReqSelection,
        wrkReqMetadata, wrkReqListFilter } = props;
    const formRef = useRef();
    const [postData, setPostData] = useState({});
    const [rejectReason, setRejectReason] = useState("");
    const mutation = POST_WRK_REQ_ACTIONS(postData);

    const dispatch = useDispatch();

    useEffect(() => {
        let { data, error, isLoading, isSuccess, isError } = mutation;
        if (isLoading) {
            console.log("loading");
            BusyCursor.show();
        }
        else if (isSuccess && data) {
            BusyCursor.hide();
            //let postUpdate = data.workRequest_postStatusUpdate && data.workRequest_postStatusUpdate.processtheWorkRequestbasedontheActionTypeflag,
                // countData = data.gettheCountofWorkRequestsgroupedbyStatus && data.gettheCountofWorkRequestsgroupedbyStatus.data,
                // listData = data.getthelistofWorkRequests && data.getthelistofWorkRequests.data && data.getthelistofWorkRequests.data.GetWorkReqInfo;
            let postUpdate = data.workRequest_postWrkReqs && data.workRequest_postWrkReqs.processtheWorkRequestbasedontheActionTypeflag;
            dispatch({ type: "refreshContext", payload: true });
            // dispatch({ type: "countBySts", payload: countData });
            // dispatch({
            //     type: "wrkReqBySts",
            //     payload: listData
            // });
            dispatch({
                type: "multiwrkreqselection", payload: []
            });
            onOk();
            let wrNo = "";
            if(postUpdate.data && postUpdate.data.length >0){
                wrNo = (postUpdate.data.length === 1) ? postUpdate.data.workrequestNo : (postUpdate.data.length + " WRs");
            }
        
            if (display.btnCode === "AUT") {
                Ext.toast(wrNo + ' Authorized!!');
            } else if (display.btnCode === "REJ") {
                Ext.toast(wrNo + ' Rejected!!');
            } else if (display.btnCode === "AUTCRWO") {
                Ext.toast(wrNo + ' Authorized and Created WO!!');
            } else if (display.btnCode === "FRWD") {
                Ext.toast(wrNo + ' Forwarded!!');
            } else if (display.btnCode === "CPY") {
                Ext.toast(wrNo + ' Copied!!');
            } else if (display.btnCode === "CNL") {
                Ext.toast(wrNo + ' Cancelled!!');
            } else if (display.btnCode === "MVPL") {
                Ext.toast(wrNo + ' Moved to Pending List!!');
            } else if (display.btnCode === "CLS") {
                Ext.toast(wrNo + ' Closed!!');
            } else if (display.btnCode === "REV") {
                Ext.toast(wrNo + ' Reversed!!');
            }
            //navigate for copy,edit
        }
        else if (isError && error) {
            BusyCursor.hide();
            console.log(error);
            Ext.Msg.alert("Error", error.message);
            Ext.Msg.setHideAnimation(null);
        }
    }, [mutation]);

    let actionCls = "", title = "",
        selection = display.isMulti ?
            (multiWrkReqSelection && multiWrkReqSelection.length) : (singleWrkReqSelection && singleWrkReqSelection.workrequestNoout);
    if (display.btnCode === "AUTCRWO") {
        actionCls = "AUT";
        title = display.isMulti ? (" " + selection + " Selected WR(s)") : "";
    } else if (display.btnCode === "MVPL") {
        actionCls = "REJ";
        title = display.isMulti ? (" " + selection + " Selected WR(s)") : "";
    } else {
        title = display.isMulti ? (" " + selection + " Selected WR(s)") : " Work Request";
    }

    return (
        <div>
            <RTPopup
                displayed={display.open}
                tools={{
                    itemId: 'actionPopupClose',
                    iconCls: 'nebula-icons close-nbicon',
                    handler: function () {
                        onHide();
                    }
                }}
                hideOnMaskTap="true"
                title={display.btnText + title}
                width="320"
                height={display.btnCode === "REJ" ? "50%" : "210"}
                centered={display.btnCode === "FRWD" ? "" : "true"}
                bodyPadding="0"
                cls={"filterpopup-wrapper actionpopup-title" + (display.btnCode === "FRWD" ? " actionpopup-forward" : "")}
            >
                <ExtContainer layout="vbox">
                    <ExtLabel cls="wrkreqactionpopup-content"
                        html={"Are you sure, you want to " + (display.btnText) +
                            (display.isMulti ? (" " + selection + " Selected WR(s)?") : (" " + selection + "?"))}
                    />
                </ExtContainer>
                {(display.btnCode === "REJ" || display.btnCode === "FRWD") &&
                    <ExtFormpanel padding="0 10" ref={formRef}>
                        {display.btnCode === "REJ" && <>
                            <RTSelect
                                label="Rejection Reason Code"
                                options={wrkReqMetadata.reasonforrejectioninformation}
                                displayField="reasonforrejectioncode"
                                valueField="reasonforrejectioncode"
                                name="rejectionReason"
                                onSelect={({ sender }) => {
                                    let selection = sender.getSelection(),
                                        data = selection && selection.data;
                                    setRejectReason(data.reasonforrejectiondesc);
                                }}
                            />
                            <RTText label="Rejection Description" value={rejectReason} disabled="true" className="wrkreq-rejecttext" />
                        </>}
                        {display.btnCode === "FRWD" && <>
                            <RTSelect
                                label={"Employee Name & Code"}
                                name="forwardToUser"
                                options={deepClone(wrkReqMetadata.ForwardtoUserinfo)}
                                displayField="ForwardtoEmployeeDesc"
                                valueField="ForwardtoEmployeeCode"
                                isCombine="true"

                            />
                        </>}
                    </ExtFormpanel>
                }
                <ExtContainer layout="hbox" cls="filterpopup_btmcontainer" >
                    <ExtButton text={(display.btnCode === "CNL") ? "Exit" : "Cancel"} cls="actionpopup_btmbtn_reset" onTap={onHide} />
                    <ExtButton text={(display.btnCode === "CNL") ? (display.btnText + " WR") : display.btnText}
                        cls={"actionpopup_btmbtn_ok wrkaction-" + (actionCls !== "" ? actionCls : display.btnCode)}
                        onTap={(e) => {
                            let values = {};
                            if (display.btnCode === "FRWD" || display.btnCode === "REJ") {
                                var form = formRef.current.cmp;
                                values = form.getValues();
                            }
                            var dataArray = [];
                            if (display.isMulti) {
                                for (var i in multiWrkReqSelection) {
                                    dataArray.push(
                                        {
                                            actionFlag: display.btnCode,
                                            workrequestNo: multiWrkReqSelection[i].workrequestNoout,
                                            forwardToUser: values.forwardToUser || "",
                                            Guid: multiWrkReqSelection[i].Guid,
                                            rejectionReason: values.rejectionReason || "",
                                            Timestamp: multiWrkReqSelection[i].timestamp
                                        }
                                    )
                                }
                                setPostData({
                                    workRequest_ProcessWorkReqInfo2Input: dataArray
                                });
                            } else {
                                setPostData({
                                    workRequest_ProcessWorkReqInfo2Input: [{
                                        actionFlag: display.btnCode,
                                        workrequestNo: singleWrkReqSelection.workrequestNoout,
                                        forwardToUser: values.forwardToUser || "",
                                        Guid: singleWrkReqSelection.Guid,
                                        rejectionReason: "",
                                        Timestamp: singleWrkReqSelection.timestamp
                                    }]
                                });
                            }
                            mutation.mutate();
                        }} />
                </ExtContainer>
            </RTPopup>
        </div>
    )
}

const mapStateToProps = (
    {
        workrequest: {
            wrkReqMetadata,
            singleWrkReqSelection,
            multiWrkReqSelection,
            wrkReqListFilter
        }
    }
) => {
    return {
        wrkReqMetadata, singleWrkReqSelection, multiWrkReqSelection, wrkReqListFilter
    };
};

export default connect(mapStateToProps)(React.memo(WrkReqListActionPopup));