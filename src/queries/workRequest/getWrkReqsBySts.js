import gql from "graphql-tag";

export const GET_WRK_REQ_LIST = gql`
query Query( $Actionflag:String,
    $status:String,
    $Category: String,
    $LocDesc: String,
    $PlangroupCode: String,
    $Priority: String,
    $Type: String,
    $workrequestNo: String,
    $workrequestOn: String,
    $equipmentCode: String,
    $fromDate: String,
    $locationCode: String,
    $reportedBy: String,
    $srchby: String,
    $srchbyinpval: String,
    $toDate: String,
    $workGroup: String,
    $skip : Int
   ){
    workRequest_getWrkReqsBySts {
        getthelistofWorkRequests( 
            Actionflag: $Actionflag
            Category: $Category
            LocDesc: $LocDesc
            PlangroupCode: $PlangroupCode
            Priority: $Priority
            Type: $Type
            workrequestNo: $workrequestNo
            workrequestOn: $workrequestOn
            equipmentCode: $equipmentCode
            fromDate: $fromDate
            locationCode: $locationCode
            reportedBy: $reportedBy
            srchby: $srchby
            srchbyinpval: $srchbyinpval
            status: $status
            toDate: $toDate
            workGroup: $workGroup
            skip: $skip
            take:15
           ) {
        data {
            GetWorkReqInfo {
            autoclose
            date
            Guid
            GetfileListinfo {
                filesMainRef
                filesIndividualRef
                relativePath
            }
            reportedByCodeout
            reportedByNameout
            equipmentCodeout
            equipmentdescout
            equipmentCondition
            equipmentConditiondesc
            Locationdesc
            locationCodeout
            observationDate
            observationTime
            observationDetails
            statusout
            Statusdesc
            time
            Typeout
            Typedesc
            timestamp
            targetDate
            workPhone
            Categoryout
            Categorydesc
            Priorityout
            problemCode
            problemDesc
            Prioritydesc
            wrDesc
            WorkOrderNo
            workGroupout
            Workgroupdesc
            workrequestNoout
            workrequestOnout
            workrequestOndesc
            SuggestedOrAssignedWOFlag
            }
        }
        }
    }
}
`;