import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export function getPlanningMetaData({PlanningGrpCode, ParentCode}) {
    const query = {
      '': {
        workRequest_getPlanningMetaData:{
            getPlanningMetaData:{
            __args:{
                PlanningGrpCode,
                ParentCode,
            },
          }
        }
      }
    }
    return jsonToGraphQLQuery(query, { pretty: true });

  }

