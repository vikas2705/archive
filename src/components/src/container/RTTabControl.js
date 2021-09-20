import React, { useState } from "react";
import { ExtDataview, ExtContainer } from '@sencha/ext-react-modern';
import '../../css/container/RTTabControl.css';

export function RTTabControl(props) {
  const { isDataview, store, tpl, cls, dataviewCls, onDataviewSelect  } = props;

  return (
    <>
      {isDataview &&
      <ExtContainer>
        <ExtContainer cls={"rttab_dataview_container " + (cls ? cls : "")}>
          <ExtDataview
            cls={"rttab_dataview " + (dataviewCls ? dataviewCls : "")}
            layout="hbox"
            itemTpl={tpl}
            store={store}
            onSelect={onDataviewSelect}
            {...props}
          >
          </ExtDataview>
        </ExtContainer>
        </ExtContainer>
      }
    </>
  );
}

