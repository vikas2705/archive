import React, { useState, useEffect, useRef } from "react";
import { ExtContainer, ExtButton, ExtLabel } from "@sencha/ext-react-modern";
import WorkList from "./WorkList";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import WorkReqBtmBtnAction from "./WorkReqBtmBtnAction";
import { GET_WRK_REQ_LIST } from '../../../../queries/workRequest/getWrkReqsBySts';
import { GETCOUNTBYSTS } from '../../../../queries/workRequest/getCountBySts';
import { RTTabControl } from '../../../../components/src/components'
import FilterPopup from './FilterPopup';
import { deepClone } from 'fast-json-patch';
import InfiniteScroll from "react-infinite-scroll-component";
import actions from "../../../../actions";
import { useLazyQuery } from "@apollo/react-hooks";
import { groupBy } from "lodash";

const Ext = window.Ext,
    BusyCursor = window.BusyCursor;

function WorkStatusTab(props) {
    const { activeTab, location, onTabChange, display, onPopupHide } = props;

    const refreshContext = useSelector(state => state.workrequest.refreshContext || false, shallowEqual),
        wrkReqListActions = useSelector(state => state.workrequest.wrkReqListActions || [], shallowEqual),
        countBySts = useSelector(state => state.workrequest.countBySts || {}, shallowEqual),
        wrkReqListFilter = useSelector(state => deepClone(state.workrequest.wrkReqListFilter) || {}, shallowEqual),
        wrkReqBySts = useSelector(state => state.workrequest.wrkReqBySts || [], shallowEqual);

    const [checked, setChecked] = useState({
        enabled: false,
        count: 0
    });
    const [state, setState] = useState("");
    const [next, setNext] = useState(false);
    const [pagination, setPagination] = useState({
        skip: 0,
        hasMore: true
    });
    const scrollRef = useRef();
    let initialLaunch = pagination.isFirst,
        groupBy = location && location.state && location.state.groupBy,
        queryInputData = {
            Category: wrkReqListFilter.Category || "",
            LocDesc: wrkReqListFilter.LocDesc || "",
            PlangroupCode: wrkReqListFilter.PlangroupCode || "",
            Priority: groupBy.includes("Priority") ? (location.state && location.state.hdn_card_code) : (wrkReqListFilter.Priority || ""),
            ReportedTimeCode: groupBy.includes("RepDate") ? (location.state && location.state.hdn_card_code) : "",
            Type: wrkReqListFilter.Type || "",
            WorkrequestNo: wrkReqListFilter.WorkrequestNo || "",
            WorkrequestOn: wrkReqListFilter.workrequestOn || "",
            workrequestOn: wrkReqListFilter.workrequestOn || "",
            equipmentCode: wrkReqListFilter.equipmentCode || "",
            fromDate: wrkReqListFilter.fromDate || "",
            locationCode: wrkReqListFilter.locationCode || "",
            reportedBy: wrkReqListFilter.reportedBy || "",
            srchby: wrkReqListFilter.srchby || "",
            srchbyinpval: wrkReqListFilter.srchbyinpval || "",
            toDate: wrkReqListFilter.toDate || "",
            workGroup: wrkReqListFilter.workGroup || "",
            status: activeTab.hdn_card_code,
            groupBy: groupBy || "",
            Actionflag: (location.state && location.state.Actionflag) || "",
            skip: pagination.skip
        };

    if (queryInputData.Category !== "" || queryInputData.LocDesc !== "" || queryInputData.PlangroupCode !== "" ||
        queryInputData.Priority !== "" || queryInputData.Type !== "" || queryInputData.WorkrequestOn !== "" ||
        queryInputData.equipmentCode !== "" || queryInputData.fromDate !== "" || queryInputData.locationCode !== "" ||
        queryInputData.reportedBy !== "" || queryInputData.srchby !== "" || queryInputData.srchbyinpval !== "" ||
        queryInputData.toDate !== "" || queryInputData.workGroup !== "") {
        queryInputData.Actionflag = "filter";
        queryInputData.CACHE_CLEAR = "ALL";
    }

    useEffect(() => {
        setPagination({
            skip: 0,
            hasMore: true
        });
    }, [activeTab]);

    const dispatch = useDispatch();
    const [fetchCount, fetchCountStatus] = useLazyQuery(GETCOUNTBYSTS);
    const [fetchList, fetchListStatus] = useLazyQuery(GET_WRK_REQ_LIST, {
        fetchPolicy: "no-cache",
        context: {
            headers: {
                CACHE_CLEAR: queryInputData.CACHE_CLEAR || false
            }
        },
    });


    useEffect(() => {
        fetchCount({ variables: { ...queryInputData } });
    }, []);


    useEffect(() => {
        if (initialLaunch) {
            setNext(true);
            fetchList({ variables: { ...queryInputData } });
        }
    }, [initialLaunch]);

    useEffect(() => {
        setState(activeTab.tabdata);
        dispatch(actions.workRequest.getListSuccess([]));
        BusyCursor.show();
        fetchCount({ variables: { ...queryInputData } });
        fetchList({ variables: { ...queryInputData } });
    }, [activeTab]);

    useEffect(() => {
        if (refreshContext) {
            dispatch(actions.workRequest.getListSuccess([]));
            setPagination({
                skip: 0,
                hasMore: true
            });
            BusyCursor.show();
            fetchCount({ variables: { ...queryInputData } });
            fetchList({ variables: { ...queryInputData } });
            dispatch(actions.workRequest.refresh(false));
        }
    }, [refreshContext]);

    const wrkReqTabStore = new Ext.data.Store({});

    useEffect(() => {
        let { data, error, loading } = fetchCountStatus;
        if (loading) {
            console.log("loading-count");
        }
        else if (data) {
            let getcountsts = data.workRequest_getCountBySts && data.workRequest_getCountBySts.gettheCountofWorkRequestsgroupedbyStatus,
                countData = getcountsts && getcountsts.data;
            dispatch(actions.workRequest.getCountSuccess(countData));
            BusyCursor.hide();
        }
        else if (error) {
            BusyCursor.hide();
            Ext.Msg.alert("Error", error.message);
            Ext.Msg.setHideAnimation(null);
        }
    }, [fetchCountStatus]);

    useEffect(() => {
        let { data, error, loading } = fetchListStatus;
        if (loading) {
            console.log("loading-wrklist");
        }
        else if (data && data.workRequest_getWrkReqsBySts) {
            let getthelistofWorkRequests = data.workRequest_getWrkReqsBySts.getthelistofWorkRequests,
                wrkList = getthelistofWorkRequests.data && getthelistofWorkRequests.data.GetWorkReqInfo,
                concatData = wrkList, actualData = deepClone(wrkReqBySts);
            if (!pagination.hasMore) {
                return;
            }
            if (next) {
                if (pagination.skip === 0) {
                    if (actualData.length === 0) {
                        concatData = actualData.concat(wrkList);
                    } else if (actualData.length === 15) {
                        setPagination({
                            skip: 15 + pagination.skip,
                            hasMore: true,
                            isFirst: true
                        });
                    } else if (actualData.length < 15) {
                        setPagination({
                            skip: pagination.skip,
                            hasMore: false
                        });
                    }
                } else if (wrkList.length === 15) {
                    concatData = actualData.concat(wrkList);
                    setPagination({
                        skip: pagination.skip + 15,
                        hasMore: true
                    });
                } else {
                    concatData = actualData.concat(wrkList);
                    setPagination({
                        skip: pagination.skip,
                        hasMore: false
                    });
                }
                setNext(false);
            }

            dispatch(actions.workRequest.getListSuccess(concatData));

            if (!next) {
                BusyCursor.hide();
            }
        }
        else if (error) {
            if (!next) {
                BusyCursor.hide();
            }
            console.log(error);
            Ext.Msg.alert("Error", error.message);
            Ext.Msg.setHideAnimation(null);
        }
    }, [fetchListStatus]);

    const onCheckBoxStateChange = function (element, clear) {
        var ele = document.getElementsByName('wrkreqchck'),
            el_state = element ? (element.target && element.target.checked) : false;

        if (clear && !el_state && ele && ele.length > 0) {
            for (var i = 0; i < ele.length; i++) {
                if (ele[i].type == 'checkbox') {
                    ele[i].checked = false;
                }
            }
            setChecked({
                enabled: false,
                count: 0
            });
            dispatch(actions.workRequest.multiWRSelection([]));

        } else {
            setChecked({
                enabled: true,
                count: el_state ? ++checked.count : --checked.count
            });
            if (checked.count === 0) {
                dispatch(actions.workRequest.multiWRSelection([]));
            }
        }
    };

    if (checked.enabled && state != activeTab.tabdata) {
        onCheckBoxStateChange(null, true);
    }

    const fetchMoreData = async () => {
        setNext(true);
        fetchList({ variables: { ...queryInputData } });
    };

    if (wrkReqTabStore && countBySts.workrequestcount) {
        wrkReqTabStore.loadData(countBySts.workrequestcount);
    }

    let checkable = true;
    if (wrkReqListActions && wrkReqListActions.length > 0) {
        if (wrkReqListActions.length === 1) {
            if (wrkReqListActions[0].AllowedActionCode === "EDT" || wrkReqListActions[0].AllowedActionCode === "CPY") {
                checkable = false;
            }
        } else if (wrkReqListActions.length === 2) {
            if (wrkReqListActions[0].AllowedActionCode === "EDT" || wrkReqListActions[0].AllowedActionCode === "CPY") {
                if (wrkReqListActions[1].AllowedActionCode === "EDT" || wrkReqListActions[1].AllowedActionCode === "CPY") {
                    checkable = false;
                }
            }
        }
    }

    return (
        <>
            <RTTabControl isDataview={true} store={wrkReqTabStore}
                dataviewCls="wrkreq_dataview"
                onDataviewSelect={onTabChange}
                itemCls={"x-wrkreqtab-active-" + (activeTab.hdn_card_code)}
                tpl='<div class="wrkreq_tab_dataview"><div class="wrkreq_tab_stsnum {hdn_card_code}">{tabvalue}</div><div class="wrkreq_tab_stsname {hdn_card_code}active">{tabdata}</div></div>'>
            </RTTabControl>
            <div style={{ overflow: "hidden" }}>
                <div style={{ background: "#E7F3FF", overflowY: "scroll", height: "80vh" }} ref={scrollRef} id="wrkreqlistcontainer">
                    <InfiniteScroll
                        id="infinite-scroll-component"
                        dataLength={wrkReqBySts.length}
                        next={fetchMoreData}
                        hasMore={pagination.hasMore}
                        scrollableTarget="wrkreqlistcontainer"
                    >
                        {!!wrkReqBySts && wrkReqBySts.length > 0 && wrkReqBySts.map((data, index) =>
                            <WorkList
                                data={data}
                                key={"worklist_" + index}
                                index={index}
                                activeTab={activeTab}
                                popUpList={wrkReqListActions}
                                checkable={checkable}
                                onCheckBoxStateChange={(e) => { onCheckBoxStateChange(e) }} />
                        )}
                    </InfiniteScroll>
                    {!!checked.enabled && !!checked.count && wrkReqListActions.length > 0 &&
                        <ExtContainer cls="wrkreq_btmsec">
                            <ExtContainer layout="hbox" height="30">
                                <ExtLabel cls="wrkreq_btmsec_info" html={checked.count + " Work Requests Selected"} />
                                <ExtButton cls="wrkreq_btmsec_clear" text="Clear" onTap={(e) => { onCheckBoxStateChange(e, true) }} />
                            </ExtContainer>
                            <WorkReqBtmBtnAction popUpList={wrkReqListActions} activeTab={activeTab}
                                onComplete={() => {
                                    onCheckBoxStateChange(null, true);
                                }} />
                        </ExtContainer>
                    }
                </div>
            </div>
            {display && <FilterPopup display={display} onHide={onPopupHide} />}
        </>
    )
}

export default WorkStatusTab;