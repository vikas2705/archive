export const WR_LIST_ACTION_FLAG={
  Status: 'Browse_Work_Requests_UI_Fetch',
  Priority: 'Priority_Filter',
  RepDate: 'ReportedDate_Filter'
};

export const ACTION_LIST_MAP = {
  //ActionFlag: 'MOVE2PJL'
  AUT: {title: 'Authorize', message: 'Are you sure you want to authorize selected WR(s)?', },
  REJ: {title: 'Reject', message: 'Are you sure you want to reject selected WR(s) ?' },
  AUTCRWO: {title: 'Approve & Create WO', message: 'Are you sure, you want to approve & create WO for the selected WR(s)?', },
  FRWD: {title: 'Forward', message: 'Are you sure, you want to forward selected WR(s)?', },
  CNL: {title: 'Cancel', message: 'Are you sure, you want to Cancel selected WR(s)?', },
  MVPL: {title: 'Move to Pending List', message: 'Are you sure, you want to move selected WR(s) to pending list?',},
  CLS: {title: 'Close', message: 'Are you sure, you want to close selected WR(s)?',},
  REV: {title: 'Reverse', message: 'Are you sure, you want to reverse selected WR(s)?',},
}
export default WR_LIST_ACTION_FLAG;