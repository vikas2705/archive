const AppConfig = window.APP_CONFIG;
console.log(AppConfig);
if (!AppConfig) {
    console.error("[Index] *** Error loading Config File ***");
}

export const AppSettings = {
    VERSION: AppConfig.VERSION,
    API_URL: AppConfig.API_URL,
    BASE_APP_URL: AppConfig.BASE_APP_URL,
    BASE_APP_NAME: AppConfig.BASE_APP_NAME,
    MOCK_API_URL: AppConfig.MOCK_API_URL,
    APP_API_URL: AppConfig.APP_API_URL,
    RIDS_AUTH_URL: AppConfig.RIDS_AUTH_URL,
    RIDS_AUTH_SCOPE: AppConfig.RIDS_AUTH_SCOPE,
    RIDS_AUTH_CLIENTID: AppConfig.RIDS_AUTH_CLIENTID,
    SKIP_PREFLIGHT_CHECK: AppConfig.SKIP_PREFLIGHT_CHECK,
    APP_BACKEND_MODE: AppConfig.APP_BACKEND_MODE,
    APP_API_TIMEOUT_SECS: AppConfig.APP_API_TIMEOUT_SECS,
    APP_ACCESSTOKEN_NOTIFICATIONTIME: AppConfig.APP_ACCESSTOKEN_NOTIFICATIONTIME,
    GOOGLE_MAP_KEY: AppConfig.GOOGLE_MAP_KEY,
    TEST_TOKEN: AppConfig.TEST_TOKEN
};