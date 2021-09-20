import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export function getWorkflowMetadata() {
    const query = {
      '': {
          workRequest_getWrkReqMetaAndDefs:{
            getListItems:{
              data: {
                categoryInformation:{
                  categoryCode: true,
                  categoryDesc: true,
                },
                eqpConditionInformation:{
                  eqpConditionCode: true,
                  eqpConditionDesc: true,
                },
                Plangroupinformation:{
                  PlangroupCode:true,
                  PlangroupDesc:true,
                },
                priorityInformation:{
                  priorityCode:true,
                  priorityDesc:true,
                },
                probleminformation:{
                  problemCode:true,
                  problemDesc:true,
                },
                statusInformation:{
                  statusCode:true,
                  statusDesc:true,
                },
                typeInformation:{
                  typeCode:true,
                  typeDesc:true,
                },
                workgroupinformation:{
                  workgroupcode:true,
                  workgroupdesc:true,
                },
                workhubinformation:{
                  workhubcmbcode:true,
                  workhubcmbdesc:true,
                },
                workreqfilterinformation:{
                  workfiltercmbcode:true,
                  workfiltercmbdesc:true,
                },
                workReqOnInformation:{
                  wrOnCode:true,
                  wrOnDesc: true,
                },
                reportedbyinformation: {
                  reportedbycode:true,
                  reportedbyname: true,
                }
              },
              message: true,
            },
            screenLaunchdefaultvaluesUPEassistedforallProperties: {
              data: {
                wgCode: true,
                wgdesc: true,
                wrOnCode: true,
                wrOnDesc: true,
                eqplocCode: true,
                eqplocDesc: true,
                eqpConditionCode: true,
                eqpConditionDesc: true,
                typeCode: true,
                typeDesc: true,
                Prioritydesc: true,
                priorityCode: true,
                autoCloseCode: true,
                autoCloseDesc: true,
                categoryCode: true,
                categoryDesc: true,
              },
              message: true,
            }
          }
      }
    }
    return jsonToGraphQLQuery(query, { pretty: true });
  }

