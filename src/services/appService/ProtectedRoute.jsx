import React, { useContext, useEffect } from 'react'
import { useDispatch } from "react-redux";
import {  Redirect } from 'react-router';

import App from "../../app/components/App";
import { AuthContext } from '../../utils/Providers/AuthProvider';
import { AppSettings } from '../../utils/appSettings';

function ProtectedRoute({ children, component: Component, ...rest }) {
  const authCtxt = useContext(AuthContext);
  // let isAuthenticated = authCtxt.isAuthenticated();
  const isAuthenticated = true;
  const globalDispatch = useDispatch();
  let location = rest?.location;
  useEffect(() => {
    let location = window.location.search;
    const urlParamArray = location.match(/ouId=([^&]*)&roleName=([^&]*)/) || "";
    if (urlParamArray[1] !== "" &&
      urlParamArray[2] != "" &&
      urlParamArray[1] !== undefined &&
      urlParamArray[2] !== undefined) {
      globalDispatch({ type: "userContext", payload: { ouId: urlParamArray[1] } });
      globalDispatch({ type: "pageContext", payload: { role: urlParamArray[2] } });
    }
  });
  if (!isAuthenticated) {
    const appBaseUrl = `${AppSettings.BASE_APP_URL}/${AppSettings.BASE_APP_NAME}`;
    const lastRoute = window.location.href.replace(appBaseUrl, '');
    sessionStorage.setItem('lastRoute', lastRoute);
  }

  return isAuthenticated
    ? (<App />)
    : (<Redirect to={{ pathname: '/signin', state: location || "" }} />)
}

export default ProtectedRoute;