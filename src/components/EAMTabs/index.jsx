import React from "react";
import { makeStyles } from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
    tabContainerWrapper: {
        width: "100%",
        display: "flex",
        // alignItems: "center",
        //  justifyContent: "space-around",
        boxShadow: "2px 0px 2px 2px rgba(0, 0, 0, 0.05)",
        overflowX: "auto",
    },
    tabText: {
        paddingTop: 10,
        minHeight: "unset",
        "& > span": {
            fontWeight: "600",
            fontSize: 12,
            color: "#7D8597",
            marginLeft: "auto",
            marginRight: "auto",
            textTransform: "none",
            fontFamily: "Lato Regular",
        },
    },
});

export default function EAMTabs(props) {
    const classes = useStyles();
    const { onChange, className, tabsData = [], value, ...others } = props;
    return (
        <Tabs
            value={value}
            onChange={onChange}
            className={className}
            variant={"scrollable"}
            scrollButtons='off'
            indicatorColor='primary'
            textColor='primary'
            aria-label='scrollable force tabs example'
            {...others}
        >
            {tabsData.map((tab, index) => (
                <Tab
                    key={tab.label}
                    className={classes.tabText}
                    label={tab.label}
                    icon={tab.icon}
                ></Tab>
            ))}
        </Tabs>
    );
}
