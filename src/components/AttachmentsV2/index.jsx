import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useRef, useState } from "react";
import DocumentThumbnail from "../DocumentThumbnail";
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import clsx from 'clsx';
import CameraIcon from "../../assets/Icons/CameraIcon";
import CapturePhoto from "../CapturePhoto";
import FullScreenDialog from "../FullScreenDialog";
import { useMemo } from "react";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { useCallback } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import NoImageIcon from "../../assets/Icons/NoImageIcon";
import ExpandWhiteIcon from "../../assets/Icons/ExpandWhiteIcon";
import ExpandIcon from "../../assets/Icons/ExpandIcon";
import EditImageIcon from "../../assets/Icons/EditImageIcon";
import PDFImage from "../../assets/img/pdf.png"
import DeleteAttachmentIcon from "../../assets/Icons/DeleteAttachmentIcon";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import AttachIcon from "../../assets/Icons/AttachIcon";
import IconButton from "../IconButton";
import { useDispatch, useSelector } from "react-redux";
import { selectors } from "../../reducers";
import actions from "../../actions";
import Spinner from "../Spinner";

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';


const useStyles = makeStyles({
  paper: {
    textAlign: "center",
  },
  fieldsetWrapper: {
    padding: "12px 12px 3px 12px",
    "& .x-button.x-has-text .x-inner-el": {
      padding: "3px 12px",
    },
    "& .x-button.x-has-text .x-text-el": {
      color: "#ffffff",
      textTransform: "capitalize",
    },
  },
  extraSpacing: {
    paddingLeft: "20px",
  },
  editIcon: {
    position: "absolute",
    textAlign: 'right',
    right: 4,
    bottom: 90,
    zIndex: "999",
  },
  attachIcon: {
    position: "absolute",
    right: props => props.slideView ? 4 : "30px",
    bottom: props => props.slideView ? 90 : 180,
    zIndex: "999",
  },
  cameraIcon: {
    position: "absolute",
    right: props => props.slideView ? 4 : "30px",
    bottom: props => props.slideView ? 50 : 120,
    zIndex: "999",
  },
  plusIcon: {
    position: "absolute",
    right: props => props.slideView ? 4 : "30px",
    bottom: props => props.slideView ? 10 : "50px",
    float: 'right',
    zIndex: "999",
    color: "#0073E6",
    // fontSize: "60px",
  },
  deleteFileSlideIcon: {
    position: "absolute",
    right: 4,
    bottom: 50,
    float: 'right',
    zIndex: "999",
    color: "#0073E6",
  },
  crossIcon: {
    position: "fixed",
    right: "30px",
    bottom: 90,
    zIndex: "999",
    color: "#5C677D",
    fontSize: "60px",
  },
  spinner: {
    margin: 'auto',
  },
  slide: {
    height: '100%',
    width: '100%',
  },
  carousel: {
    width: '100%',
    height: '100%',
    '& > .carousel-slider': {
      width: '100%',
      height: '100%',
      '& > .control-dots': {
        bottom: 0,
        margin: 0,
      },
      '& > .slider-wrapper': {
        width: '100%',
        border: '1px solid #E9EBEF',
        borderRadius: 5,
        height: 'calc(100% - 16px)',
        '& > .slider': {
          width: '100%',
          height: '100%',
        }
      }
    },
    '& > .slider-wrapper': {
      width: '100%',
      height: '100%',
    }
  },
  imgSlider: {
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    display: 'flex'

  },
  withAttachment: {
    border: '0px !important'
  },
  noImageText: {
    color: '#5e5e5e',
    fontSize: 13,
    marginTop: '5%',
    textAlign: 'center'
  },
  noFileText: {
    color: '#5e5e5e',
    fontSize: 13,
    marginTop: '5%',
    textAlign: 'center'
  },
  fabWrapperRelative: {
    position: 'relative',
  },
  noFileTextSlider: {
    color: '#5e5e5e',
    fontSize: 13,
    margin: 'auto',
    textAlign: 'center'
  },
  slideContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',

  },
  slideWrapper: {
    background: '#FFFFFF',
    height: 184,
    width: '100%',
    border: '1px solid #E9EBEF',
    borderRadius: 5,
  },
  icon: {
    '& > svg': {
      width: props => props.slideView ? '45px' : "",
      height: props => props.slideView ? '45px' : "",
    }
  }
});

const indicatorStyles = {
  background: 'rgba(4, 102, 200, 0.2)',
  width: 8,
  height: 8,
  display: 'inline-block',
  margin: '0 8px',
};

function getBase64(file, cb) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result)
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

const imgThumbnail = (type, base64Img) => {
  if (type.includes('image/')) {
    return base64Img;
  }
  return PDFImage;
}

export default function AttachmentsV2(props) {
  const { slideView, onUpload, onDelete, files, isReadOnly = false } = props;
  const classes = useStyles(props);
  const [isExpanded, setIsExpanded] = useState(false);
  const [pdf, setPDF] = useState(null);
  const [showImages, setShowImages] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [shouldTakePhoto, setShouldTakePhoto] = useState(false);
  const [activeAttachment, setActiveAttachment] = useState(null);
  const inputFile = useRef(null)

  const handleAttachFileClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
    setIsExpanded(false);
  }
  const handleFileUpload = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var [file] = event.target.files;
    onUpload(file);
  }

  const images = useMemo(() => {
    return files.filter(file => {
      return file?.filesMainRef?.indexOf('.png') !== -1 || file.filesMainRef.indexOf('.jpeg') !== -1;
    })
  }, [files])

  const renderExpandIcon = () => {
    if (slideView) {
      return (<ExpandWhiteIcon />)
    }
    return (<ExpandIcon />)
  }
  const renderCollapseIcon = () => {
    if (slideView) {
      return (<ExpandWhiteIcon />)
    }
    return (<ExpandIcon />)
  }

  const renderIcons = () => {
    return (
      <div className={clsx({ [classes.fabWrapperRelative]: slideView })}>
        {isExpanded ? (
          <>
            <div className={classes.attachIcon}>
              <IconButton
                onClick={handleAttachFileClick}
                className={classes.icon}
              >
                {slideView ? <AttachIcon /> : <AttachIcon />}
              </IconButton>
            </div>
            <div className={classes.cameraIcon}>
              <IconButton
                onClick={() => { setShouldTakePhoto(true) }}
                className={classes.icon}>
                {slideView ? <CameraIcon /> : <CameraIcon />}
              </IconButton>
            </div>
          </>
        ) : null}
        <IconButton
          className={clsx(classes.icon, classes.plusIcon)} onClick={() => { setIsExpanded(!isExpanded) }}>
          {isExpanded ? renderCollapseIcon() : renderExpandIcon()}
        </IconButton>
        {!isExpanded && slideView && files.length ? (
          <>
            <div className={classes.editIcon}>
              <IconButton
                onClick={handleAttachFileClick}
                className={classes.icon}
              >
                <EditImageIcon />
              </IconButton>
            </div>
            <div className={classes.deleteFileSlideIcon}>
              <IconButton
                onClick={handleDeleteClick}
                className={classes.icon}
              >
                <DeleteAttachmentIcon />
              </IconButton>
            </div>
          </>
        ) : null}
      </div>
    );
  }

  const handlePhotoClick = (dataUri) => {
    const fileName = new Date().getTime() + '.png';
    fetch(dataUri).then(res => res.blob())
      .then(blob => {
        const file = new File([blob], fileName, { type: "image/png" })
        onUpload(file, dataUri)
      })
    handlePhotoClickClose();
  }

  const handlePhotoClickClose = () => {
    setShouldTakePhoto(false);
    setIsExpanded(false);
  }
  const handleClick = useCallback((file, index) => {
    if (file.filesMainRef.indexOf('.png') !== -1 || file.filesMainRef.indexOf('.jpeg') !== -1) {
      setPhotoIndex(index);
      setShowImages(true);
      return;
    }
    else if (file.filesMainRef.indexOf('.pdf') !== -1) {
      setPDF(file)
    }
  }, [])
  const handleCorouselStatusChange = useCallback((activeItem) => {
    if (activeItem - 1 !== activeAttachment)
      setActiveAttachment(activeItem - 1);
  }, [activeAttachment])

  const handleDeleteClick = useCallback(() => {
    if (files.length) {
      onDelete(files[activeAttachment].filesIndividualRef);
    }
  }, [activeAttachment, files, onDelete])
  const renderSlideView = () => {
    return (
      <div className={classes.slideContainer}>
        <Carousel className={classes.carousel}
          statusFormatter={handleCorouselStatusChange}
          showThumbs={false}
          renderIndicator={(onClickHandler, isSelected, index, label) => {
            if (isSelected) {
              return (
                <li
                  style={{ ...indicatorStyles, background: '#0073E6' }}
                  aria-label={`Selected: ${label} ${index + 1}`}
                  title={`Selected: ${label} ${index + 1}`}
                />
              );
            }
            return (
              <li
                style={indicatorStyles}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                title={`${label} ${index + 1}`}
                aria-label={`${label} ${index + 1}`}
              />
            );
          }}>
          {files.map((f, index) => (
            <div
              key={`${f.name}-${f.type}`}
              className={classes.slide}
              onClick={() => handleClick(f, index)}
            >
              <AttachmentContent
                className={classes.imgSlider}
                value={f}
              />
            </div>
          ))}
        </Carousel>
        {!files.length ? (
          <span className={classes.noFileTextSlider}>
            <NoImageIcon />
            <p className={classes.noImageText}>{`No Attachment.${isReadOnly ? '' : ' Press ‘+’ Add'}`}</p>
          </span>
        ) : null
        }

        {/* <ExpandWhiteIcon /> */}
      </div >
    )
  }
  const renderGridView = () => {
    return (
      <>
        <div
          className={classnames(
            classes.fieldsetWrapper,
            classes.extraSpacing
          )}
        >
          <Grid container spacing={3}>
            {files.map((f, ind) => (
              <Grid item xs={6} onClick={() => handleClick(f, ind)} key={`${f.filesIndividualRef}`}>
                <DocumentThumbnail {...f} />
              </Grid>
            ))}

          </Grid>
        </div>
        <div>
          {!files.length ? (
            <div className={classes.noFileText}>No files uploaded yet</div>
          ) : null}
        </div>
      </>
    )
  }
  return (
    <>
      <div className={clsx({
        [classes.slideWrapper]: slideView,
        [classes.withAttachment]: files.length
      })}>
        {slideView ? renderSlideView() : renderGridView()}

        <input
          type='file'
          id='addAttachmentWorkflow'
          // accept="image/png, image/gif, image/jpeg,
          //     application/pdf,application/msword,
          //     application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          accept="image/png, image/jpeg,
                            application/pdf"
          ref={inputFile}
          style={{ display: 'none' }}
          onClick={(event) => {
            event.target.value = null
          }}
          onInput={handleFileUpload}
        />
        {!isReadOnly ? renderIcons() : null}


      </div>

      {shouldTakePhoto && (
        <FullScreenDialog
          modalTitle='Take Photo'
          open
          modalContent={
            <CapturePhoto
              onPhotoClick={handlePhotoClick}
            />
          }
          onClose={handlePhotoClickClose}
        />
      )}
      {showImages && (
        <ImagePreview
          currentFile={images[photoIndex]}
          nextFile={images[(photoIndex + 1) % images.length]}
          prevFile={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setShowImages(false)}
          onMovePrevRequest={() => {
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }}
          onMoveNextRequest={() => {
            setPhotoIndex((photoIndex + 1) % images.length)
          }}
        />
      )}

      {pdf && (
        <FullScreenDialog
          modalTitle={pdf.name}
          open
          modalContent={
            <Document file={pdf.base64Data}>
              <Page pageNumber={1} />
            </Document>
          }
          onClose={() => { setPDF(undefined) }}
        />
      )}
    </>
  );
}


const emptyObj = {};
export function AttachmentContent({ className, value = emptyObj }) {
  const classes = useStyles();
  const { filesIndividualRef, filesMainRef, relativePath } = value;
  const dispatch = useDispatch();
  const imgObj = useSelector(state => {
    return selectors.assets(state, {
      fileId: filesIndividualRef,
      relativePath: relativePath
    })
  })

  const byte64Url = useMemo(() => {
    if (filesMainRef?.indexOf('.png') !== -1 || filesMainRef.indexOf('.jpeg') !== -1) {
      if (imgObj?.byteArr) {
        var binary = '';
        var bytes = new Uint8Array(imgObj.byteArr);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        var payloadData = 'data:image/jpeg;base64,' + window.btoa(binary);
        return payloadData;
      }
    }
    else {
      return PDFImage;
    }
  }, [filesMainRef, imgObj.byteArr])

  useEffect(() => {
    if (imgObj && !('status' in imgObj)) {
      dispatch(actions.assets.request({ fileId: filesIndividualRef, relativePath }))
    }
  }, [dispatch, filesIndividualRef, imgObj, relativePath])

  return (
    <div className={className} style={{ backgroundImage: `url(${byte64Url})` }}>
      {imgObj?.status === 'requested' ? (
        <Spinner type="beat" speed={0.5} className={classes.spinner} size={50} />
      ) : null}
    </div>
  )
}

function ImagePreview({ currentFile, nextFile, prevFile, ...others }) {
  const currImgObj = useSelector(state => {
    return selectors.assets(state, {
      fileId: currentFile.filesIndividualRef,
      relativePath: currentFile.relativePath
    })
  })
  const nextImgObj = useSelector(state => {
    return selectors.assets(state, {
      fileId: nextFile.filesIndividualRef,
      relativePath: nextFile.relativePath
    })
  })
  const prevImgObj = useSelector(state => {
    return selectors.assets(state, {
      fileId: prevFile.filesIndividualRef,
      relativePath: prevFile.relativePath
    })
  })

  const currbyte64Url = useMemo(() => {
    if (currImgObj?.byteArr) {
      var binary = '';
      var bytes = new Uint8Array(currImgObj.byteArr);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      var payloadData = 'data:image/jpeg;base64,' + window.btoa(binary);
      return payloadData;
    }
  }, [currImgObj.byteArr])

  const nextbyte64Url = useMemo(() => {
    if (nextImgObj?.byteArr) {
      var binary = '';
      var bytes = new Uint8Array(nextImgObj.byteArr);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      var payloadData = 'data:image/jpeg;base64,' + window.btoa(binary);
      return payloadData;
    }
  }, [nextImgObj.byteArr])

  const prevbyte64Url = useMemo(() => {
    if (prevImgObj?.byteArr) {
      var binary = '';
      var bytes = new Uint8Array(prevImgObj.byteArr);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      var payloadData = 'data:image/jpeg;base64,' + window.btoa(binary);
      return payloadData;
    }
  }, [prevImgObj.byteArr])

  return (
    <Lightbox
      mainSrc={currbyte64Url}
      nextSrc={nextbyte64Url}
      prevSrc={prevbyte64Url}
      {...others}
    />
  )
}