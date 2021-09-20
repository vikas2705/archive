import { makeStyles } from "@material-ui/styles";
import { useCallback } from "react";
import Row from "./Row";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles(theme => ({
    wrapper: {
        overflowY: "scroll",
        height: "80vh",
        background: "#E7F3FF",
    },
    issueNo: {
        display: "inline",
    },
}));

const aprvReqList = [
    {
        aprvRequestNoout: "CNC Large - ITM99234",
        aprvRequestDesc: "50MM - V2",
        count: "10",
        showFooter: true,
    },
    {
        aprvRequestNoout: "CNC Medium - ITM99221 ",
        aprvRequestDesc: "50MM - V2",
        count: "05",
        showFooter: true,
    },
    {
        aprvRequestNoout: "CNC Small - ITM95932",
        aprvRequestDesc: "50MM - V2",
        count: "02",
        showFooter: true,
    },
];

const aprvReqLisst = [
    {
        date: "2021-06-07T00:00:00.000+05:30",
        workOrderNo: "WO/123/232",
        aprvRequestNoout: "PIS/2021/4320",
        aprvRequestDesc: "Parrys WH R1PFFB1",
        requestPrice: "2400",
        itemCount: "2 items",
        showFooter: true,
    },
    {
        date: "2021-06-07T00:00:00.000+05:30",
        workOrderNo: "WO/123/232",
        aprvRequestNoout: "PIS/2021/4321",
        aprvRequestDesc: "Parrys WH R1PFFB1",
        requestPrice: "2400",
        itemCount: "1 item",
        showFooter: true,
    },
    {
        date: "2021-06-07T00:00:00.000+05:30",
        workOrderNo: "WO/123/232",
        aprvRequestNoout: "PIS/2021/4322",
        aprvRequestDesc: "Parrys WH R1PFFB1",
        requestPrice: "2400",
        showFooter: true,
    },
    {
        date: "2021-06-07T00:00:00.000+05:30",
        workOrderNo: "WO/123/232",
        aprvRequestNoout: "PIS/2021/4323",
        aprvRequestDesc: "Parrys WH R1PFFB1",
        requestPrice: "2400",
        itemCount: "3 items",
    },
    {
        date: "2021-06-07T00:00:00.000+05:30",
        workOrderNo: "WO/123/232",
        aprvRequestNoout: "PIS/2021/4324",
        aprvRequestDesc: "Parrys WH R1PFFB1",
        requestPrice: "2400",
    },
    {
        date: "2021-06-07T00:00:00.000+05:30",
        workOrderNo: "WO/123/232",
        aprvRequestNoout: "PIS/2021/4325",
        aprvRequestDesc: "Parrys WH R1PFFB1",
        requestPrice: "2400",
    },
];

export default function ApproveAnywhereListDetail(props) {
    const classes = useStyles();
    const clickHandler = item => {
        console.log("Clicked item", item);
    };
    const handleFetchMore = useCallback(() => {
        console.log("FetchMore");
    }, []);

    const handleRefresh = useCallback(() => {
        console.log("Refresh");
    }, []);
    const totalCount = 100;
    return (
        <div className={classes.wrapper} id='aprvReqlistcontainer'>
            <InfiniteScroll
                id='infinite-scroll-component'
                dataLength={aprvReqList.length}
                next={handleFetchMore}
                hasMore={aprvReqList.length < totalCount}
                scrollableTarget='aprvReqlistcontainer'
                refreshFunction={handleRefresh}
                pullDownToRefresh
                pullDownToRefreshThreshold={100}
                pullDownToRefreshContent={
                    <h3 style={{ color: "#1d95e7", textAlign: "center" }}>
                        &#8595; Pull down to refresh
                    </h3>
                }
                releaseToRefreshContent={
                    <h3 style={{ color: "#1d95e7", textAlign: "center" }}>
                        &#8593; Release to refresh
                    </h3>
                }
            >
                {aprvReqList?.map((req, index) => (
                    <Row
                        key={`${req.id}_${index}`}
                        isSelectable={true}
                        value={req}
                        onClick={clickHandler}
                    />
                ))}
            </InfiniteScroll>
        </div>
    );
}
