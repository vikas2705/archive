import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Providers/AuthProvider';

const Signin = (props) => {
  console.log("SIGNIN", props)
  let launchui = props.location.state;
  const authCtxt = useContext(AuthContext);
  useEffect(() => {
    console.log("SIGNIN LAUNCHUI", launchui);
    authCtxt.signinRedirect(launchui);
  }, [launchui, authCtxt])

  return (
    <div className="rt-callback-loading">
    <p style={{color: "#001845"}}>Redirecting...</p>
    <span><i></i><i></i></span>
  </div>
  );
}

export default Signin
