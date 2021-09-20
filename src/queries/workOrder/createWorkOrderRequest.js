
export function createWorkOrderRequest(workOrder) {
  let fileList = ``
  workOrder.fileList.forEach(file => (
    fileList += `
    { filesIndividualRef: "${file.fileId}", filesMainRef: "${file.name}", ModeFlag: "I" },
    `
  ))
    const query = `
    mutation {
      EAMWorkOrder_postworkOrderCreation {
        createWorkOrder(
          workOrderInfoInput: {
            actionFlag: "${workOrder.actionFlag}"
            WoEqpLocCode: "${workOrder.WoEqpLocCode}"
            WoOnEqpLocFlag: "${workOrder.WoOnEqpLocFlag}"
            WorkGroup: "${workOrder.WorkGroup}"
            WorkOrderDesc: "${workOrder.WorkOrderDesc}"
            WorkPhone1: "${workOrder.WorkPhone1}"
            WorkPhone2: "${workOrder.WorkPhone2}"
            WoScheduledComplDate: "${workOrder.WoScheduledComplDate}"
            WoScheduledComplTime: "${workOrder.WoScheduledComplTime}"
            WoScheduledStartDate: "${workOrder.WoScheduledStartDate}"
            WoScheduledStartTime: "${workOrder.WoScheduledStartTime}"
            WoSource: "${workOrder.WoSource}"
            WoStatus: "${workOrder.WoStatus}"
            accountCode: "${workOrder.accountCode}"
            AdditionalFaiureInfo: "${workOrder.AdditionalFaiureInfo}"
            analysisCode: "${workOrder.analysisCode}"
            contractNo: "${workOrder.contractNo}"
            CopyTasksFromProcedure: "${workOrder.CopyTasksFromProcedure}"
            CostCenterCode: "${workOrder.CostCenterCode}"
            CostType: "${workOrder.CostType}"
            FailureDate: "${workOrder.FailureDate}"
            fbid: "${workOrder.fbid}"
            WoSubGroup: "${workOrder.WoSubGroup}"
            WoTime: "${workOrder.WoTime}"
            WoType: "${workOrder.WoType}"
            genfrom: "${workOrder.genfrom}"
            Guid: "${workOrder.Guid}"
            holdReason: "${workOrder.holdReason}"
            InterruptedDatetime: "${workOrder.InterruptedDatetime}"
            LeadCode: "${workOrder.LeadCode}"
            MajorProblemCode: "${workOrder.MajorProblemCode}"
            MajorProblemDesc: "${workOrder.MajorProblemDesc}"
            ParentWOCode: "${workOrder.ParentWOCode}"
            percentCompleted: ${workOrder.percentCompleted}
            PerformRCAFlag: "${workOrder.PerformRCAFlag}"
            PlanningGroup: "${workOrder.PlanningGroup}"
            projectCode: "${workOrder.projectCode}"
            proposalid: "${workOrder.proposalid}"
            ReasonCode: "${workOrder.ReasonCode}"
            RejectionReason: "${workOrder.RejectionReason}"
            Remarks: "${workOrder.Remarks}"
            ScheduleBy: "${workOrder.ScheduleBy}"
            SchedulingRemarks: "${workOrder.SchedulingRemarks}"
            subAnalysisCode: "${workOrder.subAnalysisCode}"
            SupervisorCode: "${workOrder.SupervisorCode}"
            TimeStamp: ${workOrder.TimeStamp}
            WoAuthRequiredFlag: "${workOrder.WoAuthRequiredFlag}"
            WoAuthUser: "${workOrder.WoAuthUser}"
            WoCategory: "${workOrder.WoCategory}"
            WoClearanceRequiredFlag: "${workOrder.WoClearanceRequiredFlag}"
            WoDate: "${workOrder.WoDate}"
            WoDuration: ${workOrder.WoDuration}
            WoEqpLocDescription: "${workOrder.WoEqpLocDescription}"
            WoGroup: "${workOrder.WoGroup}"
            WoMiscCost: ${workOrder.WoMiscCost}
            WoPermitType: "${workOrder.WoPermitType}"
            WoPriority: "${workOrder.WoPriority}"
            WoRank: "${workOrder.WoRank}"
            WorkOrderNo: "${workOrder.WorkOrderNo}"
          }
        ) {
          data {
            WoDateout
            WoTimeout
            WoStatusout
            WorkOrderNoout
            WorkOrderDescout
            TimeStampout
          }
        }
      }
    }`
    return query;
  }

