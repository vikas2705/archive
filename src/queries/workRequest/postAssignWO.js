import { gql } from "graphql-request";
import {graphQLClient} from '../../utils/gqlClient';
import { useMutation } from "react-query";

export function POST_ASSIGN_WO(data) {
    return useMutation(async () => {
      const postAssignWO = graphQLClient.request(gql`
      mutation Mutation(
        $workorderNo: String,
        $workrequestNo: String
      ) {
        workRequest_postWRAssignWrkReq {
          tagWorkrequesttotheworkordergivenintheRequestbody(
            workrequestsTagworkorderInput: [
               {
                Actionflag: ""
                workorderNo: $workorderNo
                workrequestNo: $workrequestNo
              }
            ]
          ) {
            data {
              workrequestNo
            }
          }
        }
      }
        `,{...data})
        return postAssignWO
      });
    }

