import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export function getWorkOrderMetadata() {
    const query = {
      '': {
          EAMWorkOrder_getMetaData_UpeDefault: {
            screenLaunchdefaultvaluesUPEassistedforallProperties: {
              data: {
                CategoryCode: true,
                CategoryDesc: true,
                TypeCode: true,
                TypeDesc: true,
                ProblemCode: true,
                ProblemDesc: true,
                PriorityCode: true,
                PriorityDesc: true,
                PlanningGroupCode: true,
                PlanningGroupName: true,
                WOEqpLocCode: true,
                WOEqpLocDesc: true,
                WorkGroupCode: true,
                WorkOrderOnCode: true,
                WorkOrderOnName: true,
                CompanyBaseCurrency: true,
                WorkPhone1: true,
                WorkPhone2: true,
                PerformRCA: true,
                SupervisorCode: true,
                SupervisorName: true,
              }
            },
            getListItems: {
              data: {
                Typeinfo: {
                  TypeCode: true,
                  TypeDesc: true,
                },
                Categoryinfo: {
                  CategoryCode: true,
                  CategoryDesc: true,
                },
                Probleminfo: {
                  ProblemCode: true,
                  ProblemDesc: true,
                },
                PlanningGroupinfo: {
                  PlanningGroupCode: true,
                  PlanningGroupName: true,
                },
                Priorityinfo: {
                  PriorityCode: true,
                  PriorityDesc: true,
                },
                Supervisorinfo: {
                  SupervisorCode: true,
                  SupervisorName: true,
                },
                WoStatusinfo: {
                  WoStatusDesc: true,
                  WoStatusCode: true,
                },
                WorkGroupinfo: {
                  WorkGroupCode: true,
                  WorkGroupName: true,
                },
                WorkOrderOninfo: {
                  WorkOrderOnCode: true,
                  WorkOrderOnName: true,
                },
                Parentinfo: {
                  ParentWOCode: true,
                  ParentWODesc: true,
                },
              }
            }
        }
      }
    }
    return jsonToGraphQLQuery(query, { pretty: true });
  }

