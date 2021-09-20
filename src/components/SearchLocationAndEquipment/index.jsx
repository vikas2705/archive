import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import SelectGroup from "./SelectGroup";

const useStyles = makeStyles({
    header: {},
    tabWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        background: "#FFFFFF",
        boxShadow: "0px 2px 2px rgb(0 0 0 / 5%)",
    },
    tab: {
        paddingBottom: 9,
        fontSize: 12,
        fontWeight: 600,
        color: "#33415C",
    },
    active: {
        borderBottom: "2px solid #0073E6",
    },
});

const TAB = {
    SEARCH: "TAB_SEARCH",
    GROUP: "GROUP",
};
export default function SearchLocationAndEquipment() {
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState(TAB.SEARCH);

    return (
        <div>
            <div>
                <PageHeader title='Search Location' onClose={() => {}} />
                <div className={classes.tabWrapper}>
                    <div
                        className={clsx(classes.tab, {
                            [classes.active]: activeTab === TAB.SEARCH,
                        })}
                        onClick={() => {
                            setActiveTab(TAB.SEARCH);
                        }}
                    >
                        Loc. Name & Code
                    </div>
                    <div
                        className={clsx(classes.tab, {
                            [classes.active]: activeTab === TAB.GROUP,
                        })}
                        onClick={() => {
                            setActiveTab(TAB.GROUP);
                        }}
                    >
                        Planning Group
                    </div>
                </div>
            </div>
            <div className={classes.container}>
                {/* <SearchLocation /> */}
                <SelectGroup />
            </div>
        </div>
    );
}
