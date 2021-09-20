import { GraphQLClient } from "graphql-request";
import { AppSettings } from "./appSettings";

const state =window.store.getState(),
 API_URL = AppSettings.API_URL,
 token =state.workrequest.accessToken || AppSettings.TEST_TOKEN;
//const API_URL=`http://172.27.6.29/gqlmicrosvc/workrequest`;


export const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${token}`,
    g_ctxt_cmp: "workRequest",
    g_ctxt_lang: 1,
    g_ctxt_ou: 2,
    g_ctxt_role: "testrole"
  }
});