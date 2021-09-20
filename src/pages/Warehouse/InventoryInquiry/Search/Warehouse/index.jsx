import { makeStyles } from "@material-ui/styles";
import { useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import BoxIcon from "../../../../../assets/Icons/HambergerIcon";
import EAMExpandableItemRow from "../../../../../components/EAMExpandableItemRow";


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
  leftWrapper:{
    display: 'flex',
    flexDirection: 'column',
    '& >span:first-child':{
      marginBottom: 3,
    }
  },
  rightWrapper:{
    display: 'flex',
    flexDirection: 'column',
    '& > svg': {
      marginTop: 8,
      marginLeft: 'auto',
    }
  }

});

export default function Warehouse() {
  const location = useLocation();
  const history = useHistory();
  
  const obj = [
    {
        name: 'Chennai',
        code: 'WHBY786',
        quantity: 100,
        phNo: '911',
        children: [
          {
            name: 'ITM0003',
            code: 'CNC Large',
            quantity: 100,
            phNo: '911',
          },
          {
            name: 'ITM00002',
            code: 'CNC Medium',
            quantity: 50,
            phNo: '911',
          }
        ]
    },
    {
      name: 'Mumbai',
      code: 'WHS3336',
      quantity: 89,
      phNo: '911',
      children: [
        {
          name: 'ITM0003',
          code: 'CNC Large',
          quantity: 120,
          phNo: '911',
        },
        {
          name: 'ITM00002',
          code: 'CNC Medium',
          quantity: 50,
          phNo: '911',
        }
      ]
    }
  ]
  const classes = useStyles();
  return (
    <>
        <EAMExpandableItemRow 
        onClick={()=>{
          history.push(`${location.pathname}/warehouse/itemDetail/1`);
        }} 
        value={obj}/>
    </>
  )
}