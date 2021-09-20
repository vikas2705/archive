import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import Checkbox from "@material-ui/core/Checkbox";

import DateIcon from "../../../../assets/Icons/DateIcon";
import SettingsIcon from "../../../../assets/Icons/SettingsIcon";
import NoteIcon from "../../../../assets/Icons/NoteIcon";
import ReminderIcon from "../../../../assets/Icons/ReminderIcon";
import ChatIcon from "../../../../assets/Icons/ChatIcon";
import EAMMenu from "../../../../components/EAMMenu";
import IconButton from "../../../../components/IconButton";
import MenuIcon from "../../../../assets/Icons/MenuIcon";
import { useCallback, useState } from "react";
import { useConfirmationDialog } from "../../../../components/EAMConfirmDialog";
import { useRouteMatch } from "react-router-dom";
import IssueListDrawer from "../IssueListDrawer";
import { useHistory, useLocation } from "react-router";

const allowedActions = [
    { id: "NA", label: "Notes & Attachment" },
    { id: "CK", label: "Checklist" },
    { id: "CL", label: "Collaborate" },
    { id: "AH", label: "Approval History" },
];

const itemsList = [
    { name: "CNC Large - ITM99234", code: "50MM - V2", count: "10" },
    { name: "CNC Medium - ITM99221 ", code: "50MM - V2", count: "05" },
    { name: "CNC Small - ITM95932", code: "50MM - V2", count: "02" },
];

const useStyles = makeStyles(theme => ({
    card: {
        marginTop: 10,
        margin: "0px 12px 10px 12px",
        padding: "12px 12px 10px 11px",
        background: "#FFFFFF",
        border: "1px solid #E9EBEF",
        boxSizing: "border-box",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
        borderRadius: 4,
    },
    checkbox: {
        padding: 0,
        "& > span": {
            paddingRight: 10,
        },
        "& > span > input": {
            paddingRight: 12,
        },
    },
    main: {
        cursor: "pointer",
    },
    detailSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "& > div": {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
    },
    actionItems: {
        paddingTop: 12,
        display: "flex",
        flexDirection: "row",
        "& > div": {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
    },
    footer: {
        marginTop: 5,
        paddingTop: 5,
        display: "flex",
        flexDirection: "row",
        borderTop: "1px dashed #C9CDD6",
        justifyContent: "space-between",
        "& > div": {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
    },
    number: {
        fontSize: 13,
        // color: '#7D8597',
        color: "#33415C",
        paddingRight: 2,
        fontWeight: 800,
    },
    desc: {
        fontSize: 14,
        fontWeight: 400,
        color: "#000000",
        paddingLeft: 5,
    },
    price: {
        color: "#CC4A00",
        fontSize: 13,
        fontWeight: 800,
        paddingLeft: 5,
    },
    itemText: {
        marginLeft: 5,
        marginRight: 5,
        color: "#5C677D",
        fontWeight: 600,
        fontSize: 12,
    },
    itemCount: {
        color: "#0073E6",
        fontWeight: 800,
        fontSize: 13,
        cursor: "pointer",
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
    leftContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    actionIcons: {
        "& > svg": {
            fill: "#7D8597",
            width: 12,
            height: 12,
            marginRight: 5,
        },
    },
}));

export default function Row({ isSelectable, value, onClick }) {
    const match = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const [showItemsList, setShowItemsList] = useState(false);
    const { groupBy } = match.params;
    const {
        aprvRequestNoout,
        aprvRequestDesc,
        date,
        workOrderNo,
        requestPrice,
        itemCount,
        Priorityout,
        showFooter,
    } = value;
    const formattedDate = moment(date).format("DD/MM/YYYY");
    const classes = useStyles(Priorityout);
    const { getConfirmation } = useConfirmationDialog();
    const handleItemSelectToggle = useCallback(
        event => {
            event.stopPropagation();
            // dispatch(actions.aprvRequestV2.list.toggleItemSelect(groupBy, aprvRequestNoout))
        },
        [groupBy, aprvRequestNoout]
    );

    const handleItemClick = () => {
        onClick(aprvRequestNoout);
    };
    const handleMenuItemClick = useCallback(
        async id => {
            if (id === "AH") {
                history.push(`${location.pathname}/history`);
            } else if (id === "CL") {
                history.push(`${location.pathname}/collaborate`);
            } else if (id === "CK") {
                history.push(`${location.pathname}/checklist`);
            }
        },
        [aprvRequestNoout]
    );
    const handleItemCountClick = event => {
        event.stopPropagation();
        setShowItemsList(true);
    };

    const handleCloseIssueListDrawer = event => {
        event.stopPropagation();
        setShowItemsList(false);
    };
    return (
        <div
            className={classes.card}
            onClick={() => {
                history.push(`${location.pathname}/123`);
            }}
        >
            <div className={classes.main}>
                <div className={classes.leftContainer}>
                    <div>
                        {isSelectable ? (
                            <Checkbox
                                className={classes.checkbox}
                                // checked={!!isItemSelected}
                                checked={false}
                                onChange={handleItemSelectToggle}
                                color='primary'
                                inputProps={{
                                    "aria-label": "secondary checkbox",
                                }}
                            />
                        ) : null}
                        <span
                            onClick={handleItemClick}
                            className={classes.number}
                        >
                            {aprvRequestNoout}
                        </span>
                    </div>
                    {allowedActions?.length ? (
                        <EAMMenu
                            id={aprvRequestNoout}
                            onMenuItemClick={handleMenuItemClick}
                            menuItemClass={classes.menu}
                            label={
                                <IconButton>
                                    <MenuIcon />
                                </IconButton>
                            }
                            value={allowedActions}
                        />
                    ) : null}
                </div>
                <div
                    onClick={handleItemClick}
                    className={classes.detailSection}
                >
                    <div onClick={handleItemClick} className={classes.desc}>
                        {aprvRequestDesc}
                    </div>
                    <div onClick={handleItemClick}>
                        <span>₹</span>
                        <span className={classes.price}>{requestPrice}</span>
                    </div>
                </div>
                <div onClick={handleItemClick} className={classes.actionItems}>
                    <div>
                        <DateIcon />
                        <span className={classes.itemText}>
                            {formattedDate}
                        </span>
                    </div>
                    <div>
                        <SettingsIcon />
                        <span className={classes.itemText}>{workOrderNo}</span>
                    </div>
                </div>
            </div>
            {showFooter && (
                <div className={classes.footer}>
                    <div>
                        {itemCount && (
                            <span
                                onClick={handleItemCountClick}
                                className={classes.itemCount}
                            >
                                {itemCount}
                            </span>
                        )}
                    </div>
                    <div>
                        <span className={classes.actionIcons}>
                            <NoteIcon />
                        </span>
                        <span className={classes.actionIcons}>
                            <ReminderIcon />
                        </span>
                        <span className={classes.actionIcons}>
                            <ChatIcon />
                        </span>
                    </div>
                </div>
            )}
            <IssueListDrawer
                title={aprvRequestNoout}
                open={showItemsList}
                value={itemsList}
                onItemClick={handleCloseIssueListDrawer}
                onClose={e => handleCloseIssueListDrawer(e)}
            />
        </div>
    );
}
