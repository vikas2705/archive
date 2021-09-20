import React from "react";
import { Route, Switch } from "react-router-dom";
import ProjectDetails from "./ProjectDetails";
import TaskDetails from "./TaskDetails";
import MoreDetails from "./MoreDetails";
import ProjectTrackingList from "./List";
import { useRouteMatch } from "react-router-dom";
import OrderDetails from "./OrderDetails";
export default function ProjectTracking(props) {
  const { path: basePath } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route
          path={`${basePath}/summary/order/tasks`}
          component={TaskDetails}
        />
        <Route path={`${basePath}/summary/detail`} component={MoreDetails} />
        <Route path={`${basePath}/summary/tasks`} component={TaskDetails} />
        <Route path={`${basePath}/summary/order`} component={OrderDetails} />
        <Route path={`${basePath}/summary`} component={ProjectDetails} />

        <Route path="/" component={ProjectTrackingList} />
      </Switch>
    </>
  );
}
