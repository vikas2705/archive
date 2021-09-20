import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export function downloadFileV2({fileId,relativePath}) {
  const query = {
    '': {
      downloadFile:{
          __args:{
            fileId,
            relativePath,
          },
      }
    }
  }
  return jsonToGraphQLQuery(query, { pretty: true });

}



