import React from "react";
import { makeStyles } from "@material-ui/styles";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const useStyles = makeStyles({
    scannerWrapper: {
        display: "flex",
        justifyContent: "center",
        height: "70%",
        width: "85%",
        margin: "30px 0",
        background: `linear-gradient(to right, black 4px, transparent 4px) 0 0,
    linear-gradient(to right, black 4px, transparent 4px) 0 100%,
    linear-gradient(to left, black 4px, transparent 4px) 100% 0,
    linear-gradient(to left, black 4px, transparent 4px) 100% 100%,
    linear-gradient(to bottom, black 4px, transparent 4px) 0 0,
    linear-gradient(to bottom, black 4px, transparent 4px) 100% 0,
    linear-gradient(to top, black 4px, transparent 4px) 0 100%,
    linear-gradient(to top, black 4px, transparent 4px) 100% 100%`,

        backgroundRepeat: "no-repeat",
        backgroundSize: "50px 50px",
        padding: "10px",
        position: "relative",
    },
    horizontalLine: {
        height: "5px",
        background: "red",
        position: " absolute",
        bottom: "20px",
        width: "100%",
        animation: "MoveUpDown 2s linear infinite",
    },
});

function BarcodeScanner({onScanComplete}) {
    const className = useStyles();
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={className.scannerWrapper}>
                    <BarcodeScannerComponent
                        width={500}
                        height={500}
                        onUpdate={(err, result) => {
                            if (result) {
                                onScanComplete(result.text)
                            }
                        }}
                    ></BarcodeScannerComponent>
                    <div className={className.horizontalLine}></div>
                </div>
            </div>
        </>
    );
}

export default BarcodeScanner;
