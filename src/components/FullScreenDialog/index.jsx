import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "../../assets/Icons/CloseIcon";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: "relative",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    dialogHeader: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        padding: "0 7px",
    },
    borderHeader: {
        borderBottom: "1px solid #C9CDD6",
    },
    modalTitle: {
        fontSize: 16,
        color: "#33415C",
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    const classes = useStyles();
    const { onClose, open, modalContent, modalTitle, borderHeader } = props;

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <Toolbar>
                <div
                    className={classNames(classes.dialogHeader, {
                        [classes.borderHeader]: borderHeader,
                    })}
                    onClick={handleClose}
                >
                    <h4 className={classes.modalTitle}>{modalTitle}</h4>
                    <CloseIcon onClick={handleClose} />
                </div>
            </Toolbar>

            {modalContent}
        </Dialog>
    );
}
