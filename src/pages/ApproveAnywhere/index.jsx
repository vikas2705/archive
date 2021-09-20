import React from "react";
import { Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import Dashboard from "../ApproveAnywhere/Dashboard";
import Projects from "../ApproveAnywhere/Projects";
import ApproveAnywhereList from "./List/Wrapper";
import ApprovalHistory from "./ApprovalHistory";
import ApprovalTimeline from "./ApprovalTimeline";
import ApproveAnywhereListData from "./List/ListData";
import ApprovalCollaborate from "./ApprovalCollaborate";
import ApproveAnywhereChecklistSearch from "./ApproveAnywhereChecklistSearch";

export default function ApproveAnywhere(props) {
    const { path: basePath } = useRouteMatch();

    return (
        <>
            <Switch>
                {/* <Route path={`${basePath}/summary`} component={ProjectDetails} /> */}
                <Route path={`${basePath}/projects`} component={Projects} />
                <Route
                    exact
                    path={`${basePath}/list`}
                    component={ApproveAnywhereList}
                />
                <Route
                    path={`${basePath}/list/history`}
                    component={ApprovalHistory}
                />
                <Route
                    path={`${basePath}/list/collaborate`}
                    component={ApprovalCollaborate}
                />
                <Route
                    exact
                    path={`${basePath}/list/:listId`}
                    component={ApproveAnywhereListData}
                />
                <Route
                    path={`${basePath}/list/:listId/history`}
                    component={ApprovalHistory}
                />
                <Route
                    path={`${basePath}/list/:listId/timeline`}
                    component={ApprovalTimeline}
                />
                <Route
                    path={`${basePath}/list/:listId/collaborate`}
                    component={ApprovalCollaborate}
                />
                <Route
                    path={`${basePath}/list/checklist`}
                    component={ApproveAnywhereChecklistSearch}
                />
               <Route
                    path={`${basePath}/list/:listId/checklist`}
                    component={ApproveAnywhereChecklistSearch}
                />
                <Route path='/' component={Dashboard} />
            </Switch>
        </>
    );
}
