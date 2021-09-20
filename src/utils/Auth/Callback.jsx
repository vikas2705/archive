import React from 'react';
import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../Providers/AuthProvider';
import { useDispatch } from "react-redux";
import actions from "../../actions";

const Callback = () => {
  const history = useHistory()
  const authCtxt = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    async function SigninCallbackAsync() {
      let user = await authCtxt.signinRedirectCallback();
      const { access_token } = user;

      dispatch(actions.context.getToken(access_token));

      //Working unicode text JWT parser function:
      var base64Url = access_token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      var usercontext = JSON.parse(jsonPayload);

      dispatch({ type: "userContext", payload: usercontext });

      localStorage.setItem('signIn', 'true');
      history.push('/');
    }

    SigninCallbackAsync();
  }, [history, authCtxt])

  return (
    <div className="rt-callback-container">
      <div className="rt-callback-loading">
        <p style={{ color: "#001845" }}>Please wait</p>
        <span><i></i><i></i></span>
      </div>
    </div>
  )
}

export default Callback;