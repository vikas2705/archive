import { useEffect, useState, useCallback, useRef } from "react";
import { useHistory, useRouteMatch } from 'react-router-dom';
import TabContainer from "../../../components/TabContainer/index.jsx";
import PageHeader from "../../../components/PageHeader/index.jsx";
import ActionPanel from "./ActionPanel/index.jsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import actions from "../../../actions/index.js";
import { makeStyles } from "@material-ui/core";
import { selectors } from "../../../reducers/index.js";
import FormWrapper from "../../../components/Form/FormWrapper";
import WOForm from "./Form.jsx";
import { WO_TABS } from './constant'
const Ext = window.Ext;

const useStyles = makeStyles({
  topSection: {
    height: `calc(100vh - 43px)`,
    display: 'flex',
    flexDirection: 'column'
  },
});

const tabsData = [
  {
    index: 1,
    title: "WO Info",
    type: WO_TABS.WO_INFO,
    active: true,
  },
  {
    index: 2,
    type: WO_TABS.DETAIL,
    title: "Other Details",
  },
  {
    index: 3,
    type: WO_TABS.ATTACHMENT,
    title: "Attachments",
  },
];
export default function ManageWorkOrder() {
  const classes = useStyles();
  const refToTop = useRef();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = match.params;
  const { saveErrorMsg, workOrderNo, saveStatus } = useSelector(state => selectors.workOrder(state), shallowEqual);
  const  fileListError =  useSelector(state => {
    const {value} = selectors.workOrder(state);
    return value?.fileListError || ''
  });
  useEffect(() => {
    dispatch(actions.workOrder.update.init('new'));
  }, [dispatch, id])

  const [activeTab, setActiveTab] = useState(1);

  const onTabChange = index => {
    setActiveTab(index);
  };

  const handleFieldChange = useCallback((field, value) => {
    dispatch(actions.workOrder.update.patchField(field, value));
  }, [dispatch])

  useEffect(() => {
    if (saveErrorMsg) {
      Ext.Msg.alert("Error", saveErrorMsg);
      Ext.Msg.setHideAnimation(null);
    }
  }, [saveErrorMsg])

  useEffect(() => {
    return (() => {
      dispatch(actions.workOrder.update.clean());
    })
  }, [dispatch])

  useEffect(() => {
    if (fileListError) {
      Ext.Msg.alert("Error", fileListError);
      Ext.Msg.setHideAnimation(null);
    }
  }, [fileListError])

  useEffect(() => {
    if (saveStatus === 'completed') {
      Ext.Msg.alert("Work Order created", `Request No: ${workOrderNo}`);
      Ext.Msg.setHideAnimation(null);
      setTimeout(() => {
        history.goBack();
      }, 1000)

    }
  }, [history, saveStatus, workOrderNo])

  useEffect(() => {
    refToTop?.current?.scrollIntoView();
  }, [activeTab])
  return (
    <>
      <div className={classes.topSection} >
        <PageHeader
          showNav
          title='Create Work Order'
        />
        <TabContainer
          tabsData={tabsData}
          activeTab={activeTab}
          onChange={onTabChange}
          showCount={false}
        />
        <FormWrapper wrapperRef={refToTop}>
          <WOForm activeTab={tabsData[activeTab - 1].type} onFieldChange={handleFieldChange} />
        </FormWrapper>
        <ActionPanel />
      </div>
    </>
  );
}
