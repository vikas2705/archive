import { makeStyles } from "@material-ui/styles";
import React from "react";
import Camera, {FACING_MODES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const useStyles = makeStyles({
    centerAlign: {
        textAlign: "center",
        paddingBottom: 50,
        "& video": {
            height: "265px !important",
            width: "100%",
        },
    },
    header: {
        fontSize: 20,
        color: "#979DAC",
        background: "#FFFFFF",
        border: "1px solid #E9EBEF",
        boxSizing: "border-box",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: 4,
        padding: 40,
    },
    footer: {
        fontSize: 14,
        color: "#979DAC",
    },
    cameraWrapper: {
        display: "flex",
        justifyContent: "center",
        height: "100%",
        width: "100%",
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
});
export default function CapturePhoto({onPhotoClick}){
    const classes = useStyles();
    const handlePhotoUpload = (dataUri) => {
        onPhotoClick(dataUri);
    }
    return (
        <div className={classes.centerAlign}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={classes.cameraWrapper}>
                    <Camera
                        onTakePhoto = {(dataUri) => { handlePhotoUpload(dataUri); } }
                        idealResolution = {{width: 640, height: 480}}
                        imageCompression = {0.5}
                        isFullscreen = {true}
                        idealFacingMode = {FACING_MODES.ENVIRONMENT}
                    />
                </div>
            </div>

            <div className={classes.footer}>Hold the device still</div>
        </div>
    )
}