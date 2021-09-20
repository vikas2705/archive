import { makeStyles } from "@material-ui/styles";
import { useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import actions from "../../../../actions";
import { selectors } from "../../../../reducers";
import Row from "./Row";

const useStyles = makeStyles(theme => ({
  wrapper: {
    overflowY: 'scroll',
  },
}))
const emptySet = [];

export default function WorkRequestListing({ canManage = false }) {
  const match = useRouteMatch();
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { groupBy, status: subGroup } = match.params;
  const dispatch = useDispatch();
  const workRequestList = useSelector(state => selectors.workRequestListObj(state, groupBy)?.list || emptySet);
  // const workRequestList =emptySet;
  // const status = useSelector(state => selectors.workRequestActiveTab(state, groupBy));
  const status = '';
  const totalCount = useSelector(state => {
    if(groupBy === 'Status' && subGroup !== undefined){
      return selectors.wRDashboardStatusCountByTaskStatus(state, subGroup);
    }
    return selectors.workRequestStatusCount(state, groupBy, status);
  });
  const handleFetchMore = useCallback(() => {
    dispatch(actions.workRequestV2.list.requestNextPage(groupBy, status))
  }, [dispatch, groupBy, status])

  const handleRefresh = useCallback(() => {
    dispatch(actions.workRequestV2.list.refresh(groupBy))
  }, [dispatch, groupBy])
  const handleClick = (wrNo) => {
    history.push(`${location.pathname}/${wrNo}`)
  }

  return (
    <div className={classes.wrapper}
      id="wrkreqlistcontainer">
      <InfiniteScroll
        id="infinite-scroll-component"
        dataLength={workRequestList.length}
        next={handleFetchMore}
        hasMore={workRequestList.length < totalCount}
        scrollableTarget="wrkreqlistcontainer"
        refreshFunction={handleRefresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={100}
        pullDownToRefreshContent={
          <h3 style={{ color: "#1d95e7", textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ color: "#1d95e7", textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        {workRequestList?.map((req, index) => (
          <Row
            key={`${req.workrequestNoout}-${index}`}
            isSelectable={canManage}
            value={req}
            onClick={handleClick}
            groupBy={groupBy}
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}