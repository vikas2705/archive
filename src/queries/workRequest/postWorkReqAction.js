
export function postWorkReqAction(value) {
  let req = '';
  value.forEach(val => {
    req += `
    {
      actionFlag: "${val.actionFlag || ''}"
      workrequestNo: "${val.workrequestNo || ''}"
      forwardToUser: "${val.forwardToUser || ''}"
      Guid: "${val.guid || ''}"
      rejectionReason: "${val.rejectionReason || ''}"
      Timestamp: null
    }
    `
  })
  const query = `
    mutation {
      workRequest_postWrkReqs {
        processtheWorkRequestbasedontheActionTypeflag(
          wRProcessInputInput: {
            ProcessWorkReqInfo: [
              ${req}
            ]
          }
        ) {
          data {
            Guid
            workrequestNo
            status
            Timestamp
          }
          message
        }
      }
    }
    `
    return query;
  }

