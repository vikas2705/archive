import { jsonToGraphQLQuery } from 'json-to-graphql-query';

/***
 * 
 * 
 * THIS IS NOT USED
 */
export function getWorkRequestDetail({ wrOn = "", wrNo = "", status = "", Actionflag = "" }) {
  const query = {
    '': {
      workRequest_getWRWorkorder: {
        listofopenWorkordersraisedontheEquipmentLocation: {
          __args: {
            Actionflag: Actionflag,
            status: status,
            workrequestno: wrNo,
            wrOn: wrOn
          },
          data: {
            WorkOrderInfo: {
              woNo: true,
              woOn: true,
              woDate: true,
              woDesc: true,
              woType: true,
              woOnCode: true,
              woOndesc: true,
              woStatus: true,
              worktitle: true,
              woCategory: true,
              woTypedesc: true,
              woOnCodeDesc: true,
              woSupervisor: true,
              WorkRequestNo: true,
              // woCriticality: true,
              woCategorydesc: true,
              // woCriticalitydesc: true,
            }
          }
        }
      }
    }
  }
  return jsonToGraphQLQuery(query, { pretty: true });
}


// return useQuery(
//   ["getwrkreqtimeline", data],
//   async () => {
//       const getWrkReqTimeline = await graphQLClient.request(gql`
//   query Query( 
//       $wrNo: String!
//       ){
//           workRequest_getWRTimeline{
//               getthetimelinemapoftheWorkRequest(wrNo:$wrNo){
//                 data{
//                   icon
//                   noLine
//                   username
//                   HistoryTitle
//                   HistoryDatetime
//                   circlecolor
//                   iconcode
//                 }
//               }
//             }
//           }
//   `, { ...data });
//       return getWrkReqTimeline
//   }, { staleTime: Infinity, retry: false });



