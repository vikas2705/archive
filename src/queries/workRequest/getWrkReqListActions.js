import gql from "graphql-tag";

export const GET_WRK_REQ_LISTACTIONS = gql`
    query Query(
        $DocumentNo: String,
        $DocumentStatus: String
           ){
            workRequest_getlistOfAllowedActions {
            listOfAllowedActions(
                ComponentCode: "APIEAMWrkReq"
                DocumentType:"EAMWrkReq" 
                DocumentNo : $DocumentNo
                DocumentStatus: $DocumentStatus
            ) {
            data {
            AllowedActionCode
            AllowedActionDesc
            }
            message
            }
            }
            }
    `;