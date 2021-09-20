import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import actions from "../../../../../actions";
import AssignBlueIcon from "../../../../../assets/Icons/AssignBlueIcon";
import DateIcon from "../../../../../assets/Icons/DateIcon";
import SettingsIcon from "../../../../../assets/Icons/SettingsIcon";
import EAMText from "../../../../../components/EAMText";
import FormRow from "../../../../../components/Form/FormRow";
import IconButton from "../../../../../components/IconButton";
import { selectors } from "../../../../../reducers";

const useStyles = makeStyles({
  card: {
    marginBottom: 14,
    background: '#FFFFFF',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.05)',
    padding: '17px 16px 16px 12px',
    borderRadius: 4,
  },
  footer: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    '& > div': {
      display: 'flex',
      flexDirection: 'row',
      marginRight: 12,
      alignItems: 'center',
      '& > svg': {
        marginRight: 6,
      }
    }
  },
  itemText: {
    color: '#7D8597',
    fontSize: 12,
  },
  number: {
    color: '#7D8597',
    fontSize: 12,
  },
  info: {
    fontSize: 13,
    marginTop: 11,
    color: '#001845',
  },
  desc: {
    color: '#001845',
    fontSize: 13,
    marginTop: 8,
  },
  status: {
    fontSize: 13,
    lineHeight: '19px',
    fontWeight: 'bold',
    color: '#33415C',
    display: 'inline-flex',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 6,
    background: 'rgba(255, 168, 0, 0.31)'
  },
  topPanel: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  actionBtn: {
    display: 'flex',
    '& > svg': {
      marginRight: 9,
      marginTop: 'auto',
      marginBottom: 'auto'
    }
  },
  root: {
    background: '#e5e5e55e',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 15,
    overflow: 'auto'
  },
  cardHeader: {
    paddingBottom: 18,
    // paddingTop: 13,
  },
  cardFooter: {
    display: 'flex',
    width: '100%',
    flexFlow: 'row-reverse',
  },
  assign: {
    color: '#0073E6',
    fontSize: 12,
  },
})
const emptyObj = {};
export default function SuggestedWO({ wrNo }) {
  console.log(wrNo);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { value, status } = useSelector(state => selectors.wrWorkOrder(state, wrNo), shallowEqual);

  useEffect(() => {
    dispatch(actions.workRequestV2.resource.workOrder.request(wrNo))
  }, [dispatch, wrNo])

  const assignWorkOrder = (woNo) => {
    dispatch(actions.workRequestV2.resource.workOrder.assign(wrNo, woNo))
  }
  return (
    <div className={classes.root}>
      {value?.map(val => (
        <div className={classes.card} key={val.woNo}>
          <div className={classes.cardHeader}>
            <div className={classes.topPanel}>
              <Typography className={classes.number} variant="body1">
                {val.woNo}
              </Typography>
              <span className={classes.status}>{val.woStatus}</span>
            </div>
            <Typography className={classes.info} variant="body2">
              {`${val.woOndesc} | ${val.woTypedesc}`}
            </Typography>
            <Typography className={classes.desc} variant="body2">
              {val.woDesc}
            </Typography>
            <div className={classes.footer} >
              <div><DateIcon /><span className={classes.itemText}>{val.woDate ? moment(val.woDate).format("DD/MM/YYYY") : ""}</span></div>
              <div><SettingsIcon /><span className={classes.itemText}>{`#${val.woOnCode}`}</span></div>
            </div>
          </div>
          <div className={classes.cardFooter}>
            <IconButton className={classes.actionBtn} onClick={() => {
              assignWorkOrder(val.woNo)
            }}>
              <AssignBlueIcon />
              <Typography variant="h6" className={classes.assign}>
                Assign Work Request
              </Typography>
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  )
}