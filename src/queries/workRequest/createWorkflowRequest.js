
export function createWorkflowRequest(workflow) {
  let fileList = ``
  workflow.fileList.forEach(file => (
    fileList += `
    { filesIndividualRef: "${file.filesIndividualRef}", filesMainRef: "${file.filesMainRef}", ModeFlag: "I" },
    `
  ))
    const query = `
    mutation {
      workRequest_postWrkReqCreation {
        createWorkRequest(
          workReqInfoInput: {
            wrOn: "${workflow.wrOn}"
            eqplocCode: "${workflow.eqplocCode}"
            Guid: "${workflow.Guid}"
            locationCode: "${workflow.locationCode}"
            observationDate: "${workflow.observationDate}"
            observationDetails: "${workflow.observationDetails}"
            observationTime: "${workflow.observationTime}"
            problemCode: "${workflow.problemCode}"
            problemDesc: "${workflow.problemDesc}"
            reportedByCode: "${workflow.reportedByCode}"
            reportedByName: "${workflow.reportedByName}"
            status: "${workflow.status}"
            targetDate: "${workflow.targetDate}"
            targetTime: "${workflow.targetTime}"
            time: "${workflow.time}"
            Timestamp: null
            workGroup: "${workflow.workGroup}"
            workPhone: "${workflow.workPhone}"
            workrequestNo: "${workflow.workrequestNo}"
            wrCategory: "${workflow.wrCategory}"
            wrDesc: "${workflow.wrDesc}"
            wrhdndate1: "${workflow.wrhdndate1}"
            wrhdndate2: "${workflow.wrhdndate2}"
            wrhdndate3: "${workflow.wrhdndate3}"
            wrhdnint1: null
            wrhdnint2: null
            wrhdnint3: null
            wrhdnnumeric1: null
            wrhdnnumeric2: null
            wrhdnnumeric3: null
            wrhdnstring1: ""
            wrhdnstring2: ""
            wrhdnstring3: ""
            wrhdnstring4: ""
            wrhdnstring5: ""
            wrPriority: "${workflow.wrPriority}"
            wrType: "${workflow.wrType}"
            Actionflag: "${workflow.Actionflag}"
            autoclosedesc: "${workflow.autoclosedesc}"
            autoCloseFlag: "${workflow.autoCloseFlag}"
            date: "${workflow.date}"
            equipmentCondition: "${workflow.equipmentCondition}"
            fileList: [${fileList}]
          }
        ) {
          data {
            autoclosedesc
            date
            status
            time
            typedesc
            Timestamp
            prioritydesc
            problemDesc
            workgroupdesc
            eqpconditiondesc
            workrequestNo
            wrondesc
            Guid
          }
        }
      }
    }
    `
    return query;
    // const query = {
    //   // mutation:{
    //     workRequest_postWrkReqCreation:{
    //       createWorkRequest: {
    //         __args:{
    //             wrOn: workflow.wrOn,
    //             eqplocCode: workflow.eqplocCode,
    //           Guid: workflow.Guid,
    //             locationCode: workflow.locationCode,
    //             observationDate: workflow.observationDate,
    //             observationDetails: workflow.observationDetails,
    //             observationTime: workflow.observationTime,
    //             problemCode: workflow.problemCode,
    //             problemDesc: workflow.problemDesc,
    //             reportedByCode: workflow.reportedByCode,
    //             reportedByName: workflow.reportedByName,
    //           status: workflow.status,
    //             targetDate: workflow.targetDate,
    //             targetTime: workflow.targetTime,
    //           time: workflow.time,
    //           Timestamp: workflow.Timestamp,
    //             workGroup: workflow.workGroup,
    //           workPhone: workflow.workPhone,
    //           workrequestNo: workflow.workrequestNo,
    //           wrCategory: workflow.wrCategory,
    //           wrDesc: workflow.wrDesc,
    //           wrhdndate1: workflow.wrhdndate1,
    //           wrhdndate2: workflow.wrhdndate2,
    //           wrhdndate3: workflow.wrhdndate3,
    //           wrhdnint1: workflow.wrhdnint1,
    //           wrhdnint2: workflow.wrhdnint2,
    //           wrhdnint3: workflow.wrhdnint3,
    //           wrhdnnumeric1: workflow.wrhdnnumeric1,
    //           wrhdnnumeric2: workflow.wrhdnnumeric2,
    //           wrhdnnumeric3: workflow.wrhdnnumeric3,
    //           wrhdnstring1: workflow.wrhdnstring1,
    //           wrhdnstring2: workflow.wrhdnstring2,
    //           wrhdnstring3: workflow.wrhdnstring3,
    //           wrhdnstring4: workflow.wrhdnstring4,
    //           wrhdnstring5: workflow.wrhdnstring5,
    //           wrPriority: workflow.wrPriority,
    //           wrType: workflow.wrType,
    //           Actionflag: workflow.Actionflag,
    //           autoclosedesc: workflow.autoclosedesc,
    //             autoCloseFlag: workflow.autoCloseFlag,
    //             date: workflow.date,
    //           equipmentCondition: workflow.equipmentCondition,
    //           fileList: workflow.fileList
    //           // [
    //           //   { filesIndividualRef: "", filesMainRef: "" },
    //           //   { filesIndividualRef: "", filesMainRef: "" }
    //           // ]
    //         },
    //         data: {
    //           autoclosedesc: true,
    //           date: true,
    //           status: true,
    //           time: true,
    //           typedesc: true,
    //           Timestamp: true,
    //           prioritydesc: true,
    //           problemDesc: true,
    //           workgroupdesc: true,
    //           eqpconditiondesc: true,
    //           workrequestNo: true,
    //           wrondesc: true,
    //           Guid: true,
    //         }
    //       }
    //     }
    //   // }
    // }
    // return jsonToGraphQLQuery({'':query}, { pretty: true });
  }

