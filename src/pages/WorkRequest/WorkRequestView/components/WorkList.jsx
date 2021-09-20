import React, { useState, useRef } from "react";
import moment from "moment";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Popover } from "@material-ui/core";
import WrkReqListActionPopup from './WrkReqListActionPopup';
import { deepClone } from 'fast-json-patch';
import { useHistory, useLocation } from 'react-router-dom';
import actions from "../../../../actions";

function WorkList(props) {
    const { index, data, popUpList, onCheckBoxStateChange, checkable, activeTab } = props;
    const [popUp, setPopUp] = useState({
        open: false
    });

    const multiWrkReqSelection = useSelector(state => state.workrequest.multiWrkReqSelection || [], shallowEqual);

    const location = useLocation();
    const [popOver, setPopOver] = useState(false);

    const dispatch = useDispatch(),
        moreRef = useRef(), history = useHistory();

    const handleClick = (e) => {
        // dispatch(actions.workRequest.singleWRSelection(data));
        // history.push(`${location.pathname}/details`, {
        //     activeTab: activeTab,
        //     data: data,
        //     popUpList: popUpList
        // });
    };

    return (
        <div className="wrkreqstatus_listsec" key={"wrkreqstatus_listsec_" + index}>
            <div style={{ display: "flex" }} key={"wrkreqstatus_flex_" + index}>
                {!!checkable &&
                    <input type="checkbox" name="wrkreqchck" className="wrkreqst_listitem"
                        key={"wrkreqst_listitem_" + index} style={{ minHeight: "14px", minWidth: "14px" }}
                        onChange={onCheckBoxStateChange} onClick={(e) => {
                            let clone = deepClone(multiWrkReqSelection);
                            dispatch(actions.workRequest.multiWRSelection(clone.concat(data)));
                        }} />
                }
                {!checkable &&
                    <div style={{ margin: "7px" }} key={"wrkreqst_listitem_" + index} />
                }
                <div className="listitem_wrkreqnum" key={"listitem_wrkreqnum_" + index} onClick={handleClick}>{data.workrequestNoout}</div>
                <div className="wrkreqst_listitem_morevert nebula-icons more_vert-nbicon" key={"wrkreqst_listitem_morevert_" + index} ref={moreRef}
                    onClick={() => {
                        dispatch(actions.workRequest.singleWRSelection(data));
                        setPopOver(!popOver);
                    }}></div>
                {popOver && popUpList && popUpList.length > 0 &&
                    <Popover
                        open={popOver}
                        anchorEl={moreRef.current}
                        onClose={() => { setPopOver(!popOver) }}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        className="popUp"
                    >
                        {popUpList.map((popupData, index) => {
                            return (
                                <p key={"popUpItem_prompt_" + index} className="popUpItem" onClick={(e) => {
                                    if (popupData.AllowedActionCode === "EDT") {
                                        history.push(`${location.pathname}/create`, {
                                            mode: "edit",
                                            workflow: data
                                        });
                                    } else if (popupData.AllowedActionCode === "CPY") {
                                        history.push(`${location.pathname}/create`, {
                                            mode: "copy",
                                            workflow: data
                                        });
                                    } else if (e.target.textContent) {
                                        setPopUp({
                                            open: !popUp.open,
                                            btnText: e.target.textContent,
                                            isMulti: false,
                                            btnCode: popupData.AllowedActionCode
                                        });
                                    }
                                }}>{popupData.AllowedActionDesc}</p>
                            )
                        })}
                    </Popover>
                }
            </div>
            <div className="wrkreqst_listitem" onClick={handleClick}
                style={{ margin: "0px 0px 5px 15px", lineHeight: "20px", overflow: "hidden", maxHeight: "40px", color: "#001845" }}>
                {data.wrDesc}</div>
            <div style={{ display: "flex" }} onClick={handleClick} >
                <div className="wrkreqst_listitem_dateset nebula-icons date_range-nbicon"></div>
                <div className="wrkreqst_listitem" style={{ margin: "8px 0px 10px 0px" }}>{moment(data.date).format("DD/MM/YYYY")}</div>
                <div className="wrkreqst_listitem_dateset material-icons">settings</div>
                <div className="wrkreqst_listitem" style={{ margin: "8px 10px 10px 0px" }}>{data.equipmentCodeout}</div>
            </div>
            {!!popUp.open && popUpList.length > 0 && <WrkReqListActionPopup display={popUp}
                activeTab={activeTab}
                onHide={() => { setPopUp({ open: !popUp.open }) }}
                onOk={() => {
                    setPopUp({ open: !popUp.open });
                    setPopOver(!popOver);
                }} />}
        </div>
    )
}

export default WorkList;