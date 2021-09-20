import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export function getWorkRequestTimeline({wrNo}) {
  const query = {
    '': {
      workRequest_getWRTimeline: {
        getthetimelinemapoftheWorkRequest: {
          __args: {
            wrNo: wrNo,
          },
          // workRequest_getWorkrequestsTimeline: {
            data: {
              // GetWorkReqInfo: {
                // workRequest_WorkReqTimelineOutput: {
              icon: true,
              noLine: true,
              username: true,
              HistoryTitle: true,
              HistoryDatetime: true,
              circlecolor: true,
              iconcode: true,
              // }
            }
          // }
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



