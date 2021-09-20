import { makeStyles } from "@material-ui/styles";
import { useState, useCallback } from "react";
import EAMText from "../EAMText";
import { useEffect } from "react";
import actions from "../../actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectors } from "../../reducers";
import {AutoSizer, List} from 'react-virtualized';


const useStyles = makeStyles({
    headingText: {
        padding: "15px 0",
        border: "1px solid #E9EBEF",
        boxSizing: "border-box",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    },
    bodyContent: {
        background: "#F7F9FB",
        paddingLeft: 10,
        paddingRight: 10,
        // width: 'calc(100% - 20px)',
        height: "100%",
    },
    countText: {
        color: "#7D8597",
        fontSize: 13,
        fontWeight: 600,
        lineHeight: "19px",
        padding: "35px 23px 18px 15px",
    },
    searchResult: {
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
        '& > div:first-child':{
            background: "#FFFFFF",
        }
    },
    searchResultData: {
        padding: "22px 15px",
        borderBottom: "1px solid #E9EBEF",
    },
    searchResultDataHeading: {
        color: "#33415C",
        fontWeight: "bold",
        fontSize: 15,
        lineHeight: "22px",
    },
    searchResultDataSubText: {
        color: "#33415C",
        fontSize: 15,
        lineHeight: "22px",
    },
});
export default function SearchEquipmentBody({type, onSelect, value = ''}) {
    const classes = useStyles();
    const [name, setName] = useState(value);
    const equipmentLocationsByCode = useSelector(state => selectors.equipmentLocationsByCode(state, name, type === 'equipment' ? 'E' : 'L'), shallowEqual);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actions.equipmentLocations.request({
            eqpOrLoc: type === 'equipment' ? 'E' : 'L',
            eqpLocCode: name,
        }))
    }, [dispatch, name, type])

    const rowRenderer = useCallback(({ key, index, style}) => {
        const item = equipmentLocationsByCode[index];
        return (
            <div 
                className={classes.searchResultData}
                style={style}
                // key={`${item.EqpLocCode}-${index}`}
                key={key}
                onClick={() => onSelect(item.EqpLocCode)}
            >
                <div className={classes.searchResultDataHeading}>
                    {item.EqpLocDesc}
                </div>
                <div className={classes.searchResultDataSubText}>
                {item.EqpLocCode}
                </div>
            </div>
        );
      }, [classes.searchResultData, classes.searchResultDataHeading, classes.searchResultDataSubText, equipmentLocationsByCode, onSelect])
    return (
        <>
            <div className={classes.headingText}>
                <EAMText 
                title='Enter Name or Code' 
                value={name}
                onFieldChange={(_, value)=>{setName(value)}}
                />
            </div>

            <div className={classes.bodyContent}>
                <div className={classes.countText}>{`${equipmentLocationsByCode.length} ${type === 'equipment' ? 'Equipments' :'Locations'} found`}</div>
                {equipmentLocationsByCode.length ? (
                    <AutoSizer className={classes.searchResult}>
                    {({width, height}) => (
                        <List
                        width={width}
                        height={height}
                        rowCount={equipmentLocationsByCode.length}
                        rowHeight={80}
                        rowRenderer={rowRenderer}
                        />
                    )}
                    </AutoSizer> 
                ) : null}
                               
            </div>
        </>
    );
}
