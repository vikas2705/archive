import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import SearchInventory from './Search';
import ItemDetail from './Search/ItemDetail';

export default function InventoryInquiry() {
  const { path: basePath } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${basePath}/warehouse/itemDetail/:id`} component={ItemDetail} />
      <Route path={`${basePath}`} component={SearchInventory} />
    </Switch>
  )
}