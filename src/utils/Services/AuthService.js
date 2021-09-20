import { IDENTITY_CONFIG, METADATA_OIDC } from '../Const/AuthConst';
import { UserManager, WebStorageStateStore, Log } from 'oidc-client';
import { AppSettings } from "../appSettings";

export default class AuthService {
    UserManager;
    _user;
    constructor() {
        this.UserManager = new UserManager({
            ...IDENTITY_CONFIG,
            userStore: new WebStorageStateStore({ store: window.sessionStorage }),
            metadata: {
                ...METADATA_OIDC,
            },
        });
        this.UserManager.getUser().then((user) => {
            this._user = user;
        });

        // Logger
        Log.logger = console;
        Log.level = Log.DEBUG;

        this.UserManager.events.addUserLoaded((user) => {
            // Once the user is loaded assign the value to local user
            this._user = user;
            console.log(this._user);
        });
        this.UserManager.events.addUserSignedOut(() => {
            console.log('User Signed Out ');
            this.logout();
        });

        this.UserManager.events.addSilentRenewError((e) => {
            console.log('silent renew error', e.message);
        });

        this.UserManager.events.addAccessTokenExpiring((e) => {
            console.log('Token Expiring.... ');
            this.signinSilent();
        });

        this.UserManager.events.addAccessTokenExpired(() => {
            console.log('token expired');
            this.logout();
        });
    }

    signinRedirectCallback = () => {
        return this.UserManager.signinRedirectCallback();
    };

    getUser = async () => {
        const user = await this.UserManager.getUser();
        if (!user) {
            return await this.UserManager.signinRedirectCallback();
        }
        return user;
    };

    parseJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };

    signinRedirect = (authstate) => {
        if (authstate) {
            authstate = { state: authstate };
        }
        console.log('signinRedirect');
        console.log(authstate);
        this.UserManager.signinRedirect(authstate);
    };

    isAuthenticated = () => {
        return this._user != null && !this._user.expired;
    };

    signinSilent = () => {
        console.log('signinSilent...');
        //this.UserManager.signinSilent()
        this.UserManager.startSilentRenew()
        /*    .then((user: any) => {
                console.log('signed in', user);
            })
            .catch((err: any) => {
                console.log(err);
            });*/
    };

    signinSilentCallback = () => {
        console.log('signed in call back');
        this.UserManager.signinSilentCallback();
    };

    createSigninRequest = () => {
        console.log('!!!!!!!!!!!!!createSigninRequest');
        return this.UserManager.createSigninRequest();
    };

    logout = () => {
        //revocation endpoint call
        this.UserManager.revokeAccessToken();
        this.UserManager.signoutRedirect({
            id_token_hint: localStorage.getItem('id_token'),
        });
        this.UserManager.clearStaleState();
        this._user = null;
    };

    signoutRedirectCallback = () => {
        this.UserManager.signoutRedirectCallback().then((user) => {
            localStorage.clear();
            const appBaseUrl = `${AppSettings.BASE_APP_URL}/${AppSettings.BASE_APP_NAME}`;
            window.location.replace(appBaseUrl);
        });
        this.UserManager.clearStaleState();
    };
}
