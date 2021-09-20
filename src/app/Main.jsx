import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavigationProvider } from "./trackedContext";

import App from "./components/App";

import { AuthProvider } from '../utils/Providers/AuthProvider';
import Signin from '../utils/Auth/Signin';
import CallBack from '../utils/Auth/Callback';
import SignedOut from '../utils/Auth/SignedOut';
import ProtectedRoute from '../services/appService/ProtectedRoute';
import "../resources/css/Main.css";

const Main = () => {

  return (
    <AuthProvider>
        <NavigationProvider>
          <Router basename="pwa-app">
            <Suspense fallback={<div></div>}>
              <Switch>
                <Route exact path="/signin" render={(props) => <Signin {...props} />} />
                <Route exact path="/callback" render={(props) => <CallBack {...props} />} />
                <Route exact path="/signedout" render={(props) => <SignedOut {...props} />} />
                <ProtectedRoute path="/" render={(props) => <App {...props} />} />
              </Switch>
            </Suspense>
          </Router>
        </NavigationProvider>
    </AuthProvider>
  );
};

export default Main;
