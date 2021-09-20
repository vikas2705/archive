
import React, { useCallback, useEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import PageHeader from '../../../components/PageHeader';
import EAMGridView from '../../../components/EAMGridView';
import { makeStyles } from '@material-ui/styles';
import EAMExpandButton from '../../../components/EAMExpandButton';
import actions from "../../../actions";
import EAMSelect from '../../../components/EAMSelect';
import { selectors } from '../../../reducers';
import Spinner from '../../../components/Spinner';
import FilterWhiteIcon from '../../../assets/Icons/FilterWhiteIcon';
import IconButton from '../../../components/IconButton';

const useStyles = makeStyles({
  container: {
    height: '100%'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  wrapper: {
    height: 'calc(100% - 71px)',
    flex: '1',
    display: 'flex',
    flexDirection: 'column'
  },
  filterPanel: {
    padding: '18px 30px',
    background: '#FFFFFF',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
  },
  gridWrapper: {
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  spinner: {
    margin: 'auto',
  },
  bottomWrapper: {
    height: 66,
    width: '100%'
  }
});
const emptySet = [];
function Dashboard() {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const filterOptions = useSelector(state => {
    const {value} = selectors.workRequestFilterOptions(state) || {};
    return value?.workhubinformation || emptySet
  })

  const countArr = useSelector(state => {
    const {value} = selectors.wRDashboardCountList(state);
    return value?.workrequestcount || emptySet;
  }, shallowEqual);
  const selectedFilter = useSelector(state => selectors.dashboardSelectedFilter(state));
  const navBarightIcons = useMemo(() => ([{
    id: "1",
    type: "status",
    text: <IconButton><FilterWhiteIcon /></IconButton>,
    action: () => {
      history.push(`${location.pathname}/list/Status/view`);
    }
  }]), [history, location.pathname]);

  const handleFilterChange = useCallback((id, value) => {
    dispatch(actions.workRequestV2.dashboard.changeFilter(value));
  }, [dispatch])

  const handleGridClick = useCallback((item) => {
    history.push(`${location.pathname}/list/${selectedFilter}/${item.hdn_card_code}/view`)
  }, [history, location.pathname, selectedFilter])

  useEffect(() => {
    dispatch(actions.workRequestV2.dashboard.init());
  }, [dispatch])

  return (
    <div className={classes.container}>
      <PageHeader
        title='Work Request'
        rightActions={navBarightIcons}
        showNav
      />
      <div className={classes.wrapper}>
        <div className={classes.filterPanel}>
          <EAMSelect
            id="groupBy"
            value={selectedFilter}
            labelField="workhubcmbdesc"
            valueField="workhubcmbcode"
            onFieldChange={handleFilterChange}
            options={filterOptions}
          />
        </div>
        <div className={classes.gridWrapper}>
          {countArr?.length ? (
            <EAMGridView
              variant={selectedFilter === 'Priority' ? "colored" : ''}
              keyProp="tabdata"
              value={countArr}
              onClick={handleGridClick}
            />
          ) : <Spinner speed={0.5} className={classes.spinner} type="moon" size={100} />}

        </div>
        <div className={classes.bottomWrapper}>
          <EAMExpandButton onClick={() => {
            history.push(`${location.pathname}/create`);
          }} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;