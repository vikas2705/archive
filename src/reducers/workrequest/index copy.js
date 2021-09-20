import { combineReducers } from "redux";

const authContextReducer = (state = {}, action) => {
  switch (action.type) {
    case "authContext":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const userContextReducer = (state={}, action)=> {
  switch (action.type) {
    case "userContext":
      return { ...state, ...action.payload };
    case "switchOU":
      return { ...state, ...action.payload };
    case "setUserName":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const pageContextReducer = (state = {}, action)=> {
  switch (action.type) {
    case "pageContext":
      return { ...state, ...action.payload };
    case "switchPageRole":
      return { ...state, ...action.payload, isRefresh: !state.isRefresh };
    case "setPageRole":
      return { ...state, ...action.payload };
    case "pageRefresh":
      return { ...state, isRefresh: !state.isRefresh };
    default:
      return state;
  }
};


const countByStsReducer = (state = {}, action) => {
  const data = action.payload;
  switch (action.type) {
    case "countBySts":
      return data || {};
    default:
      return state;
  }
};

const refreshContextReducer = (state = false, action) => {
  const data = action.payload;
  switch (action.type) {
    case "refreshContext":
      return data;
    default:
      return state;
  }
};

const wrkReqActiveTabReducer = (state = {}, action) => {
  const data = action.payload;
  switch (action.type) {
    case "wrkReqActiveTab":
      return data || {};
    default:
      return state;
  }
};

const wrkReqByStsReducer = (state = [], action) => {
  const data = action.payload;
  switch (action.type) {
    case "wrkReqBySts":
      return data || [];
    default:
      return state;
  }
};

const wrkReqListFilterReducer = (state = {}, action) => {
  const data = action.payload;
  switch (action.type) {
    case "wrkReqListFilter":
      return data || {};
    default:
      return state;
  }
};

const wrkReqSummaryReducer = (state = {}, action) => {
  const data = action.payload;
  switch (action.type) {
    case "wrkreqsummary":
      return data || {};
    default:
      return state;
  }
};

const wrkReqListActionsReducer = (state = [], action) => {
  const data = action.payload;
  switch (action.type) {
    case "wrkreqlistactions":
      return data || [];
    default:
      return state;
  }
};

const wrkReqMetadataReducer = (state = {}, action) => {
  const data = action.payload;
  switch (action.type) {
    case "wrkreqmetadata":
      return data || {};
    default:
      return state;
  }
};

const singleWrkReqSelectionReducer = (state = {}, action) => {
  const data = action.payload;
  switch (action.type) {
    case "singlewrkreqselection":
      return data || [];
    default:
      return state;
  }
};

const multiWrkReqSelectionReducer = (state = [], action) => {
  const data = action.payload;
  switch (action.type) {
    case "multiwrkreqselection":
      return data || [];
    default:
      return state;
  }
};

const wrkReqOverviewReducer = (state = {}, action) => {
  const data = action.payload;
  switch (action.type) {
    case "wrkreqoverview":
      return data || {};
    default:
      return state;
  }
};

const wrkReqOverviewCardReducer = (state = {}, action) => {
  const data = action.payload;
  switch (action.type) {
    case "wrkreqoverviewcard":
      return data || {};
    default:
      return state;
  }
};

const wrkReqOverviewCardImageReducer = (state = "", action) => {
  const data = action.payload;
  switch (action.type) {
    case "wrkreqoverviewcardimage":
      return data || "";
    default:
      return state;
  }
};

const wrkReqTimelineReducer = (state = {}, action) => {
  const data = action.payload;
  switch (action.type) {
    case "wrkreqtimeline":
      return data || {};
    default:
      return state;
  }
};

const wrkReqSuggestedWOReducer = (state = [], action) => {
  const data = action.payload;
  switch (action.type) {
    case "wrkreqsuggestedwo":
      return data || {};
    default:
      return state;
  }
};

const wrkReqDetAttachmentsReducer = (state = [], action) => {
  const data = action.payload;
  switch (action.type) {
    case "wrkreqdetailAttachments":
      return data || [];
    default:
      return state;
  }
};

const wrkReqDetEdtCpyReducer = (state = {}, action) => {
  const data = action.payload;
  switch (action.type) {
    case "wrkreqedtcpy":
      return data || {};
    default:
      return state;
  }
};

const workRequestReducer = combineReducers({
  authContext: authContextReducer,
  userContext: userContextReducer,
  pageContext: pageContextReducer,
  refreshContext: refreshContextReducer,
  countBySts:  countByStsReducer,
  wrkReqMetadata:wrkReqMetadataReducer,
  wrkReqActiveTab: wrkReqActiveTabReducer,
  wrkReqBySts:wrkReqByStsReducer,
  wrkReqListFilter: wrkReqListFilterReducer,
  wrkReqSummary: wrkReqSummaryReducer,
  wrkReqListActions:wrkReqListActionsReducer,
  singleWrkReqSelection:singleWrkReqSelectionReducer,
  multiWrkReqSelection:multiWrkReqSelectionReducer,
  wrkReqOverview:wrkReqOverviewReducer,
  wrkReqOverviewCard:wrkReqOverviewCardReducer,
  wrkReqOverviewCardImage:wrkReqOverviewCardImageReducer,
  wrkReqTimeline:wrkReqTimelineReducer,
  wrkReqSuggestedWO:wrkReqSuggestedWOReducer,
  wrkReqDetAttachments:wrkReqDetAttachmentsReducer,
  wrkReqDetEdtCpy:wrkReqDetEdtCpyReducer
  });

export default workRequestReducer;

