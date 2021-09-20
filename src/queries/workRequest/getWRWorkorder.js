import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export function getWRWorkOrder({ wrNo, }) {
  const query = {
    '': {
      workRequest_getWRWorkorder: {
        listofopenWorkordersraisedontheEquipmentLocation: {
          __args: {
            Actionflag: "",
            status: "",
            workrequestno: wrNo,
            wrOn: "",
          },
          data: {
            WorkOrderInfo: {
              WorkRequestNo: true,
              completionpercentage: true,
              woCategory: true,
              woCategorydesc: true,
              woDate: true,
              woDesc: true,
              woNo: true,
              woOn: true,
              woOnCode: true,
              woOnCodeDesc: true,
              woOndesc: true,
              woPriority: true,
              woPrioritydesc: true,
              woScheduledCompletionDate: true,
              woScheduledStartDate: true,
              woStatus: true,
              woSupervisor: true,
              woSupervisorName: true,
              woSupervisorPhone: true,
              woType: true,
              woTypedesc: true,
              worktitle: true,
            }
          },
          message: true,
        }
      }
    }
  }
  return jsonToGraphQLQuery(query, { pretty: true });
}
