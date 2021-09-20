import { gql } from "graphql-request";
import { graphQLClient } from '../../utils/gqlClient';
import { useQuery } from "react-query";

export function GETCOUNTBYFILTER(data, value) {
    data.Category = data.Category || "";
    data.LocDesc = data.LocDesc || "";
    data.PlangroupCode = data.PlangroupCode || "";
    data.Priority = data.Priority || "";
    data.Type = data.Type || "";
    data.WorkrequestNo = data.WorkrequestNo || "";
    data.WorkrequestOn = data.WorkrequestOn || "";
    data.equipmentCode = data.equipmentCode || "";
    data.fromDate = data.fromDate || "";
    data.locationCode = data.locationCode || "";
    data.reportedBy = data.reportedBy || "";
    data.srchby = data.srchby || "";
    data.srchbyinpval = data.srchbyinpval || "";
    data.toDate = data.toDate || "";
    data.workGroup = data.workGroup || "";
    data.status = value.status || "";
    data.groupBy = value.groupBy || "";
    data.Actionflag = value.Actionflag || "";
    
    if (data.Category !== "" || data.LocDesc !== "" || data.PlangroupCode !== "" || data.Priority !== "" ||
        data.Type !== "" || data.WorkrequestOn !== "" || data.equipmentCode !== "" || data.fromDate !== ""
        || data.locationCode !== "" || data.reportedBy !== "" || data.srchby !== "" || data.srchbyinpval !== "" ||
        data.toDate !== "" || data.workGroup !== "") {
        data.Actionflag = "filter";
    } 
    // else {
    //     data.Actionflag = "status_click";
    // }

    return useQuery(
        ["count-data", data],
        async () => {
            const getCountData = await graphQLClient.request(gql`
        query Query( $Actionflag: String,
            $status:String,
            $Category: String,
            $LocDesc: String,
            $PlangroupCode: String,
            $Priority: String,
            $Type: String,
            $WorkrequestNo: String,
            $WorkrequestOn: String,
            $equipmentCode: String,
            $fromDate: String,
            $locationCode: String,
            $reportedBy: String,
            $srchby: String,
            $srchbyinpval: String,
            $toDate: String,
            $workGroup: String
            ){
            workRequest_getCountBySts {
                gettheCountofWorkRequestsgroupedbyStatus(Actionflag: $Actionflag
                Category: $Category
                LocDesc: $LocDesc
                PlangroupCode: $PlangroupCode
                Priority: $Priority
                Type: $Type
                WorkrequestNo: $WorkrequestNo
                WorkrequestOn: $WorkrequestOn
                equipmentCode: $equipmentCode
                fromDate: $fromDate
                locationCode: $locationCode
                reportedBy: $reportedBy
                srchby: $srchby
                srchbyinpval: $srchbyinpval
                status: $status
                toDate: $toDate
                workGroup: $workGroup        
                ) {
                data {
                    AvgClosureUOM
                    AvgClosureTime
                    AvgResponseUOM
                    AvgResponseTime
                    workhubcmbdesc
                    workhubcmbcode
                    workrequestcount {
                    tabdata
                    tabvalue
                    tabSelection
                    hdn_card_code
                    circlecolor
                    labelSelection
                    }
                    workfiltercmbcode
                    workfiltercmbdesc
                }
                }
            }
        }
        `, { ...data });
            return getCountData
        }, { staleTime: Infinity, retry: false, enabled:false });
}



