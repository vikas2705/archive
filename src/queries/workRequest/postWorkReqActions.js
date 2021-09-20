import { gql } from "graphql-request";
import {graphQLClient} from '../../utils/gqlClient';
import { useMutation } from "react-query";

export function POST_WRK_REQ_ACTIONS(data) {
    return useMutation(async () => {
      const postWrkReqActions = graphQLClient.request(gql`
      mutation Mutation(
        $workRequest_ProcessWorkReqInfo2Input: [workRequest_ProcessWorkReqInfo2Input]
      ) {
        workRequest_postWrkReqs {
          processtheWorkRequestbasedontheActionTypeflag(
            wRProcessInputInput:{
              ProcessWorkReqInfo:$workRequest_ProcessWorkReqInfo2Input
            }
          ) {
            data {
              Guid
              workrequestNo
              status
              Timestamp
            }
            message
          }
        }
      }      
        `,{...data})
        return postWrkReqActions
      });
    }

