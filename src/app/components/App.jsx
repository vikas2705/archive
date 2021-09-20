import React from "react";
import { Route, Switch } from 'react-router-dom';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import EAMMenuDrawer from "../../components/src/container/EAMMenuDrawer";
// import WorkOrder from "../../pages/WorkOrder";
// import WorkRequest from "../../pages/WorkRequest";
import BusyIndicator from "./BusyCursor";

import { shallowEqual, useSelector } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import { createClient } from "../../utils/gql-client";
import { AppSettings } from "../../utils/appSettings";

const WorkOrder = React.lazy(() => import('../../pages/WorkOrder'));
const WorkRequest = React.lazy(() => import('../../pages/WorkRequest'));
const Warehouse = React.lazy(() => import('../../pages/Warehouse'));
const ProjectTracking = React.lazy(() => import('../../pages/ProjectTracking'));
const ApproveAnywhere = React.lazy(() => import('../../pages/ApproveAnywhere'));
const ToDoList = React.lazy(() => import('../../pages/ToDoList'));

function App(props) {

  const token = useSelector(state => state.context.accessToken || AppSettings.TEST_TOKEN, shallowEqual);

  return (
    <ApolloProvider client={createClient(token)}>
      <div className="app-main">
        <BusyIndicator></BusyIndicator>
        <EAMMenuDrawer />
        {/* <AppContainer {...props}></AppContainer> */}
        <Switch>
          <Route path="/workOrder" component={WorkOrder} />
          <Route path="/workRequest" component={WorkRequest} />
          <Route path="/warehouse" component={Warehouse} />
          <Route path="/projectTracking" component={ProjectTracking} />
          <Route path="/approveAnywhere" component={ApproveAnywhere} />
          <Route path="/toDoList" component={ToDoList} />
          {/* <Route path="/approveAnywhere" component={ApproveAnywhere} /> */}
          <Route path="/" render={() => (<Redirect to="/workRequest" />)} />
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;
