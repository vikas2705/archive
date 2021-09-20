import React from "react";
import { useDispatch } from "react-redux";
import actions from "../../../../actions";
import { useSelector } from "react-redux";
import { selectors } from "../../../../reducers";
import { shallowEqual } from "react-redux";
import { useMemo } from "react";
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { useCallback } from "react";
import AttachmentsV2 from "../../../../components/AttachmentsV2";


const emptySet = [];
export default function WorkOrderAttachments({ slideView }) {
  const dispatch = useDispatch();
  const allFiles = useSelector(state => {
    const { fileList } = selectors.workOrder(state)?.value || [];
    return fileList || emptySet
  }, shallowEqual)

  const filesUploadedToServer = useMemo(() => {
    return allFiles.filter(i => i.status === 'UPLOADING' || i.status === 'UPLOADED');
  }, [allFiles])

  const handleUpload = useCallback((file, base64Data) => {
    dispatch(actions.workOrder.update.addAttachment(file, base64Data));
  }, [dispatch])

  const handleDelete = useCallback((fileId) => {
    dispatch(actions.workOrder.update.removeAttachment(fileId));
  }, [dispatch])

  return (
    <AttachmentsV2
      files={filesUploadedToServer}
      onUpload={handleUpload}
      slideView={slideView}
      onDelete={handleDelete}
    />
  );
}
