import { Drawer, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import EAMText from '../../../../components/EAMText';
import classnames from "classnames";
import SearchIcon from "../../../../assets/Icons/SearchIcon";

const useStyles = makeStyles({
  root: {
    background: '#FFFFFF',
    padding: 10,
    /* Text/Grey 6 */

    border: '1px solid #E9EBEF',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
    borderRadius: 4,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 7,
    paddingBottom: 10,
    borderBottom: '1px solid #E9EBEF',
    '& > div:first-child':{
      flex: '1',
    },

  },
  drawerHeader: {
    borderBottom: '1px solid #C9CDD6',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom:20,
    paddingLeft: 18,
    paddingRight: 18,
  },
  id: {
    color: '#33415C',
    fontSize: 15,
  },
  name: {
    color: '#33415C',
    fontSize: 15,
    fontWeight: 'bold'
  },
  fieldsetContainer: {
    width: "100%",
    minHeight: "40px",
    border: "1px solid #E9EBEF",
    color: "#979DAC",
    display: "inline-block",
    borderRadius: "4px",
    fontSize: "12px",
    position: "relative",
},
  fieldValue: {
    paddingTop: 6,
    color: "rgb(17, 17, 17)",
    fontSize: 13,
    paddingLeft: 20,
    width: "70%",
    height: "auto",
    paddingBottom: 6,
},
rightActionWrapper: {
    position: "absolute",
    right: 0,
    top: 10,
    "& > svg": {
        marginRight: 24,
    },
    "& > span": {
        marginRight: 24,
    },
},
});


export default function ChecklistSearchList({ title, open, onClose, value, onItemClick }) {
  const classes = useStyles();
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}>
      <div className={classes.root}>
        <div className={classes.drawerHeader}>
          <div className={classnames(classes.fieldsetContainer)}>
            <div className={classes.fieldValue}>{""}</div>
            <span className={classes.rightActionWrapper} onClick={() => {}}>
                <SearchIcon />
            </span>
        </div>
      </div>
        <div>
          {value.map(item => (
            <div className={classes.wrapper}
              onClick={() => onItemClick(item)}
              key={`${item.id}-${item.name}`}
              id={`${item.id}-${item.name}`}
              >
                <div className={classes.nameWrapper}>
                  <span>
                    <span className={classes.id}>{item.id}</span>-<span className={classes.name}>{item.name}</span>
                  </span>
                </div>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  )
}