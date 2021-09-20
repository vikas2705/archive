import { gql } from "graphql-request";
import { graphQLClient } from '../../utils/gqlClient';
import { useQuery } from "react-query";

export function GET_WRK_REQ_TIMELINE(wrNo) {
    let data ={
      wrNo : wrNo ? wrNo : ""
    };
    
    return useQuery(
        ["getwrkreqtimeline", data],
        async () => {
            const getWrkReqTimeline = await graphQLClient.request(gql`
        query Query( 
            $wrNo: String!
            ){
                workRequest_getWRTimeline{
                    getthetimelinemapoftheWorkRequest(wrNo:$wrNo){
                      data{
                        icon
                        noLine
                        username
                        HistoryTitle
                        HistoryDatetime
                        circlecolor
                        iconcode
                      }
                    }
                  }
                }
        `, { ...data });
            return getWrkReqTimeline
        }, { staleTime: Infinity, retry: false });
}



