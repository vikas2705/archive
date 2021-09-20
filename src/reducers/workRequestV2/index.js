import count, { selectors as fromCount } from './Count';
import list, { selectors as fromList } from './List';
import timeline, { selectors as fromTimeline } from './Timeline';
import resources, { selectors as fromResources } from './Resources';
import dashboard, { selectors as fromDashboard } from './Dashboard';
import { combineReducers } from "redux";
import { genSelectors } from '../util';

const combinedReducers = combineReducers({
  count,
  list,
  timeline,
  resources,
  dashboard
})

export default combinedReducers;
export const selectors = {};
const subSelectors = {
  count: fromCount,
  list: fromList,
  timeline: fromTimeline,
  resources: fromResources,
  dashboard: fromDashboard
}
genSelectors(selectors, subSelectors);