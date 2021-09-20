import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export function getWorkRequestListActions({ documentNo="", status="" }) {
  const query = {
    '': {
      workRequest_getlistOfAllowedActions: {
        listOfAllowedActions: {
          __args: {
            ComponentCode: "APIEAMWrkReq",
            DocumentType: "EAMWrkReq",
            DocumentNo: documentNo,
            DocumentStatus: status,
          },
          data: {
            AllowedActionCode: true,
            AllowedActionDesc: true,
          },
          message: true,
        }
      }
    }
  }
  return jsonToGraphQLQuery(query, { pretty: true });
}
