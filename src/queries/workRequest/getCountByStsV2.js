import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export function getCountByStatusV2(obj) {
  const {
    Actionflag = '',
    groupBy = '',
    Category = '',
    LocDesc = '',
    PlangroupCode = '',
    Priority = '',
    Type = '',
    WorkrequestNo = '',
    WorkrequestOn = '',
    equipmentCode = '',
    fromDate = '',
    locationCode = '',
    reportedBy = '',
    srchby = '',
    srchbyinpval = '',
    status = '',
    toDate = '',
    workGroup = '',
  } = obj
  const query = {
    '': {
      workRequest_getCountBySts: {
        gettheCountofWorkRequestsgroupedbyStatus: {
          __args: {
            Actionflag: Actionflag,
            groupBy: groupBy,
            Category: Category,
            LocDesc: LocDesc,
            PlangroupCode: PlangroupCode,
            Priority: Priority,
            Type: Type,
            WorkrequestNo: WorkrequestNo,
            WorkrequestOn: WorkrequestOn,
            equipmentCode: equipmentCode,
            fromDate: fromDate,
            locationCode: locationCode,
            reportedBy: reportedBy,
            srchby: srchby,
            srchbyinpval: srchbyinpval,
            status: status,
            toDate: toDate,
            workGroup: workGroup,
          },
          data: {
            AvgClosureUOM: true,
            AvgClosureTime: true,
            AvgResponseUOM: true,
            AvgResponseTime: true,
            workhubcmbdesc: true,
            workhubcmbcode: true,
            workrequestcount: {
              tabdata: true,
              tabvalue: true,
              tabSelection: true,
              hdn_card_code: true,
              circlecolor: true,
              labelSelection: true,
            },
            workfiltercmbcode: true,
            workfiltercmbdesc: true,
          }
        }
      }
    }
  }
  return jsonToGraphQLQuery(query, { pretty: true });
}

// export const GETCOUNTBYSTS = gql`
// query Query($Actionflag: String,
//   $groupBy:String,
//   $status:String,
//   $Category: String,
//   $LocDesc: String,
//   $PlangroupCode: String,
//   $Priority: String,
//   $Type: String,
//   $WorkrequestNo: String,
//   $WorkrequestOn: String,
//   $equipmentCode: String,
//   $fromDate: String,
//   $locationCode: String,
//   $reportedBy: String,
//   $srchby: String,
//   $srchbyinpval: String,
//   $toDate: String,
//   $workGroup: String
//   ){
//   workRequest_getCountBySts {
//       gettheCountofWorkRequestsgroupedbyStatus(Actionflag: $Actionflag
//       groupBy: $groupBy
//       Category: $Category
//       LocDesc: $LocDesc
//       PlangroupCode: $PlangroupCode
//       Priority: $Priority
//       Type: $Type
//       WorkrequestNo: $WorkrequestNo
//       WorkrequestOn: $WorkrequestOn
//       equipmentCode: $equipmentCode
//       fromDate: $fromDate
//       locationCode: $locationCode
//       reportedBy: $reportedBy
//       srchby: $srchby
//       srchbyinpval: $srchbyinpval
//       status: $status
//       toDate: $toDate
//       workGroup: $workGroup        
//       ) {
//       data {
//           AvgClosureUOM
//           AvgClosureTime
//           AvgResponseUOM
//           AvgResponseTime
//           workhubcmbdesc
//           workhubcmbcode
//           workrequestcount {
//           tabdata
//           tabvalue
//           tabSelection
//           hdn_card_code
//           circlecolor
//           labelSelection
//           }
//           workfiltercmbcode
//           workfiltercmbdesc
//       }
//       }
//   }
// }
// `;
