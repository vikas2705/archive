import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import EAMButton from "../../../../../components/EAMButton";
import EAMSelect from "../../../../../components/EAMSelect";
import FullScreenDialog from "../../../../../components/FullScreenDialog";
import QuantityField from "../QuantityField";

const useStyles = makeStyles({
  root: {
    flex: 1,
    padding: 12,
    background: '#e5e5e599',

  },
  formWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    background: 'white',
    height: '100%',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',

  },
  issueDetailWrapper: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #C9CDD6',
    paddingBottom: 13,
    justifyContent: 'space-between',
    '& >div:first-child': {
      '& >div': {
        display: 'flex',
        marginBottom: 8,
        '& > h6': {
          color: '#33415C',
          fontSize: 13,

        },
        '& > h5': {
          color: '#33415C',
          fontSize: 15,
          fontWeight: 'bold',
        }
      }
    },
    '& >div:last-child': {
      '& > h5': {
        color: '#00AE50',
        fontSize: 15,
        fontWeight: 'bold',
      },
      '& > h6': {
        color: '#33415C',
        fontSize: 13,
        fontWeight: 'italics',
      },
    }
  },
  form: {
    marginTop: 24,
    '& > p': {
      color: '#33415C',
      fontSize: 13,
      marginTop: 10,
      paddingLeft: 3,
    },
    '& > legend:first-child': {
      marginBottom: 26,
    },
  },
  quantityFieldWrapper: {
    marginTop: 17,
    '& > div': {
      width: 150,
      margin: 'auto',
    }
  },
  actionWrapper: {
    '& > button': {
      width: '100%',
    }
  }
})
export default function IssueQuantityDialog({ open, onClose, title }) {
  const classes = useStyles();
  return (
    <FullScreenDialog
      modalTitle={title}
      open={open}
      modalContent={
        <div className={classes.root}>
          <div className={classes.container}>
            <div className={classes.issueDetailWrapper}>
              <div>
                <div className={classes.name}>
                  <Typography variant="h6">
                    ITM0003 -
                  </Typography>
                  <Typography variant="h5">
                    CNC Large
                  </Typography>
                </div>
                <div className={classes.location}>
                  <Typography variant="h5">
                    Chennai -
                  </Typography>
                  <Typography variant="h6">
                    WHMGFG1
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" className={classes.code}>
                    ZN 01 - BN 01 - LT 01
                </Typography>
                </div>
              </div>
              <div>
                <Typography variant="h5">
                  100 Nos
                </Typography>
                <Typography variant="h6">
                  Accepted
                </Typography>
              </div>

            </div>
            <div className={classes.formWrapper}>
              <div className={classes.form}>
                <EAMSelect
                  id="test"
                  title='Ref. Doc Type'
                  value="1"
                  onFieldChange={() => { }}
                  labelField="label"
                  valueField="value"
                  options={[
                    { value: "1", label: 'Work Order' },
                    { value: "2", label: 'Production Order' }
                  ]}
                />
                <EAMSelect
                  id="test"
                  title='Ref. Doc. No.'
                  value="1"
                  onFieldChange={() => { }}
                  labelField="label"
                  valueField="value"
                  options={[
                    { value: "1", label: 'PR01/2021' },
                    { value: "2", label: 'PR01/2211' }
                  ]}
                />
                <Typography variant="body1">
                  Brass Hex - Bolt - 29/07/2021
                </Typography>

                <div className={classes.quantityFieldWrapper}>
                  <QuantityField title="Issue Qty." />
                </div>

              </div>
              <div className={classes.actionWrapper}>
                <EAMButton
                  onClick={() => { }}
                >
                  Submit
                </EAMButton>
              </div>
            </div>
          </div>
        </div>
      }
      onClose={onClose}
    />
  )
}