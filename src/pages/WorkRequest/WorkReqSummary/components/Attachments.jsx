import { ExtContainer, ExtDataview } from '@sencha/ext-react-modern';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { DOWNLOAD_FILE } from '../../../../queries/workRequest/downloadFile';

const Ext = window.Ext,
  BusyCursor = window.BusyCursor;

function Attachments(props) {
  const { wrkReqDetAttachments, wrkReqOverview } = props;
  const [download, setDownload] = useState(true);
  const dispatch = useDispatch();

  let file = {};
  if (wrkReqOverview && wrkReqOverview.GetfileListinfo && wrkReqOverview.GetfileListinfo.length > 0) {
    file.id = wrkReqOverview.GetfileListinfo[0].filesIndividualRef;
    file.relativePath = wrkReqOverview.GetfileListinfo[0].relativePath;
  }
  const downloadFile = DOWNLOAD_FILE(file.id, file.relativePath);
  const dataStore = new Ext.data.Store({});

  if (download && wrkReqOverview && wrkReqOverview.GetfileListinfo &&
    wrkReqOverview.GetfileListinfo.length > 0 && file.id && file.relativePath) {
    downloadFile.refetch();
    setDownload(false);
  }

  useEffect(() => {
    let { data, error, isLoading, isSuccess } = downloadFile;
    if (isLoading) {
      console.log("loading");
      BusyCursor.show();
    }
    else if (isSuccess && data.downloadFile) {
      let byteArray = data.downloadFile;
      var binary = '';
      var bytes = new Uint8Array(byteArray);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      var payloadData = [{
        src: 'data:image/jpeg;base64,' + window.btoa(binary),
        fileName: wrkReqOverview.GetfileListinfo[0].filesMainRef
      }];
      dispatch({ type: "wrkreqdetailAttachments", payload: payloadData });
      BusyCursor.hide();
    }
    else if (error) {
      BusyCursor.hide();
      console.log(error);
      Ext.Msg.alert("Error", error.message);
      Ext.Msg.setHideAnimation(null);
    }
  }, [downloadFile.isSuccess]);

  if (wrkReqDetAttachments && wrkReqDetAttachments.length > 0) {
    dataStore.loadData(wrkReqDetAttachments);
  }

  return (
    <ExtDataview
      cls="wrkreqsum-attachContainer"
      layout="hbox"
      height="75vh"
      itemTpl='<img src={src} class="wrkreqsum-attachdataview" /><div class="wrkreqsum-attachfilename">{fileName}</div>'
      store={dataStore}
      scrollable="true"
    ></ExtDataview>
  );
}



const mapStateToProps = (
  {
    workrequest: {
      wrkReqDetAttachments, wrkReqOverview
    }
  }
) => {
  return {
    wrkReqDetAttachments, wrkReqOverview
  };
};

export default connect(mapStateToProps)(Attachments);
