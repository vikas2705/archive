import { makeStyles } from "@material-ui/styles"
import moment from "moment";
import Checkbox from '@material-ui/core/Checkbox';

import DateIcon from "../../../../../assets/Icons/DateIcon";
import SettingsIcon from "../../../../../assets/Icons/SettingsIcon";
import WorkRequestStatus from "../../../../../components/WorkRequestStatus";
import EAMMenu from "../../../../../components/EAMMenu";
import IconButton from "../../../../../components/IconButton";
import MenuIcon from "../../../../../assets/Icons/MenuIcon";
import { useCallback, useMemo } from "react";
import { useConfirmationDialog } from "../../../../../components/EAMConfirmDialog";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectors } from "../../../../../reducers";
import actions from "../../../../../actions";
import { ACTION_LIST_MAP } from "../../util";
import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  card: {
    marginTop: 10,
    margin: '0px 12px 10px 12px',
    padding: '12px 12px 20px 11px',
    background: '#FFFFFF',
    border: '1px solid #E9EBEF',
    boxSizing: 'border-box',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  },
  checkbox: {
    padding: 0,
    '& > span': {
      paddingRight: 10,
    },
    '& > span > input': {
      paddingRight: 12,
    }
  },
  main: {
    minHeight: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    paddingTop: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& > div': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    }
  },
  number: {
    fontSize: 13,
    // color: '#7D8597',
    color: '#1616169e',
    paddingRight: 2,
    fontWeight: 500,
    borderRight: '1px solid #7D8597',
  },
  desc: {
    fontSize: 14,
    fontWeight: 400,
    color: '#000000',
    paddingLeft: 5,
  },
  itemText: {
    marginLeft: 5,
    color: '#5C677D',
    fontWeight: 600,
    fontSize: 12,
  },
  leftContainer: {

  }
}))
const emptySet = [];
export default function Row({ isSelectable, value, onClick }) {
  const match = useRouteMatch();
  const { groupBy } = match.params;
  const { workrequestNoout, wrDesc, date, equipmentCodeout, statusout, Priorityout } = value;

  const isItemSelected = useSelector(state => selectors.isWRItemSelected(state, groupBy, workrequestNoout))
  const formattedDate = moment(date).format("DD/MM/YYYY");
  const dispatch = useDispatch();
  const history = useHistory();
  const priorityColor = useSelector(state => selectors.workRequestPriorityColor(state, Priorityout));
  const allowedActions = useSelector(state => {
    const { taskStatus } = selectors.workRequestListObj(state, groupBy);
    return selectors.workRequestListActions(state, taskStatus) || emptySet;
  }, shallowEqual)
  const classes = useStyles(Priorityout);
  const { getConfirmation } = useConfirmationDialog();
  const handleItemSelectToggle = useCallback((event) => {
    event.stopPropagation()
    dispatch(actions.workRequestV2.list.toggleItemSelect(groupBy, workrequestNoout))
  }, [dispatch, groupBy, workrequestNoout])

  const handleItemClick = () => { onClick(workrequestNoout) };
  const handleMenuItemClick = useCallback(async (id) => {
    if (["AUT", "REJ", "AUTCRWO", "FRWD", "CNL", "MVPL", "CLS", "REV"].indexOf(id) !== -1) {
      const confirmed = await getConfirmation({
        title: ACTION_LIST_MAP[id].title,
        message: ACTION_LIST_MAP[id].message,
      });
      if (confirmed) {
        dispatch(actions.workRequestV2.list.triggerAction({ groupBy, actionFlag: id, workrequestNo: workrequestNoout }))
      }
    } else if (id === 'EDT') {
      history.push(`/workRequest/manage/${workrequestNoout}`)
    } else if (id === 'CPY') {
      history.push(`/workRequest/manage/copy/${workrequestNoout}`)
    }
  }, [dispatch, getConfirmation, groupBy, history, workrequestNoout])
  return (
    <div
      className={classes.card}
      style={{ borderLeft: `5px solid ${priorityColor}` }}
    >
      <div className={classes.main} >
        <div className={classes.leftContainer} >
          {isSelectable ? (<Checkbox
            className={classes.checkbox}
            checked={!!isItemSelected}
            onChange={handleItemSelectToggle}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />) : null}
          <span onClick={handleItemClick} className={classes.number}>{workrequestNoout}</span>
          <span onClick={handleItemClick} className={classes.desc}>{wrDesc}</span>
        </div>
        {allowedActions?.length ? (
          <EAMMenu
            id={workrequestNoout}
            onMenuItemClick={handleMenuItemClick}
            label={<IconButton><MenuIcon /></IconButton>}
            value={allowedActions}
          />
        ) : null}
      </div>
      <div onClick={handleItemClick} className={classes.footer}>
        <div><DateIcon /><span className={classes.itemText}>{formattedDate}</span></div>
        <div><SettingsIcon /><span className={classes.itemText}>{`#${equipmentCodeout}`}</span></div>
        <div><WorkRequestStatus value={statusout}></WorkRequestStatus></div>
      </div>
    </div>
  )
}