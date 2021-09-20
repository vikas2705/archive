import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Dashboard from './Dashboard';
// import wrkreqview from './WorkRequestView/wrkreqview';
// import wrkreqsummary from './WorkReqSummary/wrkreqsummary';
import ManageWorkRequest from './Manage';
import WorkRequestList from './List';
import ViewWorkRequestDetail from './Detail/View';

export default function WorkRequest() {
  const { path: basePath } = useRouteMatch();
  return (
    <Switch>
      <Route path={[
        `${basePath}/manage/copy/:id`,
        `${basePath}/manage/:id`,
        `${basePath}/dashboard/manage`,
        `${basePath}/dashboard/create`,
        `${basePath}/manage`,
        `${basePath}/create`,
      ]}
        component={ManageWorkRequest} />
      {/* <Route path={`${basePath}/dashboard/list`} component={wrkreqview} /> */}
      <Route path={[
        `${basePath}/dashboard/list/:groupBy/:status/view/:wrNo`,
        `${basePath}/dashboard/list/:groupBy/view/:wrNo`,
      ]}
        component={ViewWorkRequestDetail} />
      <Route path={[
        `${basePath}/dashboard/list/:groupBy/:status/view`,
        `${basePath}/dashboard/list/:groupBy/view`,
      ]} component={WorkRequestList} />
      {/* <Route path={`${basePath}/dashboard/list/details`} component={wrkreqsummary} /> */}
      {/* <Route path={`${basePath}/dashboard/list`} component={wrkreqview} /> */}
      <Route path={`${basePath}/dashboard`} component={Dashboard} />
      <Route path="/" render={() => (<Redirect to={`${basePath}/dashboard`} />)} />
    </Switch>
  )
}