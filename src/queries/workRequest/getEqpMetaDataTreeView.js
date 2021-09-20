import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export function getEqpMetaDataTreeView({EqpLocCode = '', wrkGrpCode='', ParentEqpCode=''}) {
    const query = {
      '': {
        workRequest_getEqpMetaData:{
            getEqpMetaData:{
            __args:{
                EqpLocCode,
                wrkGrpCode,
                ParentEqpCode,
            },
          }
        }
      }
    }
    return jsonToGraphQLQuery(query, { pretty: true });

  }

