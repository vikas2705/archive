import React from "react";
import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import { Trans } from 'react-i18next';

const useStyles = makeStyles({
    tabContainerWrapper: {
        width: "100%",
        alignItems: "center",
        display: "flex",
        justifyContent: "space-around",
        boxShadow: "2px 0px 2px 2px rgba(0, 0, 0, 0.05)",
        height: "90px",

        "&.onlyText": {
            boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
            height: "50px",
        },
    },
    textColorTab: {
        color: "#979DAC",

        "&.active": {
            color: "#ffffff",
        },
    },
    primaryColor: {
        color: "#ffffff",
        border: "1px solid #979DAC",
        borderRadius: "50%",
        padding: "3px 0",
        height: "30px",

        "&.active": {
            color: "#2196f3",
            border: "none",
            fontSize: 15,
            padding: "0",
        },
    },
    tabHolder: {
        // padding: "15px 15px 5px 15px",
        textAlign: "center",
        fontSize: "12px",
        cursor: "pointer",
        borderBottom: "4px solid #f7f9fb",

        "&.onlyText": {
            color: "#7D8597",
            fontSize: 13,
            fontWeight: 400,
            // padding: "0px 15px 0px 15px",
        },
    },
    tabSubText: {
        color: "#5C677D",
    },
    tabTitle: {
        marginTop: "10px",
        "&.onlyText": {
            marginTop: "0px",
            padding: 10,
        },
        "&.onlyText.activeTab": {
            color: "#33415C",
            fontWeight: 600,
        },
    },
    activeBorder: {
        borderBottom: "4px solid #0073E6",
    },
});
export default function TabContainer(props) {
    const classes = useStyles();
    const { onChange, tabsData = [], activeTab, showCount = false } = props;

    const handleClick = index => {
        if (onChange) {
            onChange(index);
        }
    };

    const renderCount = index => {
        return (
            <span
                className={classnames("fa-stack", classes.primaryColor, {
                    active: activeTab === index,
                })}
            >
                <span className='fa fa-circle fa-stack-2x'></span>
                <strong
                    className={classnames(
                        "fa-stack-1x ",
                        classes.textColorTab,
                        {
                            active: activeTab === index,
                        }
                    )}
                >
                    {index}
                </strong>
            </span>
        );
    };

    const renderTab = params => {
        const { index = 1, title = "", subText = "" } = params;
        return (
            <div
                key={title}
                className={classnames(classes.tabHolder, {
                    [classes.activeBorder]: activeTab === index,
                    onlyText: !showCount,
                })}
                onClick={() => handleClick(index)}
            >
                {showCount && (
                    <div className={classes.tabStepCount}>
                        {renderCount(index)}
                    </div>
                )}
                <div
                    className={classnames(classes.tabTitle, {
                        activeTab: activeTab === index,
                        onlyText: !showCount,
                    })}
                >
                    <Trans>{title}</Trans>
                </div>
                {subText && (
                    <div className={classes.tabSubText}>({subText})</div>
                )}
            </div>
        );
    };

    return (
        <div
            className={classnames(classes.tabContainerWrapper, {
                onlyText: !showCount,
            })}
        >
            {tabsData.map(tabData => {
                return renderTab(tabData);
            })}
        </div>
    );
}
