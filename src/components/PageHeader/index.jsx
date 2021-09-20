import React from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import HambergerIcon from "../../assets/Icons/HambergerIcon";
import { useNavigation } from "../../app/trackedContext";
import { useHistory } from "react-router-dom";
import BackIcon from "../../assets/Icons/BackIcon";
import IconButton from "../IconButton";

const useStyles = makeStyles({
    titleWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "17px 14px 14px 14px",
        backgroundImage: "linear-gradient(to right, #0073E6 , #52E5E7)",
        "& > div:first-child": {
            display: "flex",
            alignItems: "center",
        },
    },
    startIcon: {
        display: "flex",
        "& > svg": {
            margin: "auto",
        },
    },
    backBtn: {
        width: 20,
        height: 20,
        padding: 3,
    },
    title: {
        margin: 0,
        color: "#33415C",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: "auto",
        marginBottom: "auto",
    },
    marginLeft: {
        marginLeft: 12,
        marginTop: 5,
    },
    rightActions: {
        display: "flex",
        "&  div": {
            marginTop: "auto",
            marginBottom: "auto",
        },
    },
});
export default function PageHeader(props) {
    const classes = useStyles();
    const { title = "", rightActions } = props;
    const history = useHistory();
    const { openNav, showNav } = useNavigation();

    const handleNavClick = () => {
        showNav(!openNav);
    };
    const handleBackClick = () => {
        history.goBack();
    };
    return (
        <div className={classes.titleWrapper}>
            <div>
                {props.showNav ? (
                    <IconButton onClick={handleNavClick}>
                        <HambergerIcon />
                    </IconButton>
                ) : null}
                {props.showBack ? (
                    <IconButton
                        className={classes.backBtn}
                        onClick={handleBackClick}
                    >
                        <BackIcon />
                    </IconButton>
                ) : null}
                <h3
                    className={clsx(classes.title, {
                        [classes.marginLeft]: showNav,
                    })}
                >
                    {title}
                </h3>
            </div>
            <div className={classes.rightActions}>
                {rightActions?.map((rightIcon, index) => {
                    return (
                        <>
                            {rightIcon.type === "icon" && (
                                <button
                                    key={`btn-${index}`}
                                    className={
                                        "nebula-icons " +
                                        (rightIcon.iconCls
                                            ? rightIcon.iconCls
                                            : "")
                                    }
                                    style={{
                                        border: "none",
                                        background: "transparent",
                                        padding: "0px",
                                        margin: "5px",
                                        fontSize: "20px",
                                    }}
                                    onClick={rightIcon.action}
                                ></button>
                            )}
                            {rightIcon.type === "image" && (
                                <img
                                    key={`image-${index}`}
                                    alt=''
                                    src={rightIcon.src}
                                    className='app-navbar-profile'
                                    onClick={rightIcon.action}
                                    key={"navprofile_" + index}
                                />
                            )}
                            {rightIcon.type === "status" && (
                                <div
                                    key={`status-${index}`}
                                    className={rightIcon.cls}
                                    onClick={rightIcon.action}
                                    key={"navstatus_" + index}
                                >
                                    {rightIcon.text}
                                </div>
                            )}
                        </>
                    );
                })}
            </div>
        </div>
    );
}
