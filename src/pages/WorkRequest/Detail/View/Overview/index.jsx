import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import { useMemo } from "react";
import AttachmentsV2 from "../../../../../components/AttachmentsV2";
import EAMText from "../../../../../components/EAMText";
import FormRow from "../../../../../components/Form/FormRow";
import NameAndCodeField from "../../../../../components/NameAndCodeField";

const useStyles = makeStyles({
  wrapper: {
    background: '#E1F0FF',
    borderRadius: 4,
    marginTop: -18,
    marginLeft: -12,
    marginRight: -13,
    marginBottom: 24,
    padding: '11px 7px 7px 7px',
    '& > div:first-child':{
      '& > div:first-child':{
        paddingBottom: '0px !important',
        paddingLeft: '11px !important',
      }
    },
    '& > div:last-child':{
      margin: 10,
      width: 'calc(100% - 20px)'
    }
  }
})

const emptyObj = {};
const emptySet = [];
export default function WROverview({ value = emptyObj }) {
  const classes = useStyles();
  const {
    wrDesc = '------',
    problemDesc = '',
    problemCode = '',
    Locationdesc = '',
    locationCodeout = '',
    reportedByNameout = '',
    reportedByCodeout = '',
    workPhone = '------',
    Workgroupdesc = '',
    workGroupout = '',
    observationDetails = '------',
    GetfileListinfo = emptySet,
  } = value;
  const date = useMemo(() => {
    if (!value.date) {
      return '';
    }
    return moment(value.date).format('DD/MM/YYYY');
  }, [value.date])
  const time = useMemo(() => {
    if (!value.time) {
      return '';
    }
    return moment(value.time).format('HH: mm');
  }, [value.time])
  return (
    <>
      <div className={classes.wrapper}>
        <NameAndCodeField
          type={value.workrequestOnout === 'E' ? 'equipment' : 'location'}
          value={value.equipmentCodeout}
          isReadOnly />
        <AttachmentsV2
          files={GetfileListinfo}
          slideView
          isReadOnly
        />
      </div>

      <EAMText
        title="Details"
        value={wrDesc || '------'}
        isReadOnly
      />
      <EAMText
        title="Reported Problem"
        value={`${problemDesc} (${problemCode})`}
        isReadOnly
      />
      <EAMText
        title="Location"
        value={`${Locationdesc} (${locationCodeout})`}
        isReadOnly
      />
      <EAMText
        title="Reported By"
        value={`${reportedByNameout} (${reportedByCodeout})`}
        isReadOnly
      />
      <EAMText
        title="Work Phone"
        value={workPhone || '------'}
        isReadOnly
      />
      <FormRow>
        <EAMText
          title="Reported Date"
          value={date}
          isReadOnly
        />
        <EAMText
          title="Reported Time"
          value={time}
          isReadOnly
        />
      </FormRow>
      <EAMText
        title="Work Group"
        value={`${Workgroupdesc} (${workGroupout})`}
        isReadOnly
      />
      <EAMText
        title="Additional Remarks"
        value={observationDetails || '------'}
        isReadOnly
      />
    </>
  )
}