import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export function getListofEqpWithLocDetails({currentLat, currentLong, eqpOrLoc}) {
    const query = {
      '': {
        workRequest_getListofEqpWithLocDetails:{
          getthelistofEquipmentswiththeirGeolocationdetails:{
            __args:{
              // currentLat,
              // currentLong,
              eqpOrLoc,
            },
            data: {
              defaultCenterInformation: {
                defaultLat: true,
                defaultLong: true,
              },
              defaultZoominformation: {
                defaultZoom: true,
              },
              markersInformation: {
                eqpLat: true,
                eqpLong: true,
                EqpOrLocationCode: true,
                EqpOrLocationDesc: true,
              },
              wayPointsInformation: {
                wayPointLong: true,
                wayPointLat: true,
              }
            },
            message: true,
          }
        }
      }
    }
    return jsonToGraphQLQuery(query, { pretty: true });
  }

