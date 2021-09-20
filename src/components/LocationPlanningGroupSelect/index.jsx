import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect, createRef } from "react";
import EAMSelect from "../EAMSelect";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import actions from "../../actions";
import { selectors } from "../../reducers";
import { useCallback } from "react";
import { deepClone } from "fast-json-patch";

const useStyles = makeStyles({
    bodyContent: {
        background: "#F7F9FB",
        height: "100vh",
    },

    searchResult: {
        background: "#FFFFFF",
        margin: "0px 12px",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
    },

    fieldsetWrapper: {
        padding: "0px 12px 3px 12px",
        "& .x-button.x-has-text .x-inner-el": {
            padding: "3px 12px",
        },
        "& .x-button.x-has-text .x-text-el": {
            color: "#ffffff",
            textTransform: "capitalize",
        },
        "& .MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-1": {
            height: "100%",
            overflowY: "hidden",
        },
        "& .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-11": {
            overflow: "scroll",
            height: "70vh",
        },
    },
    noLeftPadding: {
        paddingLeft: "0px",
    },
    alphabetContainer: {
        paddingTop: 10,
        textAlign: "center",
    },
    clickableAlphabets: {
        color: "#0073E6",
        fontSize: 13,
        lineHeight: "18px",
        cursor: "pointer",
    },
    itemCard: {
        background: "#FFFFFF",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
        borderRadius: "4px",
        margin: "10px 0",
    },
    itemDataHeading: {
        color: "#33415C",
        fontWeight: "bold",
        fontSize: 15,
        lineHeight: "22px",
    },
    itemDataSubText: {
        color: "#33415C",
        fontSize: 15,
        lineHeight: "22px",
    },
    expandListItem: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        fontSize: 24,
        color: "#0073E6",
        width: "100%",
        height: "100%",
        borderLeft: "1px solid #0073E6",
        cursor: "pointer",
    },
    noBorder: {
        borderLeft: "none",
    },
    itemContainer: {
        padding: "12px 23px",
    },
    activeAlphabet: {
        color: "#979DAC",
    },
    parentHeading: {
        background: "#EDF6FF",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
        borderRadius: "4px",
        padding: "1px 4px",
    },
    parentIcons: {
        display: "flex",
        height: "100%",
    },
});

const emptySet = [];
export default function LocationPlanningGroupSelect({onSelect}) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [activeAlphabet, setActiveAlphabet] = useState("");
    
    const {Plangroupinformation} =  useSelector(state => selectors.workflowItems(state))
    const [filter, setFilter] = useState({
        planningGrpCode: '',
        parentCode: ''

    });
    const { planningGrpCode, parentCode } = filter;

    const [previousFilters, setPreviousFilters] = useState([]);
    const {value: planningGroups = emptySet} = useSelector(state => selectors.locationPlanningGroup(state, { planningGrpCode, parentCode }), shallowEqual)

    const arrLength = 26;
    const [elRefs, setElRefs] = React.useState([]);
    useEffect(()=>{
        if(planningGrpCode){
            dispatch(actions.equipmentLocations.planningGroup.request({planningGrpCode, parentCode}))
        }
    },[dispatch, parentCode, planningGrpCode])

    useEffect(() => {
        // add or remove refs
        setElRefs(elRefs =>
            Array(arrLength)
                .fill()
                .map((_, i) => elRefs[i] || createRef())
        );
    }, [arrLength]);

    const handleFilterChange = useCallback((id, value)=>{
        setFilter({
            ...filter,
            parentCode: '',
            [id]: value
        })
        setPreviousFilters([]);
        
    },[filter])
    const getScrollableItem = alphabet => {
        const item = planningGroups.find(({Description = ''}) => {
            return Description[0] === alphabet;
        });

        if (!item) {
            return null;
        }

        const { EQPcode } = item;
        return EQPcode;
    };

    const scrollToItem = alphabet => {
        const id = getScrollableItem(alphabet);
        const pos = alphabet.charCodeAt() - 65;

        if (id) {
            elRefs[pos].current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const onAlphabetClick = val => {
        setActiveAlphabet(val);
        scrollToItem(val);
    };

    const onItemLevelExpandClick = item => {
        setPreviousFilters([...previousFilters, {
            filter: {
                planningGrpCode, 
                parentCode
            },
            item: item,
        }]);
        setFilter({...filter, 
            parentCode: item.Location_Code
        });
    };

    const onItemLevelMinusClick = () => {
        const previousFiltersTmp = deepClone(previousFilters);
        const lastActiveFilter = previousFiltersTmp.pop();
        setPreviousFilters(previousFiltersTmp);
        setFilter(lastActiveFilter.filter);
    };

    const onItemCompressAllClick = () => {
        setFilter(previousFilters[0].filter);
        setPreviousFilters([])
    };

    const renderPlus = item => {
        const { hasChild } = item;
        if(hasChild === '0'){
            return null;
        }
        return (
            <Grid item xs={2}>
                <div
                    className={classes.expandListItem}
                    onClick={() => onItemLevelExpandClick(item)}
                >
                    <i class='fas fa-plus-circle'></i>
                </div>
            </Grid>
        );
    };

    let currentAlphabet = "";

    const renderListItem = item => {
        const { Description='', Location_Code, hasChild } = item;

        let widthSize = 12;
        if (hasChild === '1') {
            widthSize = 10;
        }

        let ref = null;
        if (Description[0] !== currentAlphabet) {
            const pos = Description[0].charCodeAt() - 65;
            ref = elRefs[pos];
            currentAlphabet = Description[0];
        }

        return (
            <div className={classes.itemCard} id={Location_Code} key={Location_Code} ref={ref}>
                <Grid container>
                    <Grid item xs={widthSize}>
                        <div className={classes.itemContainer} onClick={() => onSelect(Location_Code)}>
                            <div className={classes.itemDataHeading}>
                                {Description}
                            </div>
                            <div className={classes.itemDataSubText}>{Location_Code}</div>
                        </div>
                    </Grid>
                    {renderPlus(item)}
                </Grid>
            </div>
        );
    };

    const renderListItems = () => {
        return planningGroups.map(item => {
            return renderListItem(item);
        });
    };

    const renderAlphabets = () => {
        let result = [];
        for (let i = 65; i < 91; i++) {
            const val = String.fromCharCode(i);

            result.push(
                <div
                    className={classnames(classes.clickableAlphabets, {
                        [classes.activeAlphabet]: activeAlphabet === val,
                    })}
                    onClick={() => {
                        onAlphabetClick(val);
                    }}
                    value={val}
                >
                    {val}
                </div>
            );
        }
        return result;
    };

    const renderSelectedParent = () => {
        if (!previousFilters.length) {
            return null;
        }

        const { item } = previousFilters[previousFilters.length -1];
        const {Description, Location_Code} = item || {};
        const mainWidth = previousFilters.length > 1 ? 9 : 10;
        const iconWidth = previousFilters.length > 1 ? 3 : 2;
        return (
            Location_Code && (
                <div className={classes.parentHeading}>
                    <Grid container>
                        <Grid item xs={mainWidth}>
                            <div className={classes.itemContainer}>
                                <div className={classes.itemDataHeading}>
                                    {Description}
                                </div>
                                <div className={classes.itemDataSubText}>
                                    {Location_Code}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={iconWidth}>
                            <div className={classes.parentIcons}>
                                {previousFilters.length > 1 ? (
                                    <div
                                        className={classnames(
                                            classes.expandListItem,
                                            classes.noBorder
                                        )}
                                        onClick={onItemCompressAllClick}
                                    >
                                        <i class='fas fa-angle-double-left'></i>
                                    </div>
                                ): null}
                                <div
                                    className={classnames(
                                        classes.expandListItem,
                                        classes.noBorder
                                    )}
                                    onClick={onItemLevelMinusClick}
                                >
                                    <i class='fas fa-minus-circle'></i>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )
        );
    };

    return (
        <>
            <div
                className={classnames(
                    classes.fieldsetWrapper,
                    classes.noLeftPadding
                )}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <EAMSelect
                        id="planningGrpCode"
                        title='Planning Group'
                        value={planningGrpCode}
                        onFieldChange={handleFilterChange}
                        labelField="PlangroupDesc"
                        valueField="PlangroupCode"
                        options={Plangroupinformation}
                        lessPaddingTop
                        />
                    </Grid>
                </Grid>
            </div>

            {renderSelectedParent()}

            <div className={classes.bodyContent}>
                <div
                    className={classnames(
                        classes.fieldsetWrapper,
                        classes.noLeftPadding
                    )}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={11}>
                            {renderListItems()}
                        </Grid>
                        <Grid item xs={1}>
                            <div className={classes.alphabetContainer}>
                                {renderAlphabets()}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
}
