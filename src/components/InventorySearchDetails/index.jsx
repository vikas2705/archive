import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from "../../assets/Icons/SearchIcon";
import ScannerIcon from "../../assets/Icons/ScannerIcon";
import MuteIcon from "../../assets/Icons/MuteIcon";
import UnMuteIcon from "../../assets/Icons/UnMuteIcon";
import classnames from "classnames";
import FullScreenDialog from "../FullScreenDialog";
import ScannerWrapper from "../ScannerWrapper";
import InventorySearchModal from "../InventorySearchModal";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import NameAndCodePreview from "./Preview";
import { useDispatch, useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import { selectors } from "../../reducers";
import actions from "../../actions";
import { useEffect } from "react";
import InfoIcon from "../../assets/Icons/InfoIcon";
import { Popover, Typography } from "@material-ui/core";
import SettingsGreyIcon from "../../assets/Icons/SettingsGreyIcon";
const useStyles = makeStyles({
    fieldWrapper: {
        width: "100%",
    },
    icon: {
        height: 16,
        width: 16,
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
    leftActionWrapper: {
        position: "absolute",
        left: 8,
        top: 10,
        "& > svg": {
            marginRight: 24,
        },
        "& > span": {
            marginRight: 24,
        },
    },

    machineWrapper: {
        display: "flex",
        paddingLeft: 3,
        paddingBottom: 18,
        "& > svg": {
            marginRight: 6,
        },
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
    fieldName: {
        fontSize: "12px",
        color: "#979DAC",
    },
    popover: {
        boxShadow: "none",
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
    inputText: {
        border: "none",
        height: "30px",
        width: "200px",

        "&:focus-visible": {
            outline: "none",
        },
    },
    machineText: {
        color: "#0073E6",
        fontWeight: "bold",
        fontSize: 14,
    },
    mic: {
        color: "#5C677D",
        float: "right",
    },
    textField: {
        "& * > .MuiInput-underline:before": {
            display: "none",
        },
        "& > div:first-child": {
            "& > input": {
                "&::before": {
                    display: "none",
                },
            },
        },
    },
});

export default function InventoryDetailsSearch(props) {
    const {
        id,
        type,
        isReadOnly,
        value,
        onFieldChange,
        label = "Enter details",
    } = props;
    const { transcript, resetTranscript } = useSpeechRecognition();

    const classes = useStyles();
    const dispatch = useDispatch();
    const [openSearch, setOpenSearch] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [previewEl, setPreviewEl] = React.useState(null);

    const triggerListening = () =>
        SpeechRecognition.startListening({ continuous: true });

    const [openScanner, setOpenScanner] = useState(false);
    const isAllOptionsLoaded = useSelector(state => {
        const equipmentLocationsByCode = selectors.equipmentLocationsByCode(
            state,
            "",
            type === "equipment" ? "E" : "L"
        );
        return equipmentLocationsByCode?.length;
    });

    const valueToDisplay = useSelector(state => {
        const equipmentLocationsByCode = selectors.equipmentLocationsByCode(
            state,
            "",
            type === "equipment" ? "E" : "L"
        );
        const obj = equipmentLocationsByCode.find(
            i => i.EqpLocCode.toLowerCase() === value && value.toLowerCase()
        );
        if (!obj?.EqpLocCode) {
            return "";
        }
        return `${obj.EqpLocDesc} (${obj.EqpLocCode})`;
    }, shallowEqual);

    const handleClickOpenSearch = dialogType => {
        setOpenSearch(true);
    };

    const handleSearchClose = () => {
        setOpenSearch(false);
    };

    const onStartListening = () => {
        resetTranscript();
        setIsListening(true);
        triggerListening();
    };
    const onStopListening = () => {
        setIsListening(false);
        SpeechRecognition.stopListening();
        if (onFieldChange) {
            onFieldChange(id, `${value} ${transcript}`);
        }
    };

    const handleClickOpenScanner = dialogType => {
        setOpenScanner(true);
    };

    const handleCloseScanner = () => {
        setOpenScanner(false);
    };

    const handleScanComplete = val => {
        handleCloseScanner();
        if (onFieldChange) {
            onFieldChange(id, val);
        }
    };

    console.log("previewEl", previewEl);
    const handleSearchSelect = useCallback(
        value => {
            if (onFieldChange) {
                onFieldChange(id, value);
            }
            handleSearchClose();
        },
        [id, onFieldChange]
    );
    const handleMapSelect = useCallback(
        ({ EqpLocCode }) => {
            if (onFieldChange) {
                onFieldChange(id, EqpLocCode);
            }
            onStopListening();
        },
        [id, onFieldChange]
    );

    useEffect(() => {
        if (value && !isAllOptionsLoaded) {
            dispatch(
                actions.equipmentLocations.request({
                    eqpOrLoc: type === "equipment" ? "E" : "L",
                    eqpLocCode: value,
                })
            );
        }
    }, [dispatch, isAllOptionsLoaded, type, value]);

    return (
        <div>
            {isReadOnly ? (
                <div
                    className={classes.machineWrapper}
                    onClick={event => {
                        setPreviewEl(event.currentTarget);
                    }}
                >
                    <SettingsGreyIcon />
                    <Typography className={classes.machineText} variant='body1'>
                        {valueToDisplay}
                    </Typography>
                </div>
            ) : (
                <fieldset className={classnames(classes.fieldsetContainer)}>
                    <legend>{label}</legend>
                    <div className={classes.fieldValue}>{valueToDisplay}</div>
                    {valueToDisplay ? (
                        <span className={classes.leftActionWrapper}>
                            <span
                                onClick={event => {
                                    setPreviewEl(event.currentTarget);
                                }}
                            >
                                <InfoIcon className={classes.icon} />
                            </span>
                        </span>
                    ) : null}
                    <span className={classes.rightActionWrapper}>
                        <span onClick={handleClickOpenSearch}>
                            <SearchIcon />
                        </span>
                        {isListening ? (
                            <span
                                className={classes.mic}
                                onClick={onStopListening}
                            >
                                <UnMuteIcon height='16' width='19' />
                            </span>
                        ) : (
                            <span
                                className={classes.mic}
                                onClick={onStartListening}
                            >
                                <MuteIcon height='15' width='15' />
                            </span>
                        )}
                        <span onClick={handleClickOpenScanner}>
                            <ScannerIcon />
                        </span>
                    </span>
                    {/* </FieldSet> */}
                </fieldset>
            )}

            <FullScreenDialog
                modalTitle='Search Item'
                open={openSearch}
                modalContent={
                    <InventorySearchModal
                        onSelect={handleSearchSelect}
                        value={value}
                        type={type}
                    />
                }
                onClose={handleSearchClose}
            />
            <FullScreenDialog
                modalTitle='Scan Code'
                open={openScanner}
                modalContent={
                    <ScannerWrapper onScanComplete={handleScanComplete} />
                }
                onClose={handleCloseScanner}
            />
            <Popover
                id={id}
                open={!!previewEl}
                anchorEl={previewEl}
                classes={{
                    paper: classes.popover,
                }}
                onClose={() => {
                    setPreviewEl(null);
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <NameAndCodePreview type={type} value={value} />
            </Popover>
        </div>
    );
}
