export function postAssignWOV2({ wrNo, woNo }) {
  const query = `
    mutation {
      workRequest_postWRAssignWrkReq {
        tagWorkrequesttotheworkordergivenintheRequestbody (
          workrequestsTagworkorderInput: [
            {
              Actionflag: ""
              workorderNo: "${woNo}"
              workrequestNo: "${wrNo}"
            }
          ]
        ) {
          data {
            workrequestNo
          }
        }
      }
    }
  `;
  return query;
}

