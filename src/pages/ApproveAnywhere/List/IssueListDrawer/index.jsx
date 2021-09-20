import { Drawer, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from "../../../../assets/Icons/CloseIcon";

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
  title: {
    color: '#33415C',
    fontSize: 15,
    fontWeight: 'bold'
  },
  name: {
    color: '#33415C',
    fontSize: 15,
    fontWeight: 'bold'
  },
  code: {
    color: '#001845',
    fontWeight: 400,
    fontSize: 12,
  },
  countWrapper: {
    color: '#33415C',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 'auto',
    marginBottom: 3,
  },
  countLabelWrapper: {
    color: '#33415C',
    fontSize: 13,
    marginTop: 'auto',
    marginBottom: 3,
    marginLeft: 3,
  }
});


export default function IssueListDrawer({ title, open, onClose, value, onItemClick }) {
  const classes = useStyles();
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}>
      <div className={classes.root}>
        <div className={classes.drawerHeader}>
          <Typography className={classes.title} variant="h6">
            {title}
          </Typography>
          <span onClick={onClose}><CloseIcon/></span>
        </div>
        <div>
          {value.map(item => (
            <div className={classes.wrapper}
            onClick={onItemClick}
            >
              <div className={classes.nameWrapper}>
                <Typography className={classes.name} variant="body1">
                  {item.name}
                </Typography>
                <Typography className={classes.code} variant="body1">
                  {item.code}
                </Typography>
              </div>
              <div className={classes.countWrapper}>
                {item.count}
              </div>
              <div className={classes.countLabelWrapper}>
                Nos.
              </div>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  )
}