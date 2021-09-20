import { AppSettings } from "../appSettings";

export const IDENTITY_CONFIG = {
  authority: AppSettings.RIDS_AUTH_URL,
  client_id: AppSettings.RIDS_AUTH_CLIENTID,
  redirect_uri: AppSettings.BASE_APP_URL + "/" + AppSettings.BASE_APP_NAME + "/callback",
  post_logout_redirect_uri: AppSettings.BASE_APP_URL + "/" + AppSettings.BASE_APP_NAME + "/" + "signedout",
  audience: AppSettings.BASE_APP_URL + "/" + AppSettings.BASE_APP_NAME,
  response_type: "code",
  automaticSilentRenew: true,
  loadUserInfo: false,
  accessTokenExpiringNotificationTime: AppSettings.APP_ACCESSTOKEN_NOTIFICATIONTIME ? AppSettings.APP_ACCESSTOKEN_NOTIFICATIONTIME : 60,
  scope: AppSettings.RIDS_AUTH_SCOPE
};

export const METADATA_OIDC = {
  issuer: AppSettings.RIDS_AUTH_URL, //In case diff endpoint needed, have to add an additional entry in env,
  jwks_uri:
    AppSettings.RIDS_AUTH_URL + "/.well-known/openid-configuration/jwks",
  authorization_endpoint: AppSettings.RIDS_AUTH_URL + "/connect/authorize",
  token_endpoint: AppSettings.RIDS_AUTH_URL + "/connect/token",
  userinfo_endpoint: AppSettings.RIDS_AUTH_URL + "/connect/userinfo",
  end_session_endpoint: AppSettings.RIDS_AUTH_URL + "/connect/endsession",
  check_session_iframe:
    AppSettings.RIDS_AUTH_URL + "/connect/checksession",
  revocation_endpoint: AppSettings.RIDS_AUTH_URL + "/connect/revocation",
  introspection_endpoint: AppSettings.RIDS_AUTH_URL + "/connect/introspect"
};
