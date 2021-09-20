import { Drawer, Popover, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import NextIcon from "../../../../../assets/Icons/NextIcon";
import PreviousIcon from "../../../../../assets/Icons/PreviousIcon";
import IconButton from "../../../../../components/IconButton";
import PageHeader from "../../../../../components/PageHeader";
import EAMExpandableItemRow from "../../../../../components/EAMExpandableItemRow";
import { useState } from "react";
import ListDrawer from "../../components/ListDrawer";
import IssueQuantityDialog from "../../components/IssueQuantityDialog";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    wrapper: {
        flex: "1",
        display: "flex",
        flexDirection: "column",
    },
    itemDetail: {
        flex: "1",
        padding: 10,
        background: "#e5e5e599",
    },
    itemNav: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "20px 10px 20px 10px",
        background: "#FFFCF5",
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
        "& > div": {
            "& > span": {
                margin: "auto",
            },
        },
        "& > div:first-child": {
            display: "flex",
            flexDirection: "row",
        },
    },
    popover: {
        boxShadow: "none",
    },
    name: {
        color: "#33415C",
        fontSize: 13,
    },
    code: {
        color: "##33415C",
        fontSize: 13,
        fontWeight: "bold",
    },
    leftSection: {
        flex: "1",
        display: "flex",
        paddingRight: 10,
        justifyContent: "space-between",
        "& >div:last-child": {
            marginTop: "auto",
            marginBottom: "auto",
        },
        "& >div:first-child": {
            display: "flex",
            flexDirection: "row",
            "& >div": {
                margin: "auto",
            },
        },
    },
    countName: {
        color: "#0073E6",
        fontSize: 13,
        fontWeight: "bold",
        marginRight: 18,
        marginTop: "auto",
        marginBottom: "auto",
    },
    countText: {
        fontSize: 16,
        fontWeight: "800",
    },
    countWrapper: {
        background: "#EDF6FF",
        padding: "17px 17px 0px 11px",
        /* Blue/Tint/Light */
        border: "1px solid rgba(0, 115, 230, 0.3)",
        boxSizing: "border-box",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
        borderRadius: 4,
        "& > div": {
            display: "flex",
            flexDirection: "row-reverse",
            marginBottom: 14,
        },
    },
    rightSection: {
        paddingLeft: 10,
        paddingRight: 10,
        borderLeft: "1px solid #0466C8",
    },
    count: {
        color: "#00AE50",
        fontSize: 14,
        fontWeight: "bold",
    },
});
const obj = [
    {
        name: "LOT 01",
        quantity: 100,
        children: [
            {
                name: "SL98765678",
            },
            {
                name: "SL987567",
            },
            {
                name: "SL765678",
            },
        ],
    },
    {
        name: "LOT 02",
        quantity: 45,
        children: [
            {
                name: "SL98765678",
            },
            {
                name: "SL987567",
            },
            {
                name: "SL765678",
            },
        ],
    },
];

const issueList = [
    { name: "Maintaince Work Order", code: "MW045679", count: "10" },
    { name: "Production Work Order", code: "MW045679", count: "05" },
    { name: "Subcontract Order", code: "MW045679", count: "02" },
    { name: "Material Request", code: "M8765SDD", count: "01" },
];
const countList = [
    { name: "Accepted", count: "20", color: "#00AE50" },
    { name: "Conditionally Accepted", count: "05", color: "#007435" },
    { name: "Allocated", count: "10", color: "#FFA800" },
    { name: "Rejected", count: "05", color: "#FF3333" },
    { name: "Consignment In", count: "10", color: "#33415C" },
    { name: "Consignment Out", count: "00", color: "#33415C" },
];
export default function ItemDetail() {
    const classes = useStyles();
    const [previewEl, setPreviewEl] = useState(null);
    const [showIssueList, setShowIssueList] = useState(false);
    const [showItemQuantityDialog, setShowItemQuantityDialog] = useState(false);

    return (
        <>
            <div className={classes.root}>
                <PageHeader title='Item Details' showBack />
                <div className={classes.wrapper}>
                    <div className={classes.itemNav}>
                        <div className={classes.leftSection}>
                            <div>
                                <div>
                                    <IconButton onClick={() => {}}>
                                        <PreviousIcon />
                                    </IconButton>
                                </div>
                                <div>
                                    <Typography
                                        className={classes.name}
                                        variant='body1'
                                    >
                                        ITM00003
                                    </Typography>
                                    <Typography
                                        className={classes.code}
                                        variant='body1'
                                    >
                                        CNC Large
                                    </Typography>
                                </div>
                            </div>
                            <div>
                                <Typography
                                    variant='body1'
                                    className={classes.count}
                                >
                                    50 Nos
                                </Typography>
                            </div>
                        </div>
                        <IconButton onClick={() => {}}>
                            <NextIcon />
                        </IconButton>
                    </div>
                    <div className={classes.itemDetail}>
                        <EAMExpandableItemRow
                            onClick={event => {
                                setPreviewEl(event.currentTarget);
                            }}
                            value={obj}
                        />
                    </div>
                </div>
            </div>
            <Popover
                id='count'
                open={!!previewEl}
                anchorEl={previewEl}
                classes={{
                    paper: classes.popover,
                }}
                onClose={() => {
                    setPreviewEl(null);
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <div className={classes.countWrapper}>
                    {countList.map(item => (
                        <div
                            className={classes.countRow}
                            onClick={() => {
                                setShowIssueList(true);
                            }}
                        >
                            <Typography
                                className={classes.countText}
                                variant='body1'
                                style={{ color: `${item.color}` }}
                            >
                                {item.count}
                            </Typography>
                            <Typography
                                className={classes.countName}
                                variant='body1'
                            >
                                {item.name}
                            </Typography>
                        </div>
                    ))}
                </div>
            </Popover>
            <ListDrawer
                title='Issue List'
                open={showIssueList}
                value={issueList}
                onItemClick={() => {
                    setShowIssueList(false);
                    setShowItemQuantityDialog(true);
                }}
                onClose={() => {
                    setShowIssueList(false);
                }}
            />

            <IssueQuantityDialog
                open={showItemQuantityDialog}
                title='Maintaince List'
                onClose={() => {
                    setShowItemQuantityDialog(false);
                }}
            />
        </>
    );
}
