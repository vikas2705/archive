import { Log, UserManager } from 'oidc-client';
import { AppSettings } from "../AppSettings";

const config = {
  authority: AppSettings.RIDS_AUTH_URL,
  client_id: AppSettings.RIDS_AUTH_CLIENTID,
  redirect_uri: AppSettings.BASE_APP_URL + "/" + AppSettings.BASE_APP_NAME + "/callback",
  response_type: "code",
  scope: AppSettings.RIDS_AUTH_SCOPE,
  post_logout_redirect_uri: AppSettings.BASE_APP_URL + "/" + AppSettings.BASE_APP_NAME
};

Log.logger = console;

const userManager = new UserManager(config)


export async function loadUserFromStorage(store) {
  try {
    let user = await userManager.getUser()
    console.log("User Name " + user);
    if (!user) { 
      return store.dispatch({type: "STORE_USER_ERROR"})
     }
    store.dispatch({type: "STORE_USER", payload: user})
  } catch (e) {
    console.error(`User not found: ${e}`)
    store.dispatch({type: "STORE_USER_ERROR"});
    }
}

export function signinRedirect(authState = {}) {
  let authstate={};

  if(authstate) {
    authstate = { "state" : authState }
  }
  console.log("SIGNIN_REDIRECT", authstate);
  return userManager.signinRedirect(authstate);
}

export function signinRedirectCallback() {
  return userManager.signinRedirectCallback()
}

export function signoutRedirect() {
  userManager.clearStaleState()
  userManager.removeUser()
  return userManager.signoutRedirect()
}

export function signoutRedirectCallback() {
  userManager.clearStaleState()
  userManager.removeUser()
  return userManager.signoutRedirectCallback()
}

export function isAuthenticated(){
  const oidcKey = `oidc.user:${AppSettings.RIDS_AUTH_URL}:${AppSettings.RIDS_AUTH_CLIENTID}`;
  const oidcValue = sessionStorage.getItem(
      `oidc.user:${AppSettings.RIDS_AUTH_URL}:${AppSettings.RIDS_AUTH_CLIENTID}`,
  );
  console.log('ID_AUTH', oidcKey);
  console.log('value', oidcValue);
  if (!oidcValue) {
      return false;
  }
  const oidcStorage = JSON.parse(
      sessionStorage.getItem(`oidc.user:${AppSettings.RIDS_AUTH_URL}:${AppSettings.RIDS_AUTH_CLIENTID}`) || '',
  );
  return !!oidcStorage && !!oidcStorage.access_token;
};
export default userManager