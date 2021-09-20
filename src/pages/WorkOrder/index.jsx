import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ManageWorkOrder from './Manage';


export default function WorkOrder(props){
  return (
    <>
    <Switch>
        <Route path="create" component={ManageWorkOrder} />
        <Route path="/" component={ManageWorkOrder} />
    </Switch>
    </>
  )
}