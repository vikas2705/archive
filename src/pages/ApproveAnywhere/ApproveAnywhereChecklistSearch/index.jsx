import react, { useState } from "react";
import PageHeader from "../../../components/PageHeader";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from "../../../assets/Icons/SearchIcon";
import classnames from "classnames";
import ChecklistSearchList from "./ChecklistSearchList";
import ChecklistSearchDetails from "./ChecklistSearchDetails";
import EAMText from '../../../components/EAMText';

import { useHistory, useLocation } from "react-router";

const useStyles = makeStyles({
    container: {
        "& .MuiTimelineItem-missingOppositeContent:before": {
            padding: 0,
        },
        fieldsetContainer: {
            width: "100%",
            minHeight: "65px",
            border: "1px solid #E9EBEF",
            color: "#979DAC",
            display: "inline-block",
            borderRadius: "4px",
            fontSize: "12px",
            position: "relative",
        },
          fieldValue: {
            paddingTop: 6,
            color: "rgb(17, 17, 17)",
            fontSize: 13,
            paddingLeft: 20,
            width: "70%",
            height: "auto",
            paddingBottom: 6,
        },
        rightActionWrapper: {
            position: "absolute",
            right: 0,
            top: 10,
            "& > svg": {
                marginRight: 24,
            },
            "& > span": {
                marginRight: 24,
            },
        },
    }
});

const checklistData = [
    {
        index: 1,
        id: "CHKID",
        name: "Checklist Desctiption",
    },
    {
        index: 2,
        id: "CHKID",
        name: "Checklist Desctiption A",
    },
    {
        index: 3,
        id: "CHKID",
        name: "Checklist Desctiption B",
    },
    {
        index: 3,
        id: "CHKID",
        name: "Checklist Desctiption C",
    },
];

const checklistSearchedData = [
    {
        index: 1,
        checklistQty: "100 M3",
        checklistTitle: "Checklist Desctiption",
    },
    {
        index: 2,
        checklistQty: "100 M3",
        checklistTitle: "Checklist Desctiption A",
    },
    {
        index: 3,
        checklistQty: "100 M3",
        checklistTitle: "Checklist Desctiption B",
    },
    {
        index: 3,
        checklistQty: "100 M3",
        checklistTitle: "Checklist Desctiption C",
    },
];


export default function ApproveAnywhereChecklistSearch() {
    const classes = useStyles();
    const [openSearch, setOpenSearch] = useState(false);
    const [searchedValue, setSearchedValue] = useState("");


    const handleClickOpenSearch = () => {
        setOpenSearch(true);
    };


    const handleCloseChecklistSearchList = (e) => {
        setOpenSearch(false);
    };

    const handleChecklistItemClick = (item) => {
        handleCloseChecklistSearchList()
        setSearchedValue(`${item.id}-${item.name}`)
    };

    return (
        <div className={classes.container}>
            <PageHeader title='PIS/2021/4325 | Checklist' showBack />
            <fieldset className={classnames(classes.fieldsetContainer)} onClick={handleClickOpenSearch}>
                <legend>Search</legend>
                <div className={classes.fieldValue}>{searchedValue}</div>
                <span className={classes.rightActionWrapper} onClick={() => {}}>
                    <SearchIcon />
                </span>
            </fieldset>
            {searchedValue && (
                <ChecklistSearchDetails
                    data={checklistSearchedData}
                />
            )}
            <ChecklistSearchList
                open={openSearch}
                value={checklistData}
                onItemClick={handleChecklistItemClick}
                onClose={e => handleCloseChecklistSearchList(e)}
            />
        </div>
    );
}
