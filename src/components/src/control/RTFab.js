import React from "react";
import { ExtButton } from "@sencha/ext-react-modern";
import "../../css/control/RTFab.css";

export function RTFab(props) {
    const {cls} = props;
    return (
        <ExtButton itemId="rtfabctrl" className={"rtfab-wrapper-designerCls " + (cls ? cls : "")} 
         { ...props} />
    );
};
