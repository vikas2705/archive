import { gql } from "graphql-request";
import { graphQLClient } from '../../utils/gqlClient';
import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";

export function GET_OVERVIEW_CARD(EqporLoc, EqpCode, LocCode) {
  const gqlClient = new GraphQLClient(graphQLClient.url, {
    headers: {
      Authorization: graphQLClient.options.headers.Authorization,
      g_ctxt_cmp: "location",
      g_ctxt_lang: graphQLClient.options.headers.g_ctxt_lang,
      g_ctxt_ou: graphQLClient.options.headers.g_ctxt_ou,
      g_ctxt_role: graphQLClient.options.headers.g_ctxt_role,
      CACHE_CLEAR : true,
      NO_CACHE:true
    }
  });

  let EqpLocCode = "";
  if (EqporLoc === "E") {
    EqpLocCode = EqpCode;
  } else if (EqporLoc === "L") {
    EqpLocCode = LocCode;
  }

  let data = {
    EqporLoc: EqporLoc || "",
    EqpLocCode: EqpLocCode || "",
    Actionflag: "UI"
  };

  return useQuery(
    ["getOverviewCard", data],
    async () => {
      const getOverviewCard = await gqlClient.request(gql`
        query Query( 
            $EqporLoc: String!,
            $EqpLocCode: String,
            $Actionflag: String
            ){
              location_getEqpLocDet{
                getEquipmentLocationDetails(EqporLoc:$EqporLoc,EqpLocCode:$EqpLocCode,Actionflag:$Actionflag){
                  data{
                    ParentCode
                    ParentDesc
                    EqpLocCode
                    EqpLocDesc
                    eqpLocDefaultImage
                    WorkGroupTeamLeadContactNo
                  }
                }
              }
            }`, { ...data });
      return getOverviewCard
    }, { staleTime: Infinity, retry: false, enabled: false });
}



