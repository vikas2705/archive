import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import EAMButton from "../../../../../components/EAMButton";
import EAMSelect from "../../../../../components/EAMSelect";
import FullScreenDialog from "../../../../../components/FullScreenDialog";
import QuantityField from "../QuantityField";
import clsx from 'clsx';
import IsVisible from "../../../../../components/Form/IsVisible";
import EAMDate from "../../../../../components/EAMDate";
import InwardIcon from "../../../../../assets/Icons/InwardIcon";
import OutwardIcon from "../../../../../assets/Icons/OutwardIcon";
import EAMExpandableItemRow from "../../../../../components/EAMExpandableItemRow";

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
  },
  tabs: {
    display: 'flex',
  },
  selectedTab: {
    background: '#3B9DFF !important',
    border: '1px solid #E9EBEF  !important',
    color: 'white !important',
  },
  tab: {
    padding: 8,
    color: '#33415C',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    background: '#F7F9FB',
    border: '1px solid #E9EBEF',
    boxSizing: 'border-box',
    borderRadius: 5,
    marginLeft: 4,
    marginRight: 4,
  },
  fieldWrapper: {

  },
  stockTabs: {
    display: 'flex',
    border: '1px solid #C9CDD6',
    width: 'fit-content',
    marginTop: 12,
    marginBottom:13,
    borderRadius: 5,
    '& > div': {
      padding: 5,
      color: '#33415C',
      paddingLeft: 10,
      paddingRight: 10,
    }
  },
  selectedStockTab: {
    background: '#EDFDF2',
    border: '1px solid #23E764 !important',
  },
  stockMiddleTab: {
    borderLeft: '1px solid #C9CDD6',
    borderRight: '1px solid #C9CDD6'
  },
})
const TABS = ["Material Request", "Stock Transfer", "Purchase Request", "Subcon. Request"];
const INWARD_OBJ = [{
  name: 'Chennai',
  code: 'WHBY786',
  quantity: 100,
  children: [
    {
      name: 'ITM0003',
      code: 'CNC Large',
      quantity: 100,
      children: [
        {
          name: 'ITM0003',
          quantity: 100,
          isInput: true,
        }
      ]
    },
  ]
},
{
  name: 'Mumbai',
  code: 'WHS3336',
  quantity: 89,
}]

const BIN_OBJ = [{
  name: 'BN 01',
  quantity: 100,
  isInput: true,
},
{
  name: 'BN 02',
  quantity: 100,
  isInput: true,
},
{
  name: 'BN 06',
  quantity: 100,
  isInput: true,
}
]
export default function SerialIssueQuantityDialog({ open, onClose, title }) {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(TABS[0]);
  const [selectedStockTab, setSelectedStockTab] = useState('Inward');

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
                <div className={classes.tabs}>
                  {TABS.map(tab => (
                    <div
                      className={clsx(classes.tab, {
                        [classes.selectedTab]: tab === selectedTab
                      })
                      } onClick={() => { setSelectedTab(tab) }}>
                      {tab}
                    </div>
                  ))}
                </div>
                <div className={classes.fieldWrapper}>
                  <IsVisible
                    visible={selectedTab !== 'Stock Transfer'}
                  >
                    <div className={classes.quantityFieldWrapper}>
                      <QuantityField title="Required Qty." />
                    </div>
                    <div className={classes.quantityFieldWrapper}>
                      <div>
                        <EAMDate title="Need Date" />
                      </div>
                    </div>
                  </IsVisible>
                  <IsVisible
                    visible={selectedTab === 'Stock Transfer'}
                  >
                    <>
                      <div className={classes.stockTabs}>
                        <div
                          onClick={() => {
                            setSelectedStockTab("Inward")
                          }}
                          className={clsx({ [classes.selectedStockTab]: selectedStockTab === 'Inward' })}><InwardIcon />Inward</div>
                        <div
                          onClick={() => {
                            setSelectedStockTab("Outward")
                          }}
                          className={clsx(classes.stockMiddleTab, { [classes.selectedStockTab]: selectedStockTab === 'Outward' })}><OutwardIcon />Outward</div>
                        <div
                          onClick={() => {
                            setSelectedStockTab("Bin")
                          }}
                          className={clsx({ [classes.selectedStockTab]: selectedStockTab === 'Bin' })}>Bin to Bin</div>
                      </div>
                      {selectedStockTab === 'Bin' ? (
                        <EAMExpandableItemRow
                        onClick={(event) => { }}
                        value={BIN_OBJ} />
                      ) : (
                        <EAMExpandableItemRow
                          onClick={(event) => { }}
                          value={INWARD_OBJ} />
                      )}
                    </>
                  </IsVisible>
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