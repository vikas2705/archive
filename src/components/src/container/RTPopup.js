import React from "react";
import { ExtDialog } from "@sencha/ext-react-modern";

export function RTPopup(props) {
    const {cls} =props;

    return (
        <ExtDialog
        cls={"rtpopup-wrapper " + (cls ? cls : "")}
        {...props} 
        />
    );
};
