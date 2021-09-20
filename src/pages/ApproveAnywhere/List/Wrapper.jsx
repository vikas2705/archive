import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useMemo, useState } from "react";
import ApproveAnywhereList from ".";
import EAMTabs from "../../../components/EAMTabs";
import PageHeader from "../../../components/PageHeader";
import Spinner from "../../../components/Spinner";
import ApproveAnywhereListFilter from "./Filter";

const useStyles = makeStyles({
    container: {
        height: "100%",
    },
    count: {
        fontWeight: "800",
        fontSize: 16,
        color: "#7D8597",
        textAlign: "center",
    },
    production: {
        color: "#0073E6",
    },
    maintainance: {
        color: "#DD9200",
    },
    sub: {
        color: "#FF3333",
    },
    inventory: {
        color: "#00AE50",
    },
    unplanned: {
        color: "#FF5C00",
    },
    wrapper: {
        "& .MuiTab-root": {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
    tabSpacing: {
        "& .MuiTabs-flexContainer": {
            alignItems: "center",
            justifyContent: "space-around",
        },
    },
});

export default function ApproveAnywhereListWrapper(props) {
    const classes = useStyles();
    const [showFilterScreen, setShowFilterScreen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const rightActions = useMemo(() => {
        return [
            {
                id: "1",
                type: "icon",
                iconCls: "filter_list-nbicon",
                action: () => {
                    setShowFilterScreen(true);
                },
            },
        ];
    }, []);
    const status = "received";

    const handleTabChange = (event, index) => {
        setActiveTab(index);
    };
    const countArr = [
        {
            label: "Production",
            icon: (
                <Typography className={(classes.count, classes.production)}>
                    8
                </Typography>
            ),
            circlecolor: "#0073E6",
        },
        {
            label: "Maintainance",
            icon: (
                <Typography className={(classes.count, classes.maintainance)}>
                    10
                </Typography>
            ),
            value: 10,
            circlecolor: "#FF3333",
        },
        {
            label: "Sub Con.",
            icon: (
                <Typography className={(classes.count, classes.sub)}>
                    2
                </Typography>
            ),
            value: 2,
            circlecolor: "#DD9200",
        },
        {
            label: "Inventory",
            icon: (
                <Typography className={(classes.count, classes.inventory)}>
                    100
                </Typography>
            ),
            value: 100,
            circlecolor: "#00AE50",
        },
        {
            label: "Unplanned",
            icon: (
                <Typography className={(classes.count, classes.unplanned)}>
                    2
                </Typography>
            ),
            value: 2,
            circlecolor: "#FF5C00",
        },
    ];

    return (
        <div className={classes.container}>
            <PageHeader
                title='Approve Anywhere'
                showBack
                rightActions={rightActions}
            />
            <div className={classes.wrapper}>
                <div className={classes.tabContainer}></div>
                <EAMTabs
                    className={classes.tabSpacing}
                    tabsData={countArr}
                    value={activeTab}
                    variant='colored'
                    onChange={handleTabChange}
                />
                <div className={classes.listWrapper}>
                    {status === "requested" ? (
                        <Spinner
                            speed={0.5}
                            className={classes.spinner}
                            type='moon'
                            size={100}
                        />
                    ) : (
                        <ApproveAnywhereList />
                    )}
                </div>
            </div>
            {showFilterScreen ? (
                <ApproveAnywhereListFilter
                    onClose={() => {
                        setShowFilterScreen(false);
                    }}
                />
            ) : null}
        </div>
    );
}
