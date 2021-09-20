import { gql } from "graphql-request";
import { graphQLClient } from '../../utils/gqlClient';
import { useQuery } from "react-query";

export function DOWNLOAD_FILE(fileId,relativePath) {
    let data ={
      fileId : fileId || "",
      relativePath : relativePath || ""
    };
    return useQuery(
        ["downloadfile", data],
        async () => {
            const downloadFile = await graphQLClient.request(gql`
        query Query(
          $fileId: String!,
          $relativePath: String!
        ){
          downloadFile(fileId:$fileId,relativePath:$relativePath)
          }
        `, { ...data });
            return downloadFile
        }, { staleTime: Infinity, retry: false, enabled:false });
}



