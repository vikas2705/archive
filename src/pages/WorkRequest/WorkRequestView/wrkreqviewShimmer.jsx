import React from "react";

import ContentLoader from "react-content-loader";

export default function WrkReqViewShimmer() {
  return (
    <ContentLoader 
    speed={2}
    width={"100%"}
    height={"100%"}
    viewBox="0 0 300 615"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="397" y="149" rx="0" ry="0" width="4" height="23" /> 
    <rect x="13" y="93" rx="0" ry="0" width="393" height="129" /> 
    <rect x="10" y="171" rx="0" ry="0" width="8" height="0" /> 
    <rect x="16" y="236" rx="0" ry="0" width="409" height="132" /> 
    <rect x="18" y="385" rx="0" ry="0" width="408" height="121" /> 
    <circle cx="78" cy="53" r="2" /> 
    <rect x="13" y="43" rx="0" ry="0" width="394" height="40" />
  </ContentLoader>
  )
}



