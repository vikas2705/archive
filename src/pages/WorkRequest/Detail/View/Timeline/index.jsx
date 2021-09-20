import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import actions from "../../../../../actions";
import { selectors } from "../../../../../reducers";
import { makeStyles } from "@material-ui/styles";
import EAMTimeline from "../../../../../components/EAMTimeline";
import Spinner from "../../../../../components/Spinner";

const useStyles = makeStyles({
  spinner: {
    margin: 'auto',
  },
})


const emptySet = [];
export default function WrTimeline({ wrNo }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { value: timeline = emptySet, status } = useSelector(state => selectors.wrTimeline(state, wrNo), shallowEqual);

  useEffect(() => {
    dispatch(actions.workRequestV2.timeline.request(wrNo))
  }, [dispatch, wrNo])

  return (
    <>
      {['received', 'error'].includes(status) ? (
        (<EAMTimeline value={timeline} />)
      )
        :
        <Spinner speed={0.5} className={classes.spinner} type="moon" size={100} />
      }
    </>
  )
}