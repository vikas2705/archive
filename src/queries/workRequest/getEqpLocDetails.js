import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export function getEqpLocDetails({EqporLoc='', EqpLocCode='', EqpLocDesc=''}) {
    const query = {
      '': {
        location_getEqpLocDet:{
          getEquipmentLocationDetails:{
            __args:{
              EqporLoc,
              EqpLocCode,
              // EqpLocDesc,
              Actionflag: "ListEdit"
            },
            data: {
              ParentCode: true,
              ParentDesc: true,
              EqpLocCode: true,
              EqpLocDesc: true,
              eqpLocDefaultImage: true,
              WorkGroupTeamLeadContactNo: true,
              CriticalityCode: true,
              CriticalityDesc: true,
              FailureGroupCode: true,
              FailureGroupDesc: true,
              locationDesc: true,
              locationcode: true,
            },
          }
        }
      }
    }
    return jsonToGraphQLQuery(query, { pretty: true });
  //   return `{
  //     location_getEqpLocDet {
  //         getEquipmentLocationDetails (EqporLoc: "E", EqpLocCode: "00006", Actionflag: "ListEdit") {
  //             data {
  //                 ParentCode
  //                 ParentDesc
  //                 EqpLocCode
  //                 EqpLocDesc
  //                 eqpLocDefaultImage
  //                 WorkGroupTeamLeadContactNo
  //             }
  //         }
  //     }
  // }`

  }

