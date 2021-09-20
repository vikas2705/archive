const getActionFlagByWorkhubInfoGroupBy = (groupBy) => {
  if(groupBy === 'Priority'){
    return "Priority_Filter";
  }
  if(groupBy === 'Status'){
    return "Browse_Work_Requests_UI_Fetch";
  }
  if(groupBy === 'RepDate'){
    return "ReportedDate_Filter";
  }
  return "";
}

export default getActionFlagByWorkhubInfoGroupBy;