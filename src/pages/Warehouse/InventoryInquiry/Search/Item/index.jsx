import { makeStyles } from "@material-ui/styles";
import { useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import BoxIcon from "../../../../../assets/Icons/HambergerIcon";


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

const dummyData = [
  { itemNo: 'ITM0003', name: 'CNCLarge', count: 119 },
  { itemNo: 'ITM0004', name: 'CNCLarge', count: 119 },
  { itemNo: 'ITM0006', name: 'CNCLarge', count: 119 },
]
export default function ItemList() {
  const classes = useStyles();
  return (
    <>
      {dummyData.map(item => (
        <div key={item.itemNo} className={classes.item}>
          <div className={classes.leftWrapper}>
            <span className={classes.code}>{item.itemNo}</span>
            <span  className={classes.name}>{item.name}</span>
          </div>
          <div  className={classes.rightWrapper}>
            <span  className={classes.count}>1190 Nos</span>
            <BoxIcon />
          </div>
        </div>
      ))}
    </>
  )
}