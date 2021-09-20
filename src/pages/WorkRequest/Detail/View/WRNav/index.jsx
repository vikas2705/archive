import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { shallowEqual, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NextIcon from "../../../../../assets/Icons/NextIcon";
import PreviousIcon from "../../../../../assets/Icons/PreviousIcon";
import IconButton from "../../../../../components/IconButton";
import { selectors } from "../../../../../reducers";

const useStyles = makeStyles({
  workReqNav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '20px 10px 20px 10px',
    background: '#FFFCF5',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
    '& > div': {
      '& > span': {
        margin: 'auto'
      }
    },
    '& > div:first-child': {
      display: 'flex',
      flexDirection: 'row',
    }
  },
  navTitle: {
    color: '#33415C',
    fontSize: 13,
    fontWeight: 'bold',
    margin: 'auto',
    paddingLeft: 10,
  }
})
const emptyObj = {};
export default function WRNav() {
  const match = useRouteMatch();
  const { groupBy, wrNo } = match.params;
  const history = useHistory();
  const {pathname} = useLocation();
  const prevWorkRequestId = useSelector(state => selectors.previousWorkRequestId(state, groupBy, wrNo));
  const nextWorkRequestId = useSelector(state => selectors.nextWorkRequestId(state, groupBy, wrNo));
  const {workrequestNoout, Statusdesc} = useSelector(state => selectors.workOrderResource(state, wrNo)?.value || emptyObj, shallowEqual);

  const handleNextClick = () => {
    if(!nextWorkRequestId){
      return;
    }
    const newPath = pathname.replace(wrNo, nextWorkRequestId);
    history.replace(newPath)

  }
  const handlePrevClick = () => {
    if(!prevWorkRequestId){
      return;
    }
    const newPath = pathname.replace(wrNo, prevWorkRequestId);
    history.replace(newPath)
  }
  const classes = useStyles();
  return (
    <div className={classes.workReqNav}>
      <div>
        <IconButton disabled={!prevWorkRequestId} onClick={handlePrevClick}>
          <PreviousIcon />
        </IconButton>
        <Typography variant="h6" className={classes.navTitle}>{workrequestNoout ? `${workrequestNoout} | ${Statusdesc}` : ''}</Typography>
      </div>
      <IconButton disabled={!nextWorkRequestId} onClick={handleNextClick}>
        <NextIcon />
      </IconButton>
    </div>
  )
}