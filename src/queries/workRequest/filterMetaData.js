import gql from "graphql-tag";

export const FILTERMETADATA = gql`
    query Query{
        workRequest_getWrkReqMetaData{
          getListItems{
            data{
              categoryInformation{
                categoryCode
                categoryDesc
              }
              Plangroupinformation{
                PlangroupCode
                PlangroupDesc
              }
              priorityInformation{
                priorityCode
                priorityDesc
              }
              typeInformation{
                typeCode
                typeDesc
              }
              probleminformation{
                problemCode
                problemDesc
              } 
              statusInformation{
                statusCode
                statusDesc
              }
              reportedbyinformation{
                reportedbycode
                reportedbyname
              }
              workgroupinformation {
                workgroupcode
                workgroupdesc
              }
              workreqfilterinformation{
                workfiltercmbcode
                workfiltercmbdesc
              }
              workReqOnInformation{
                wrOnCode
                wrOnDesc
              }
              reasonforrejectioninformation {
                reasonforrejectioncode
                reasonforrejectiondesc
              }
              ForwardtoUserinfo{
                ForwardtoUserDesc
                ForwardtoUserName
                ForwardtoEmployeeCode
                ForwardtoEmployeeDesc
              }
              workhubinformation{
                workhubcmbcode
                workhubcmbdesc
              }
            }
          }
          
        }
      }
    `;
