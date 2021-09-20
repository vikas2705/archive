import React, { useState } from "react";
import { useNavigation } from "../../../../app/trackedContext";
import { ExtContainer, ExtButton } from "@sencha/ext-react-modern";
import { Popover } from "@material-ui/core";
import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
import "../../../../resources/css/workRequest/wrkreqbtmbtnaction.css";
import WrkReqListActionPopup from './WrkReqListActionPopup';

function WorkReqBtmBtnAction(props) {
    const { popUpList, onComplete, wrkReqSummary, activeTab } = props;
    const [more, setMore] = useState({
        action: false,
        el: ""
    });
    const [display, setDisplay] = useState({
        open: false
    });
    const onPopoverClose = () => {
        setMore({
            action: false,
            el: ""
        });
    };
    const dispatch = useDispatch(),
    history = useHistory();
    const onHide = () => {
        setDisplay({
            open: false
        });
    },
        handleDisplay = ({ sender }) => {
            var text = sender.getText();
            if (text) {
                setDisplay({
                    open: true,
                    btnText: text,
                    isMulti: wrkReqSummary ? false : true,
                    btnCode : sender.getValue()
                });
            }
        };

    let btmSecBtnCls = "";

    if (popUpList.length === 1) {
        btmSecBtnCls = "onewrkreqlistaction";
    } else if (popUpList.length === 2) {
        btmSecBtnCls = "twowrkreqlistaction";
    }

    return (
        <>
            <ExtContainer layout="hbox" height="50">
                {popUpList.length > 0 && <>
                    {popUpList.length > 3 && <>
                        <ExtButton iconCls="x-fa fa-ellipsis-h" text="More Actions" cls="wrkreq_btmsec_btn3"
                            onTap={({ sender }) => {
                                setMore({
                                    action: true,
                                    el: sender.innerElement.dom
                                });
                            }} />
                        {more.action && <Popover
                            open={more.action}
                            anchorEl={more.el}
                            onClose={onPopoverClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            className="popUp"
                        >
                            {popUpList.map((data, index) => {
                                if (index >= 2 && data.AllowedActionCode !== "EDT" && data.AllowedActionCode !=="CPY") {
                                    return (
                                        <p key={"popUpItem_" + index} className="popUpItem" onClick={(e) => {
                                            if (e.target.textContent) {
                                                setDisplay({
                                                    open: true,
                                                    btnText: e.target.textContent,
                                                    isMulti: wrkReqSummary ? false : true,
                                                    btnCode : data.AllowedActionCode
                                                });
                                            }
                                        }}>{data.AllowedActionDesc}</p>
                                    )
                                }
                            })}
                        </Popover>}
                    </>
                    }
                    {popUpList.length === 3 &&
                        <ExtButton text={popUpList[2].AllowedActionDesc} value={popUpList[2].AllowedActionCode} cls="wrkreq_btmsec_btn3" onTap={handleDisplay} />
                    }
                    {popUpList[1] &&
                        <ExtButton text={popUpList[1].AllowedActionDesc} value={popUpList[1].AllowedActionCode} cls={"wrkreq_btmsec_btn2 " + btmSecBtnCls} onTap={handleDisplay} />
                    }
                    <ExtButton text={popUpList[0].AllowedActionDesc} value={popUpList[0].AllowedActionCode} cls={"wrkreq_btmsec_btn1 " + btmSecBtnCls} onTap={handleDisplay} />
                </>
                }
                {!!display.open && popUpList.length > 0 && <WrkReqListActionPopup display={display} 
                activeTab={activeTab} onHide={onHide}
                    onOk={() => {
                        if (wrkReqSummary) {
                            history.goBack();
                        } else {
                            onPopoverClose();
                            onHide();
                            onComplete();
                        }
                    }} />}
            </ExtContainer>
        </>
    )
}


export default React.memo(WorkReqBtmBtnAction);