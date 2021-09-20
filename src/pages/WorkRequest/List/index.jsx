import { makeStyles } from "@material-ui/styles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import actions from "../../../actions";
import PageHeader from "../../../components/PageHeader";
import { selectors } from "../../../reducers";
import Spinner from "../../../components/Spinner";
import WorkRequestListing from "./View";
import { Typography } from "@material-ui/core";
import EAMTabs from "../../../components/EAMTabs";
import { ACTION_LIST_MAP } from "./util";
import EAMButton from "../../../components/EAMButton";
import { useConfirmationDialog } from "../../../components/EAMConfirmDialog";
import EAMMenu from "../../../components/EAMMenu";
import WorkRequestListFilter from "./Filter";

const useStyles = makeStyles({
  container: {
    height: '100%'
  },
  wrapper: {
    height: 'calc(100% - 61px)',
    flex: '1',
    display: 'flex',
    flexDirection: 'column'
  },
  listWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto'
  },
  spinner: {
    margin: 'auto',
  },
  count: {
    fontWeight: '800',
    fontSize: 16,
    color: '#33415C',
    textAlign: 'center'
  },
  status: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  actionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    background: '#FFFFFF',
    boxShadow: '0px -4px 4px rgba(0, 0, 0, 0.05)',
    zIndex: 999,
  },
  moreBtn: {
    borderRight: '1px solid #e9ebef'
  }
})
const emptySet = [];
export default function WorkRequestList(props) {
  const match = useRouteMatch();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { getConfirmation } = useConfirmationDialog();
  const { groupBy, status: subGroup } = match.params;
  const hideTopFilterPanel = groupBy === 'Status' && subGroup !== undefined;
  const [showFilterScreen, setShowFilterScreen] = useState(false);
  const isAnyWRItemSelected = useSelector(state => selectors.isAnyWRItemSelected(state, groupBy));
  const statusName = useSelector(state => {
    selectors.workRequestStatusName(state, groupBy, subGroup)
  });

  console.log("statusName", statusName)
  const workRequestCountArr = useSelector(state => {
    const { count } = selectors.workRequestListObj(state, groupBy);
    if (!Array.isArray(count?.workrequestcount)) {
      return undefined;
    }
    return count.workrequestcount.map(i => ({ label: i.tabdata, value: i.tabvalue, id: i.hdn_card_code, circlecolor: i.circlecolor, icon: <Typography className={classes.count}>{i.tabvalue}</Typography> }))
  }, shallowEqual);

  const activeTabIndex = useSelector(state => {
    const { count, taskStatus } = selectors.workRequestListObj(state, groupBy);
    console.log("taskStatus", taskStatus)
    if (!Array.isArray(count?.workrequestcount)) {
      return undefined;
    }
    if (!taskStatus) {
      return 0;
    }
    return count.workrequestcount.findIndex(i => i.hdn_card_code === taskStatus);
  }, shallowEqual);

  // const defaultSelectedTab = isManager && workRequestSet.length ? workRequestSet[0].id : undefined;
  const { status, taskStatus } = useSelector(state => {
    const { status, taskStatus } = selectors.workRequestListObj(state, groupBy);
    return { status, taskStatus }
  }, shallowEqual);

  const listActions = useSelector(state => {
    return selectors.workRequestListActions(state, taskStatus);
  }, shallowEqual)

  const [firstAction, secondAction, ...otherActions] = listActions || emptySet;

  const rightActions = useMemo(() => {
    if (!subGroup) {
      return [{
        id: "1",
        type: "icon",
        iconCls: "filter_list-nbicon",
        action: () => { setShowFilterScreen(true) },
      }]
    }
    return [{
      type: 'status',
      action: () => { },
      cls: classes.status,
      text: statusName,
    }]
  }, [classes.status, subGroup, statusName])
  const handleTabChange = useCallback((event, index) => {
    if (index !== activeTabIndex)
      dispatch(actions.workRequestV2.list.updateTaskStatus(groupBy, workRequestCountArr[index].id))
  }, [activeTabIndex, dispatch, groupBy, workRequestCountArr])


  useEffect(() => {
    dispatch(actions.workRequestV2.list.request(groupBy, subGroup))
  }, [dispatch, groupBy, subGroup])
  useEffect(() => {
    if (taskStatus) {
      dispatch(actions.workRequestV2.list.requestActions(taskStatus))
    }
  }, [dispatch, taskStatus])


  // useEffect(() => {
  //   if (isManager) {
  //     if (defaultSelectedTab) {
  //       dispatch(actions.workRequestV2.list.init(groupBy, defaultSelectedTab))
  //     }
  //     return;
  //   }
  //   dispatch(actions.workRequestV2.list.init(groupBy, matchStatus))
  // }, [defaultSelectedTab, dispatch, groupBy, isManager, matchStatus])

  const handleMenuItemClick = useCallback(async (id) => {
    if (["AUT", "REJ", "AUTCRWO", "FRWD", "CNL", "MVPL", "CLS", "REV"].indexOf(id) !== -1) {
      const confirmed = await getConfirmation({
        title: ACTION_LIST_MAP[id].title,
        message: ACTION_LIST_MAP[id].message,
      });
      if (confirmed) {
        dispatch(actions.workRequestV2.list.triggerAction({
          groupBy: groupBy,
          actionFlag: id,
          allSelected: true,
        }))
      }
    }
  }, [dispatch, groupBy, getConfirmation])

  return (
    <div className={classes.container}>
      <PageHeader
        title='Work Request'
        showBack
        rightActions={rightActions}
      // statusName
      />
      <div className={classes.wrapper}>
        <div className={classes.tabContainer}>
        </div>
        {hideTopFilterPanel ? null : <EAMTabs tabsData={workRequestCountArr} value={activeTabIndex} onChange={handleTabChange} />}
        <div className={classes.listWrapper}>
          {status === 'requested' ?
            (
              (<Spinner speed={0.5} className={classes.spinner} type="moon" size={100} />)
            ) :
            <WorkRequestListing
              canManage={!hideTopFilterPanel}
            />
          }
        </div>
        {!hideTopFilterPanel && isAnyWRItemSelected ? (
          <div className={classes.actionWrapper}>
            {otherActions?.length ? (
              <EAMMenu
                id="wRActions"
                onMenuItemClick={handleMenuItemClick}
                label={<EAMButton className={classes.moreBtn} variant="secondary">More Actions</EAMButton>}
                value={otherActions}
              />
            ) : null}

            {secondAction ? (
              <EAMButton onClick={() => { handleMenuItemClick(secondAction.id) }} variant="secondary">{secondAction?.label || ''}</EAMButton>
            ) : null}
            {secondAction ? (
              <EAMButton onClick={() => { handleMenuItemClick(firstAction.id) }}>{firstAction?.label || ''}</EAMButton>
            ) : null}

          </div>
        ) : null}
        {showFilterScreen ? (
          <WorkRequestListFilter
            onClose={() => { setShowFilterScreen(false) }}
          />
        ) : null}
      </div>

    </div>
  )
}
