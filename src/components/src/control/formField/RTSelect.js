import React from "react";
import { ExtSelectfield } from "@sencha/ext-react-modern";

import "../../../css/control/formField/RTField.css";

export function RTSelect(props) {
    const { className, isCombine, options, displayField, valueField } = props;
    if (isCombine && options && !options[0][displayField].includes("(")) {
        for (var i in options) {
            options[i][displayField] = options[i][displayField] + " (" + options[i][valueField] + ")";
        }
    }
    return (
        <ExtSelectfield
            cls={"rtfieldbox " + (className ? className : "")}
            picker="floated"
            labelAlign="top"
            {...props}
        />
    );
};
