import React from "react";
import { ExtTextfield } from "@sencha/ext-react-modern";

import "../../../css/control/formField/RTField.css";

export function RTText(props) {
    const {className} =props;
    return (
        <ExtTextfield
        cls={"rtfieldbox " + (className ? className : "")}
        labelAlign="top"
        {...props} 
        />
    );
};
