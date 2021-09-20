import { makeStyles } from "@material-ui/styles";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useRouteMatch } from "react-router-dom";
import actions from "../../../../actions";
import AssignedIcon from "../../../../assets/Icons/AssignedIcon";
import OverviewIcon from "../../../../assets/Icons/OverviewIcon";
import TimelineIcon from "../../../../assets/Icons/TimelineIcon";
import EAMButton from "../../../../components/EAMButton";
import { useConfirmationDialog } from "../../../../components/EAMConfirmDialog";
import EAMMenu from "../../../../components/EAMMenu";
import EAMTabs from "../../../../components/EAMTabs";
import FormWrapper from "../../../../components/Form/FormWrapper";
import PageHeader from "../../../../components/PageHeader";
import Spinner from "../../../../components/Spinner";
import { selectors } from "../../../../reducers";
import { ACTION_LIST_MAP } from "../../List/util";
import AssignedWO from "./AssignedWO";
import WROverview from "./Overview";
import SuggestedWO from "./SuggestedWO";
import WrTimeline from "./Timeline";
import WRNav from "./WRNav";

const useStyles = makeStyles({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  wrapper: {
    height: 'calc(100% - 71px)',
    flex: '1',
    display: 'flex',
    flexDirection: 'column'
  },
  tabsWrapper: {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
  },
  spinner: {
    margin: 'auto',
  },
  actionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    background: '#FFFFFF',
    boxShadow: '0px -4px 4px rgba(0, 0, 0, 0.05)',
    zIndex: 999,
    minHeight: 50,
  },
  menu: {
    display: 'flex',
    '& > button': {
      marginTop: 'auto',
      marginBottom: 'auto'
    }
  }
})

const emptySet = [];
const Ext = window.Ext;

export default function ViewWorkRequestDetail(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();
  const { wrNo } = match.params;
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const refToTop = useRef();
  const { getConfirmation } = useConfirmationDialog();

  const workRequestDetail = useSelector(state => selectors.workOrderResource(state, wrNo))
  const workRequestActionErrorMsg = useSelector(state => selectors.workRequestActionErrorMsg(state, wrNo))
  
  const availActions = useSelector(state => selectors.workRequestAvailActions(state, wrNo))
  const [firstAction, secondAction, ...otherActions] = availActions || emptySet;
  console.log("availActions", availActions)
  const hasWOAssigned = workRequestDetail?.value?.SuggestedOrAssignedWOFlag;
  useEffect(() => {
    refToTop?.current?.scrollIntoView();
  }, [activeTabIndex])

  useEffect(() => {
    dispatch(actions.workRequestV2.resource.request(wrNo))
    dispatch(actions.workRequestV2.resource.requestActions(wrNo))
  }, [dispatch, wrNo])

  const tabsData = useMemo(() => {
    const arr = [
      { label: 'WR Overview', icon: <OverviewIcon /> },
      { label: 'Timeline', icon: <TimelineIcon /> }
    ];
    if (hasWOAssigned) {
      arr.unshift({ label: 'Assigned WO', icon: <AssignedIcon /> },)
    }
    else {
      arr.unshift({ label: 'Suggested WO', icon: <AssignedIcon /> },)
    }
    return arr;
  }, [hasWOAssigned]);

  const renderData = () => {
    if (activeTabIndex === 0) {
      if (hasWOAssigned) {
        return (
          <FormWrapper>
            <AssignedWO wrNo={wrNo} />
          </FormWrapper>
        )
      }
      else {
        return (
          <SuggestedWO wrNo={wrNo} />
        )
      }
    } else if (activeTabIndex === 1) {
      return (
        <FormWrapper wrapperRef={refToTop}>
          <WROverview value={workRequestDetail.value} />
        </FormWrapper>
      )
    } else if (activeTabIndex === 2) {
      return (<WrTimeline wrNo={wrNo} />)
    }
  }
  useEffect(() => {
    if (workRequestActionErrorMsg) {
      Ext.Msg.alert("Error", workRequestActionErrorMsg);
      Ext.Msg.setHideAnimation(null);
    }
  }, [workRequestActionErrorMsg])

  useEffect(() => {
    return (() => {
      dispatch(actions.workRequestV2.resource.clearMessage(wrNo));
    })
  },[dispatch, wrNo])

  const handleMenuItemClick = useCallback(async (id) => {
    if (["AUT", "REJ", "AUTCRWO", "FRWD", "CNL", "MVPL", "CLS", "REV"].indexOf(id) !== -1) {
      const confirmed = await getConfirmation({
        title: ACTION_LIST_MAP[id].title,
        message: ACTION_LIST_MAP[id].message,
      });
      if (confirmed) {
        dispatch(actions.workRequestV2.resource.triggerAction({
          actionFlag: id,
          wrNo
        }))
      }
    } else if (id === 'EDT') {
      history.push(`/workRequest/manage/${wrNo}`)
    } else if (id === 'CPY') {
      history.push(`/workRequest/manage/copy/${wrNo}`)
    }
  }, [dispatch, getConfirmation, history, wrNo])
  return (
    <div className={classes.container}>
      <PageHeader
        title='Work Request'
        showBack
      />
      <WRNav />
      {['received', 'error'].includes(workRequestDetail.status) ?
        (
          <>
            <div className={classes.tabsWrapper}>
              <EAMTabs tabsData={tabsData} value={activeTabIndex} onChange={(event, ind) => {
                setActiveTabIndex(ind);
              }} />
            </div>
            {renderData()}
            {activeTabIndex !== 2 ? (
              <div className={classes.actionWrapper}>
                {otherActions?.length ? (
                  <EAMMenu
                    id="wRActions"
                    className={classes.menu}
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
          </>
        ) : <Spinner speed={0.5} className={classes.spinner} type="moon" size={100} />
      }

    </div >
  )
}
