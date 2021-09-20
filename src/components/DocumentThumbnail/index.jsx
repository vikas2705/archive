import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../actions";
import PDFImage from "../../assets/img/pdf.png"
import { selectors } from "../../reducers";
import Spinner from "../Spinner";

const useStyles = makeStyles({
  fieldsetWrapper: {
    "& .x-button.x-has-text .x-inner-el": {
      padding: "3px 12px",
    },
    "& .x-button.x-has-text .x-text-el": {
      color: "#ffffff",
      textTransform: "capitalize",
    },
  },
  thumbnailImg: {
    borderRadius: "4px",
    width: 140,
    height: 140,
  },
  spinnerWrapper: {
    width: 140,
    height: 140,
    border: '1px solid #7d7d7d33',
    display:'flex',
    '& > span': {
      margin: 'auto',
    }
  },
  fieldsetContainer: {
    width: "100%",
    height: "65px",
    border: "1px solid #E9EBEF",
    color: "#979DAC",
    display: "inline-block",
    borderRadius: "4px",
    fontSize: "12px",
    "& .x-textfield .x-underline-el": {
      height: "0px",
    },
    "& .x-textfield.x-invalid .x-underline-el:after": {
      height: "0px",
    },
    "& .x-body-wrap-el .x-trigger .x-icon-el:before": {
      fontSize: "22px",
    },
    "& .x-textfield .x-input-el": {
      padding: "4px 0px 0px 4px",
    },
    "&.date-picker .x-textfield .x-input-el": {
      padding: "6px 0px 8px 4px",
    },
    "& .x-textfield .x-body-wrap-el": {
      width: "150px",
    },
  },
  fieldName: {
    fontSize: "12px",
    color: "#979DAC",
  },
  fieldValue: {
    fontSize: "13px",
  },

  marginLeft: {
    marginLeft: 10,
  },
  subText: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 13,
    color: "#979DAC",
    paddingRight: 12,
  },
  subTextName: {
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 13,
    '& >span':{
      fontSize: 18,
    }
  },
});
export default function DocumentThumbnail(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { showDelete = true, filesMainRef = "", filesIndividualRef, relativePath } = props;

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
    else if (filesMainRef?.indexOf('.pdf') !== -1) {
      return PDFImage;
    }
  }, [filesMainRef, imgObj.byteArr])

  const isDeleteVisible = showDelete && byte64Url;
  useEffect(() => {
    if (imgObj && !('status' in imgObj)) {
      dispatch(actions.assets.request({ fileId: filesIndividualRef, relativePath }))
    }
  }, [dispatch, filesIndividualRef, imgObj, relativePath])


  return (
    <>
      <div className={classes.fieldsetWrapper}>
        <div>
          {byte64Url ?
            <img
              className={classes.thumbnailImg}
              src={byte64Url}
              alt=''
            />
            :
            <div className={classes.spinnerWrapper}>
                <Spinner type="beat" speed={0.5} className={classes.spinner} size={25} />
            </div>
          }

        </div>
        {isDeleteVisible ? (
          <div className={classes.subText}>
            <Typography variant="h6" className={classes.subTextName}>
              {filesMainRef}
            </Typography>
            <span>
              <i className='fa fa-trash' aria-hidden='true'></i>
            </span>
          </div>
        ) : null}

      </div>
    </>
  );
}
