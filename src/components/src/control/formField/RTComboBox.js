import React from "react";
import { ExtComboboxfield } from "@sencha/ext-react-modern";

import "../../../css/control/formField/RTField.css";

export function RTComboBox(props) {
    const {className} =props;
    return (
        <ExtComboboxfield
        cls={"rtfieldbox " + (className ? className : "")}
        picker="floated"
        labelAlign="top"
        {...props} 
        />
    );
};
