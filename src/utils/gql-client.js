import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { AppSettings } from "./appSettings";
import { ApolloLink } from "apollo-link";

export const createClient = (token) => {

  const cache = new InMemoryCache();

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message }) => {
        window.showAlert && window.showAlert({ type: "Error", msg: message });
        return message;
      });
    if (networkError) {
    }
  });
  
  const httpLink = errorLink.concat(
    createHttpLink({
      uri: AppSettings.API_URL,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      }
    })
  );

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({headers}) => ({ headers: {
      Authorization: token ? `Bearer ${token}` : "",
      g_ctxt_cmp: (headers && headers.g_ctxt_cmp) || "workRequest",
      g_ctxt_lang: 1,
      g_ctxt_ou: 2,
      g_ctxt_role: "testrole",
      ...headers
    }}));
    return forward(operation);
   }).concat(httpLink);

  return new ApolloClient({
    link:authLink,
    cache:cache
  });
};
