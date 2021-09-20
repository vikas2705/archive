import { makeStyles } from "@material-ui/styles";
import { useMemo, useState } from "react";
import ApproveAnywhereListDetail from "./ApproveAnywhereListDetail";
import PageHeader from "../../../components/PageHeader";
import Spinner from "../../../components/Spinner";
import SettingsIcon from "../../../assets/Icons/SettingsIcon";
import ChatIcon from "../../../assets/Icons/ChatIcon";
import TimelineIcon from "../../../assets/Icons/TimelineIcon";
import GroupIcon from "../../../assets/Icons/GroupIcon";
import MoreIcon from "../../../assets/Icons/MoreIcon";
import { useHistory, useLocation } from "react-router";
import EAMButton from "../../../components/EAMButton";
import EAMMenu from "../../../components/EAMMenu";

const useStyles = makeStyles({
    container: {
        height: "100%",
    },
    actionWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        background: "#FFFFFF",
        boxShadow: "0px -4px 4px rgba(0, 0, 0, 0.05)",
        zIndex: 999,
        minHeight: 42,
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: "center",
    },
    pageHeading: {
        height: "73px",
        left: "0px",
        top: "54px",
        background: "#FFFFFF",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: "999",
    },
    primaryInfo: {
        padding: "0 17px",
        margin: "13px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemName: {
        color: "#001845",
        fontSize: 14,
        fontWeight: 400,
        alignItems: "center",
        display: "flex",
    },
    price: {
        color: "#CC4A00",
        fontSize: 14,
        fontWeight: 700,
    },
    itemCurrency: {
        color: "#000000",
        paddingRight: 5,
    },
    idClass: {
        color: "#5C677D",
        paddingLeft: 5,
        fontSize: 14,
    },
    actionIcons: {
        paddingLeft: 10,
    },
    menu: {
        color: "#0466C8",
        fontWeight: 700,
        fontSize: 15,
        margin: "auto 10px",
        "&:not(:last-child)": {
            borderBottom: "1px solid #E9EBEF",
        },
    },
    moreActionWrapper: {
        display: "flex",
        alignItems: "center",
        paddingLeft: 12,
    },
});

const data = {
    name: "Parrys WH",
    price: "20345",
    currencySymbol: "₹",
    orderNumber: "WO/21/45678",
};

const otherActions = [
    { id: "NA", label: "Notes & Attachment" },
    { id: "CK", label: "Checklist" },
    { id: "CL", label: "Collaborate" },
    { id: "AH", label: "Approval History" },
    { id: "PR", label: "Print" },
];

export default function ApproveAnywhereListData(props) {
    const classes = useStyles();
    const status = "received";
    const history = useHistory();
    const location = useLocation();

    return (
        <div className={classes.container}>
            <PageHeader title='PIS/2021/4325 | Production Issue' showBack />
            <div className={classes.wrapper}>
                <div className={classes.pageHeading}>
                    <div className={classes.primaryInfo}>
                        <div className={classes.itemName}>{data.name}</div>
                        <div className={classes.itemData}>
                            <span className={classes.itemCurrency}>
                                {data.currencySymbol}
                            </span>
                            <span className={classes.price}>{data.price}</span>
                        </div>
                    </div>
                    <div className={classes.primaryInfo}>
                        <div className={classes.itemName}>
                            <SettingsIcon />
                            <span className={classes.idClass}>
                                {data.orderNumber}
                            </span>
                        </div>
                        <div>
                            <span
                                className={classes.actionIcons}
                                onClick={() => {
                                    history.push(
                                        `${location.pathname}/history`
                                    );
                                }}
                            >
                                <GroupIcon
                                    color={"#0073E6"}
                                    height={"20"}
                                    width={"20"}
                                />
                            </span>
                            <span
                                className={classes.actionIcons}
                                onClick={() => {
                                    history.push(
                                        `${location.pathname}/collaborate`
                                    );
                                }}
                            >
                                <ChatIcon
                                    color={"#0073E6"}
                                    height={"20"}
                                    width={"20"}
                                />
                            </span>
                            <span
                                className={classes.actionIcons}
                                onClick={() => {
                                    history.push(
                                        `${location.pathname}/timeline`
                                    );
                                }}
                            >
                                <TimelineIcon size={"20"} color={"#0073E6"} />
                            </span>
                        </div>
                    </div>
                </div>

                <div className={classes.listWrapper}>
                    {status === "requested" ? (
                        <Spinner
                            speed={0.5}
                            className={classes.spinner}
                            type='moon'
                            size={100}
                        />
                    ) : (
                        <ApproveAnywhereListDetail />
                    )}
                </div>

                <div className={classes.actionWrapper}>
                    <div className={classes.moreActionWrapper}>
                        {otherActions?.length ? (
                            <EAMMenu
                                id='wRActions'
                                menuItemClass={classes.menu}
                                label={
                                    <>
                                        <MoreIcon />
                                        <EAMButton
                                            className={classes.moreBtn}
                                            variant='secondary'
                                        >
                                            More
                                        </EAMButton>
                                    </>
                                }
                                value={otherActions}
                            />
                        ) : null}
                    </div>
                    <EAMButton variant='secondary'>Reject</EAMButton>
                    <EAMButton>Approve</EAMButton>
                </div>
            </div>
        </div>
    );
}
