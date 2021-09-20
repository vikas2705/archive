import React,{lazy} from "react";
import  { RTContentPage } from "../../components/src/components";

function AppContainer(props) {
  const {route} = props;
  const defaultRoute= {
    path: "/",
    url: lazy(() => import("../../pages/Default/defaultpage")),
    uiName: "Default"
  };
 
  return (
    <div className="app-container">
          <RTContentPage
            Page={route ? route.url : defaultRoute.url}
            {...props}
          />
    </div>
  );
}

export default AppContainer;
