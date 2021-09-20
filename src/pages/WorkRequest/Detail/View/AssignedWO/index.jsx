import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { getValueByPointer } from "fast-json-patch";
import moment from "moment";
import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import actions from "../../../../../actions";
import PhoneIcon from "../../../../../assets/Icons/PhoneIcon";
import SettingsGreyIcon from "../../../../../assets/Icons/SettingsGreyIcon";
import EAMText from "../../../../../components/EAMText";
import FormRow from "../../../../../components/Form/FormRow";
import NameAndCodeField from "../../../../../components/NameAndCodeField";
import { selectors } from "../../../../../reducers";

const useStyles = makeStyles({
  phoneWrapper: {
    display: 'flex',
    flexDirection: 'row',
    '& >legend': {
      width: 'min-content'
    }
  },
  number: {
    color: '#33415C',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  rowWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
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
  
})

const emptyObj = {};
const emptyVal = '------';
export default function AssignedWO({ wrNo, woNo }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { value, status } = useSelector(state => {
    const { value, status } = selectors.wrWorkOrder(state, wrNo) || emptyObj;
    return { value: value?.[0] || emptyObj, status }
  }, shallowEqual);

  console.log("value*****", value, status)
  useEffect(() => {
    if (!status) {
      dispatch(actions.workRequestV2.resource.workOrder.request(wrNo))
    }

  }, [dispatch, status, wrNo])

  return (
    <>
      <div className={classes.rowWrapper}>
        <Typography className={classes.number} variant="body1">
          {value.woNo}
        </Typography>
        <span className={classes.status}>{value.woStatus}</span>
      </div>
      {value.woOnCodeDesc ?
        <NameAndCodeField type={value.woOn === 'E' ? 'equipment': 'location'} value={value.woOnCode} isReadOnly/>
      : null
      }
      <EAMText
        title="WO Description"
        value={value.woDesc || emptyVal}
        isReadOnly
      />
      <FormRow>
        <EAMText
          title="Type"
          value={value.woTypedesc || emptyVal}
          isReadOnly
        />
        <EAMText
          title="Category"
          value={value.woCategorydesc || emptyVal}
          isReadOnly
        />
      </FormRow>
      <EAMText
        title="Supervisor"
        value={value.woSupervisorName ? `${value.woSupervisorName} (${value.woSupervisor})` : emptyVal}
        isReadOnly
      />
      <span className={classes.phoneWrapper}>
        <EAMText
          title="Phone"
          value={value.woSupervisorPhone || emptyVal}
          isReadOnly
        />
        {value.woSupervisorPhone ? (
          <span className={classes.phone}>
            <a href={`tel:${value.woSupervisorPhone}`}>
              <PhoneIcon />
            </a>
          </span>
        ) : null}
      </span>
      <FormRow>
        <EAMText
          title="Scheduled Start Date"
          value={moment(value.woScheduledStartDate).format("DD/MM/YYYY")}
          isReadOnly
        />
        <EAMText
          title="Scheduled Completion Date"
          value={moment(value.woScheduledCompletionDate).format("DD/MM/YYYY")}
          isReadOnly
        />
      </FormRow>
      <EAMText
        title="Completion %"
        value={value.completionpercentage || emptyVal}
        isReadOnly
      />
    </>
  )
}