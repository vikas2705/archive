import { gql } from "graphql-request";
import { graphQLClient } from '../../utils/gqlClient';
import { useQuery } from "react-query";

export function GET_SUGGESTED_WO(workrequestno,skip) {
    let data ={
      workrequestno: workrequestno || "",
      skip:skip || 0
    };
   
    return useQuery(
        ["getsuggestedWO", data],
        async () => {
            const getSuggestedWO = await graphQLClient.request(gql`
        query Query( 
            $workrequestno: String!,
            $skip: Int
            ){
              workRequest_getWRWorkorder {
                listofopenWorkordersraisedontheEquipmentLocation(
                  Actionflag: ""
                  status: ""
                  workrequestno:$workrequestno
                  wrOn: ""
                  skip: $skip
                  take: 15
                ) {
                  data {
                    WorkOrderInfo{
                      woNo
                      woOn
                      woDate
                      woDesc
                      woType
                      woOnCode
                      woOndesc
                      woStatus
                      worktitle
                      woCategory
                      woTypedesc
                      woOnCodeDesc
                      woSupervisor
                      WorkRequestNo
                      woCriticality
                      woCategorydesc
                      woCriticalitydesc
                      woSupervisorName
                      woSupervisorPhone
                      woScheduledStartDate
                      woScheduledCompletionDate
                    }
                  }
                }
              }
            }`, { ...data });
            return getSuggestedWO
        }, { staleTime: Infinity, retry: false, enabled:false});
}



