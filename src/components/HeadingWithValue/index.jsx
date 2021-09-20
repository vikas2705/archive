import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import React from "react";

const useStyles = makeStyles({
    fieldName: {
        fontSize: "12px",
        color: "#979DAC",
    },
    fieldValue: {
        fontSize: "13px",
    },

    lineHeightCustom: {
        lineHeight: "18px",
    },
});
export default function HeadingWithValue(props) {
    const classes = useStyles();
    const { title = "", value = "" } = props;
    return (
        <div className={classes.lineHeightCustom}>
            <div className={classes.fieldName}>{title}</div>
            <div className={classes.fieldValue}>{value}</div>
        </div>
    );
}
