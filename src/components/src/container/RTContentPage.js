import React, { Suspense } from "react";
import { Instagram } from 'react-content-loader';

export function RTContentPage(props) {
  const { Page } = props;
  
  return (
    <div
      style={{
        flexDirection: "column",
        flex: "1 1 0%",
      }}
    >
      <Suspense fallback={<Instagram />}>
        <Page {...props}/>
      </Suspense>
    </div>
  );
}

