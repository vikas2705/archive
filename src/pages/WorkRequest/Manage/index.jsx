import { useEffect, useMemo, useRef, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import TabContainer from "../../../components/TabContainer/index.jsx";
import PageHeader from "../../../components/PageHeader/index.jsx";
import ActionPanel from "./ActionPanel/index.jsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import actions from "../../../actions/index.js";
import { makeStyles } from "@material-ui/core";
import { selectors } from "../../../reducers/index.js";
import { WR_TABS } from "./constant.js";
import FormWrapper from "../../../components/Form/FormWrapper/index.jsx";
import WRForm from "./Form.jsx";
import { useTranslation } from 'react-i18next';
const Ext = window.Ext;

const useStyles = makeStyles({
  topSection: {
    height: `calc(100vh - 43px)`,
    display: 'flex',
    flexDirection: 'column'
  }
});

const tabsData = [
  {
    index: 1,
    title: 'workrequest.wrInfo',
    type: WR_TABS.WR_INFO,
    active: true,
  },
  {
    index: 2,
    type: WR_TABS.DETAIL,
    title: 'workrequest.detail',
  },
  {
    index: 3,
    type: WR_TABS.ATTACHMENT,
    title: 'workrequest.attachment',
  },
];
export default function ManageWorkRequest() {
  const history = useHistory();
  const location = useLocation();
  const refToTop = useRef();
  const match = useRouteMatch();
  console.log("match", match, location)
  
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation();

  const { id } = match.params;
  console.log("id*****", id)
  const { saveErrorMsg, workrequestNo, saveStatus } = useSelector(state => selectors.workflow(state), shallowEqual);
  const  fileListError =  useSelector(state => {
      const {value} = selectors.workflow(state);
      return value?.fileListError || ''
  });
  const title = useMemo(()=>{
    if(match.url.indexOf('/copy') !== -1 || !id){
      return 'workrequest.create_title'
    }
    return 'workrequest.edit_title';
  },[id, match.url])
  
  useEffect(() => {
    let mode;
    if(match.url.indexOf('/copy') !== -1){
      mode = 'copy';
    }
    else if(id){
      mode = 'edit';
    }
    else {
      mode = 'create';
    }
    dispatch(actions.workflow.update.init(id || 'new', mode));
  }, [dispatch, id, match.url])

  const [activeTab, setActiveTab] = useState(1);

  const onTabChange = index => {
    setActiveTab(index);
  };

  const handleFieldChange = (field, value) => {
    dispatch(actions.workflow.update.patchField(field, value));
  }

  useEffect(() => {
    if (saveErrorMsg) {
      Ext.Msg.alert(t("error"), saveErrorMsg);
      Ext.Msg.setHideAnimation(null);
    }
  }, [saveErrorMsg, t])


  useEffect(() => {
    if (fileListError) {
      Ext.Msg.alert(t("error"), fileListError);
      Ext.Msg.setHideAnimation(null);
    }
  }, [fileListError, t])
  

  useEffect(() => {
    return (() => {
      dispatch(actions.workflow.update.clean());
    })
  }, [dispatch])

  useEffect(() => {
    if (saveStatus === 'completed') {
      Ext.Msg.alert(t("workrequest.create_success_title"), `${t("workrequest.request_no")}: ${workrequestNo}`);
      Ext.Msg.setHideAnimation(null);
      setTimeout(() => {
        history.goBack();
      }, 1000)

    }
  }, [history, saveStatus, t, workrequestNo])

  useEffect(() => {
    refToTop?.current?.scrollIntoView();
  }, [activeTab])

  return (
    <div className={classes.topSection} >
      <PageHeader
        showBack={true}
        showNav={false}
        title={t(title)}
      />
      <TabContainer
        tabsData={tabsData}
        activeTab={activeTab}
        onChange={onTabChange}
      />
      <FormWrapper wrapperRef={refToTop}>
        <WRForm activeTab={tabsData[activeTab - 1].type} onFieldChange={handleFieldChange} />
      </FormWrapper>
      <ActionPanel />
    </div>
  );
}
