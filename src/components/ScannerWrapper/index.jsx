import { makeStyles } from "@material-ui/styles";
import React from "react";
import BarcodeScanner from "../BarcodeScannerComponent";

const useStyles = makeStyles({
    centerAlign: {
        textAlign: "center",
        overflow: "hidden",
        "& video": {
            height: "265px",
            width: "100%",
        },
    },
    scanCodeHeader: {
        fontSize: 20,
        color: "#979DAC",
        background: "#FFFFFF",
        border: "1px solid #E9EBEF",
        boxSizing: "border-box",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: 4,
        padding: 40,
    },
    scanCodeFooter: {
        fontSize: 14,
        color: "#979DAC",
        border: "1px solid #E9EBEF",
        boxSizing: "border-box",
        boxShadow: "0px 0 10px rgb(0 0 0 / 10%)",
        height: "200px",
        padding: 30,
    },
});

export default function ScannerWrapper(props) {
    const classes = useStyles();

    return (
        <div className={classes.centerAlign}>
            <div className={classes.scanCodeHeader}>
                <div></div>Align the Code
                <div>Along the red line</div>
            </div>
            <BarcodeScanner 
                {...props}
            />
            <div className={classes.scanCodeFooter}>
                <div>Hold the device still</div>
                <div>The scanning will be automatic</div>
            </div>
        </div>
    );
}
