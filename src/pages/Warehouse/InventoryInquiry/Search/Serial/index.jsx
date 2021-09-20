import { makeStyles } from "@material-ui/styles";
import { useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import BoxIcon from "../../../../../assets/Icons/HambergerIcon";
import EAMExpandableItemRow from "../../../../../components/EAMExpandableItemRow";
import SerialIssueQuantityDialog from "../../components/SerialIssueQuantityDialog";


const useStyles = makeStyles({
  item: {
    padding: '14px 11px 12px 14px',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    background: '#FFFFFF',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    marginBottom: 10,
  },
  code: {
    color: '#33415C',
    fontSize: 13,
  },
  name: {
    color: '#33415C',
    fontWeight: 'bold',
    fontSize: 15,
  },
  count: {
    color: '#00AE50',
    fontWeight: 'bold',
    fontSize: 15,
  },
  leftWrapper: {
    display: 'flex',
    flexDirection: 'column',
    '& >span:first-child': {
      marginBottom: 3,
    }
  },
  rightWrapper: {
    display: 'flex',
    flexDirection: 'column',
    '& > svg': {
      marginTop: 8,
      marginLeft: 'auto',
    }
  }

});

export default function Serial() {
  const location = useLocation();
  const history = useHistory();

  const obj = [
    {
      name: 'SL9876567',
      status: 'Accepted',
      quantity: 87,
      children: [
        {
          name: 'ITM0003',
          code: 'CNC Large | LOT 01',
          quantity: 100,
        },
        {
          name: 'ITM00002',
          code: 'CNC Medium | LOT 02',
          quantity: 50,
        }
      ]
    },
    {
      name: 'SL9876876',
      quantity: 89,
      children: [
        {
          name: 'ITM0003',
          code: 'CNC Large',
          quantity: 120,
        },
        {
          name: 'ITM00002',
          code: 'CNC Medium',
          quantity: 50,
        }
      ]
    }
  ]
  const classes = useStyles();
  const [showItemQuantityDialog, setShowItemQuantityDialog] = useState(false);
  return (
    <>
      <EAMExpandableItemRow
        onClick={() => {
          setShowItemQuantityDialog(true)
        }}
        value={obj} />
        <SerialIssueQuantityDialog
          open={showItemQuantityDialog}
          title="Some title"
          onClose={() => { setShowItemQuantityDialog(false) }}
      />
    </>
  )
}