
import { call, select } from "redux-saga/effects";
import axios from 'axios';
import { AppSettings } from "../../utils/appSettings";

const getToken = (state) => {
  return state.context.accessToken;
}
export function* uploadAttachment({ file }) {
  const tokenState = yield select(getToken);
  const token = tokenState || AppSettings.TEST_TOKEN;
  var formData = new FormData();
  formData.append('operations', `{
        "query":"mutation uploadFile($file:Upload!,$fileId:String,$relativePath:String){uploadFile(file:$file,fileId:$fileId,relativePath:$relativePath)}","variables":{"file":null,"fileId":"${file.name}","relativePath":"APIEamwrkreq"}
        }`);
  formData.append('map', `{"file": ["variables.file"]}`);
  formData.append('file', file);
  console.log("formData", formData);
  // const state = window.store.getState();
  try {
    const response = yield call(axios.post, AppSettings.API_URL,
      formData, { headers: { Authorization: `Bearer ${token}`, } })
    const { data } = JSON.parse(response.data.data.uploadFile);
    return { data };
  }
  catch (e) {
    return { error: 'Upload failed' }
  }
}
