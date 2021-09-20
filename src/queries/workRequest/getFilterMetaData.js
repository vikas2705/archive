import { jsonToGraphQLQuery } from "json-to-graphql-query";

export default function getFilterMetaData(){
  const query = {
    '': {
      workRequest_getWrkReqMetaData: {
        getListItems: {
          data: {
            workhubinformation:{
              workhubcmbcode: true,
              workhubcmbdesc: true,
            },
            categoryInformation: {
              categoryCode: true,
              categoryDesc: true,
            },
            Plangroupinformation:{
              PlangroupCode: true,
              PlangroupDesc: true,
            },
            priorityInformation: {
              priorityCode: true,
              priorityDesc: true,
            },
            typeInformation:{
              typeCode: true,
              typeDesc: true,
            },
            probleminformation:{
              problemCode: true,
              problemDesc: true,
            },
            statusInformation:{
              statusCode: true,
              statusDesc: true,
            },
            reportedbyinformation:{
              reportedbycode: true,
              reportedbyname: true,
            },
            workgroupinformation: {
              workgroupcode: true,
              workgroupdesc: true,
            },
            workreqfilterinformation:{
              workfiltercmbcode: true,
              workfiltercmbdesc: true,
            },
            workReqOnInformation:{
              wrOnCode: true,
              wrOnDesc: true,
            },
            reasonforrejectioninformation: {
              reasonforrejectioncode: true,
              reasonforrejectiondesc: true,
            },
            ForwardtoUserinfo:{
              ForwardtoUserDesc: true,
              ForwardtoUserName: true,
              ForwardtoEmployeeCode: true,
              ForwardtoEmployeeDesc: true,
            },
          }
        }
      }
    }
  }
  return jsonToGraphQLQuery(query, { pretty: true });
}
