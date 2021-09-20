import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export function getWorkOrderMetadataParentListItem({ eqpOrLoc, eqpLocCode}) {

  const query = {
    '': {
      EAMWorkOrder_getMetaData_UpeDefault: {
        getListItems: {
          __args:{
            EqpOrLoc: eqpOrLoc,
            EqpLocCode: eqpLocCode || '',
          },
          data: {
            Parentinfo: {
              ParentWOCode: true,
              ParentWODesc: true,
            },
          }
        }
      }
    }
  }
  return jsonToGraphQLQuery(query, { pretty: true });
}

