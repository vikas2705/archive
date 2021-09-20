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
export default function EqpLocationAndWorkGroup({ onSelect }) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [activeAlphabet, setActiveAlphabet] = useState("");

  const { workgroupinformation, } = useSelector(state => selectors.workflowItems(state))
  const equipmentLocations = useSelector(state => selectors.equipmentLocationsByCode(state, '', 'L'), shallowEqual);

  const [filter, setFilter] = useState({
    wrkGrpCode: '',
    eqpLocCode: '',
    parentEqpCode: '',
  });
  const [previousFilters, setPreviousFilters] = useState([]);
  const { wrkGrpCode, eqpLocCode, parentEqpCode } = filter;
  const { value: groupEqpAndLocItems = emptySet, status } = useSelector(state => selectors.groupEqpAndLoc(state, { wrkGrpCode, eqpLocCode, parentEqpCode }), shallowEqual)

  const arrLength = 26;
  const [elRefs, setElRefs] = React.useState([]);
  useEffect(() => {
    dispatch(actions.equipmentLocations.request({
      eqpOrLoc: 'L',
      eqpLocCode: '',
    }))
  }, [dispatch])

  useEffect(() => {
    if (wrkGrpCode && eqpLocCode) {
      dispatch(actions.equipmentLocations.groupEqpAndLoc.request({ wrkGrpCode, eqpLocCode, parentEqpCode }))
    }
  }, [dispatch, eqpLocCode, parentEqpCode, wrkGrpCode])

  useEffect(() => {
    // add or remove refs
    setElRefs(elRefs =>
      Array(arrLength)
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [arrLength]);

  const handleFilterChange = useCallback((id, value) => {
    setFilter({
      ...filter,
      parentEqpCode: '',
      [id]: value
    })
    setPreviousFilters([]);

  }, [filter])
  const getScrollableItem = alphabet => {
    const item = groupEqpAndLocItems.find(({ EQP_description = '' }) => {
      return EQP_description[0] === alphabet;
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
        wrkGrpCode,
        eqpLocCode,
        parentEqpCode
      },
      item: item,
    }]);
    setFilter({ ...filter, parentEqpCode: item.EQPcode });
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
    if (hasChild === '0') {
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
    const { EQP_description = '', EQPcode, hasChild } = item;

    let widthSize = 12;
    if (hasChild === '1') {
      widthSize = 10;
    }

    let ref = null;
    if (EQP_description[0] !== currentAlphabet) {
      const pos = EQP_description[0].charCodeAt() - 65;
      ref = elRefs[pos];
      currentAlphabet = EQP_description[0];
    }

    return (
      <div className={classes.itemCard} id={EQPcode} key={EQPcode} ref={ref}>
        <Grid container>
          <Grid item xs={widthSize}>
            <div className={classes.itemContainer} onClick={() => onSelect(item.EQPcode)}>
              <div className={classes.itemDataHeading}>
                {EQP_description}
              </div>
              <div className={classes.itemDataSubText}>{EQPcode}</div>
            </div>
          </Grid>
          {renderPlus(item)}
        </Grid>
      </div>
    );
  };

  const renderListItems = () => {
    return groupEqpAndLocItems.map(item => {
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

    const { item } = previousFilters[previousFilters.length - 1];
    const { EQPcode, EQP_description } = item || {};
    const mainWidth = previousFilters.length > 1 ? 9 : 10;
    const iconWidth = previousFilters.length > 1 ? 3 : 2;
    return (
      EQPcode && (
        <div className={classes.parentHeading}>
          <Grid container>
            <Grid item xs={mainWidth}>
              <div className={classes.itemContainer}>
                <div className={classes.itemDataHeading}>
                  {EQP_description}
                </div>
                <div className={classes.itemDataSubText}>
                  {EQPcode}
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
                ) : null}
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
          <Grid item xs={6}>
            <EAMSelect
              id="eqpLocCode"
              title='Location'
              value={eqpLocCode}
              onFieldChange={handleFilterChange}
              labelField="EqpLocDesc"
              valueField="EqpLocCode"
              // options={[{EqpLocDesc: "TEST", EqpLocCode: "assembly"}, ...equipmentLocations]}
              options={equipmentLocations}
              lessPaddingTop
            />
          </Grid>
          <Grid item xs={6}>
            <EAMSelect
              id="wrkGrpCode"
              title='Work Group'
              value={wrkGrpCode}
              onFieldChange={handleFilterChange}
              labelField="workgroupdesc"
              valueField="workgroupcode"
              // options={[{workgroupdesc: "TEST", workgroupcode: "maint"}, ...workgroupinformation]}
              options={workgroupinformation}
              lessPaddingTop />
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
