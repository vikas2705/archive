import EAMSelect from "../EAMSelect";
import EAMText from "../EAMText";
import FormRow from "../Form/FormRow";
import FormWrapper from "../Form/FormWrapper";
import { useRef, useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { selectors } from "../../reducers";
import { AutoSizer, List } from "react-virtualized";
import Checkbox from "@material-ui/core/Checkbox";

const serialData = [
    {
        index: 1,
        id: "Warehouse",
        title: "Warehouse",
        active: true,
    },
    {
        index: 2,
        id: "ProductionOrder",
        title: "Production Order",
    },
    {
        index: 3,
        id: "ProductionWorkOrder",
        title: "Production work Order",
    },
];

const useStyles = makeStyles({
    header: {
        borderBottom: "1px solid #E9EBEF",
        boxSizing: "border-box",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
        padding: "10px 20px 0 20px",
    },
    marginTopBottom20: {
        marginTop: 20,
        marginBottom: 20,
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
        "& > div:first-child": {
            background: "#FFFFFF",
        },
    },
    searchResultData: {
        padding: "22px 15px",
        display: "flex",
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

export default function InventorySearchModal({
    onFieldChange = () => {},
    type,
    onSelect,
    value = "",
}) {
    const classes = useStyles();
    const equipmentLocationsByCode = [
        { id: "ITM00003", name: "CNC Large" },
        { id: "ITM00004", name: "CNC Medium" },
        { id: "ITM00005", name: "CNC Small" },
    ];
    const isItemSelected = false;

    const rowRenderer = useCallback(
        ({ key, index, style }) => {
            const item = equipmentLocationsByCode[index];
            return (
                <div
                    className={classes.searchResultData}
                    style={style}
                    key={key}
                    onClick={() => onSelect(item.id)}
                >
                    <div>
                        <Checkbox
                            className={classes.checkbox}
                            checked={!!isItemSelected}
                            // onChange={handleItemSelectToggle}
                            color='primary'
                            inputProps={{ "aria-label": "secondary checkbox" }}
                        />
                    </div>
                    <div>
                        <div className={classes.searchResultDataHeading}>
                            {item.name}
                        </div>
                        <div className={classes.searchResultDataSubText}>
                            {item.id}
                        </div>
                    </div>
                </div>
            );
        },
        [
            classes.searchResultData,
            classes.searchResultDataHeading,
            classes.searchResultDataSubText,
            equipmentLocationsByCode,
            onSelect,
        ]
    );

    return (
        <>
            <div className={classes.header}>
                <FormRow>
                    <EAMSelect
                        id='searchSerial'
                        title='Search for'
                        value={serialData[0].title}
                        onFieldChange={onFieldChange}
                        labelField='title'
                        valueField='id'
                        options={serialData}
                    />
                    <EAMText value={""} onFieldChange={onFieldChange} />
                </FormRow>

                <div className={classes.marginTopBottom20}>
                    <EAMText
                        value={2}
                        title='Enter Desc. or code'
                        onFieldChange={onFieldChange}
                    />
                </div>
            </div>

            <div className={classes.bodyContent}>
                <div className={classes.countText}>{`${
                    equipmentLocationsByCode.length
                } ${
                    type === "equipment" ? "Equipments" : "Locations"
                } found`}</div>
                {equipmentLocationsByCode.length ? (
                    <AutoSizer className={classes.searchResult}>
                        {({ width, height }) => (
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
