import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export function getWorkRequestListCount(obj) {
  const {
    Actionflag= '',
    Category= '',
    HiddenControl1= '',
    HiddenControl2= '',
    LocDesc= '',
    PlangroupCode= '',
    PlangroupDesc= '',
    Priority= '',
    ReportedTimeCode= '',
    Type= '',
    WorkrequestNo= '',
    WorkrequestOn= '',
    eqpDesc= '',
    equipmentCode= '',
    fromDate= '',
    groupBy= '',
    locationCode= '',
    reportedBy= '',
    srchby= '',
    srchbyinpval= '',
    status= '',
    toDate= '',
    workGroup= '',
    workgroupDesc= '',
    workorderNo= '',
    wrDesc= '',
  } = obj
  const query = {
    '': {
      workRequest_getCountBySts: {
        gettheCountofWorkRequestsgroupedbyStatus: {
          __args: {
            Actionflag: Actionflag,
            Category: Category,
            HiddenControl1: HiddenControl1,
            HiddenControl2: HiddenControl2,
            LocDesc: LocDesc,
            PlangroupCode: PlangroupCode,
            PlangroupDesc: PlangroupDesc,
            Priority: Priority,
            ReportedTimeCode: ReportedTimeCode,
            Type: Type,
            WorkrequestNo: WorkrequestNo,
            WorkrequestOn: WorkrequestOn,
            eqpDesc: eqpDesc,
            equipmentCode: equipmentCode,
            fromDate: fromDate,
            groupBy: groupBy,
            locationCode: locationCode,
            reportedBy: reportedBy,
            srchby: srchby,
            srchbyinpval: srchbyinpval,
            status: status,
            toDate: toDate,
            workGroup: workGroup,
            workgroupDesc: workgroupDesc,
            workorderNo: workorderNo,
            wrDesc: wrDesc,
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
// query Query($Actionflag= '',,
//   $groupBy:String,
//   $status:String,
//   $Category= '',,
//   $LocDesc= '',,
//   $PlangroupCode= '',,
//   $Priority= '',,
//   $Type= '',,
//   $WorkrequestNo= '',,
//   $WorkrequestOn= '',,
//   $equipmentCode= '',,
//   $fromDate= '',,
//   $locationCode= '',,
//   $reportedBy= '',,
//   $srchby= '',,
//   $srchbyinpval= '',,
//   $toDate= '',,
//   $workGroup= '',
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
