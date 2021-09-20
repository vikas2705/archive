import React from "react";
import { ExtTextareafield } from "@sencha/ext-react-modern";

import "../../../css/control/formField/RTField.css";

export function RTTextArea(props) {
    const {className} =props;
    return (
        <ExtTextareafield
        cls={"rtfieldbox " + (className ? className : "")}
        labelAlign="top"
        {...props} 
        />
    );
};
