import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import InventoryInquiry from './InventoryInquiry';

export default function Warehouse() {
  const { path: basePath } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${basePath}/inventoryInquiry`} component={InventoryInquiry} />
      <Route path="/" render={() => (<Redirect to={`${basePath}/inventoryInquiry`} />)} />
    </Switch>
  )
}