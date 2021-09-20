import { makeStyles } from "@material-ui/styles";
import NoteIcon from "../../../../../assets/Icons/NoteIcon";
import ReminderIcon from "../../../../../assets/Icons/ReminderIcon";
import EAMMenu from "../../../../../components/EAMMenu";
import IconButton from "../../../../../components/IconButton";
import MenuIcon from "../../../../../assets/Icons/MenuIcon";
import { useCallback, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import IssueListDrawer from "../../IssueListDrawer";
import { useHistory, useLocation } from "react-router";

const allowedActions = [
    { id: "NA", label: "Notes & Attachment" },
    { id: "CK", label: "Checklist" },
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

    main: {
        minHeight: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
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
        justifyContent: "flex-end",
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
    },
    price: {
        color: "#CC4A00",
        fontSize: 13,
        fontWeight: 800,
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
    leftContainer: {},
    actionIcons: {
        "& > svg": {
            fill: "#7D8597",
            width: 12,
            height: 12,
            marginRight: 5,
        },
    },
    count: { fontSize: 14 },
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
        requestPrice,
        Priorityout,
        showFooter,
    } = value;
    const classes = useStyles(Priorityout);
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
            }  else if (id === "CK") {
                history.push(`${location.pathname}/checklist`);
            }
        },
        [aprvRequestNoout]
    );
    const handleNoteClick = event => {
        event.stopPropagation();
    };

    const handleReminderClick = event => {
        event.stopPropagation();
    };

    const handleCloseIssueListDrawer = event => {
        event.stopPropagation();
        setShowItemsList(false);
    };
    return (
        <div className={classes.card}>
            <div className={classes.main}>
                <div className={classes.leftContainer}>
                    <span onClick={handleItemClick} className={classes.number}>
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
            <div onClick={handleItemClick} className={classes.detailSection}>
                <div onClick={handleItemClick} className={classes.desc}>
                    {aprvRequestDesc}
                </div>
                <div onClick={handleItemClick}>
                    <span className={classes.count}>10 Nos.</span>
                    <span className={classes.price}>{requestPrice}</span>
                </div>
            </div>
            {showFooter && (
                <div className={classes.footer}>
                    <div>
                        <span
                            className={classes.actionIcons}
                            onClick={handleNoteClick}
                        >
                            <NoteIcon />
                        </span>
                        <span
                            className={classes.actionIcons}
                            onClick={handleReminderClick}
                        >
                            <ReminderIcon />
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
