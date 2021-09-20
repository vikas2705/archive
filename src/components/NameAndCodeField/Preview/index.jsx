import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
import { useEffect } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import actions from "../../../actions";
import PhoneIcon from "../../../assets/Icons/PhoneIcon";
import { selectors } from "../../../reducers";
import locationImg from '../../../assets/img/location.png'
import equipmentImg from '../../../assets/img/equipment.jpg'
import { useMemo } from "react";

const useStyles = makeStyles({
  previewWrapper: {
    display: "flex",
    background: "#EDF6FF",
    padding: 20,
  },
  img: {
    width: "149px",
    height: "155px",
    border: "1px solid #C9CDD6",
    boxSizing: "border-box",
    borderRadius: "4px",
  },
  marginLeft: {
    marginLeft: 10,
  },
  previewline1: {
    fontWeight: 700,
    color: "#33415C",
    fontSize: 13,
    lineHeight: "19px",
  },
  previewline2: {
    fontWeight: 500,
    color: "#5C677D",
    lineHeight: "19px",
    fontSize: 13,
  },
  previewline3: {
    fontWeight: 400,
    lineHeight: "19px",
    color: "#5C677D",
    fontSize: 13,
  },
  previewline4: {
    fontWeight: 400,
    lineHeight: "19px",
    color: "#979DAC",
    fontSize: 12,
  },
  phone: {},
  noPadding: {
    paddingTop: 0,
  },
  fieldsetWrapper: {
    // padding: "12px 12px 3px 12px",
    // "& .x-button.x-has-text .x-inner-el": {
    //     padding: "3px 12px",
    // },
    // "& .x-button.x-has-text .x-text-el": {
    //     color: "#ffffff",
    //     textTransform: "capitalize",
    // },
  },
  arrowUp: {
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '10px solid #EDF6FF',
    marginLeft: 30,
  }
})

export default function NameAndCodePreview({ type, value }) {
  const relativePath = 'photos';
  const dispatch = useDispatch();
  const classes = useStyles();
  const { EqpLocDesc, EqpLocCode, ParentCode, ParentDesc, WorkGroupTeamLeadContactNo, eqpLocDefaultImage,
  } = useSelector(state => selectors.equipmentLocationDetail(state, value, type === 'equipment' ? 'E' : 'L'), shallowEqual);

  const imgObj = useSelector(state => {
    if (!eqpLocDefaultImage || type !== 'equipment') {
      return;
    }
    return selectors.assets(state, {
      fileId: eqpLocDefaultImage,
      relativePath: relativePath
    })
  })
  const byte64Url = useMemo(() => {
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
  }, [imgObj?.byteArr])
  useEffect(() => {
    if (value && !EqpLocCode) {
      dispatch(actions.equipmentLocations.request({
        eqpOrLoc: type === 'equipment' ? 'E' : 'L',
        eqpLocCode: value,
      }))
    }
  }, [EqpLocCode, dispatch, type, value])

  useEffect(() => {
    if (imgObj && !('status' in imgObj)) {
      dispatch(actions.assets.request({ fileId: eqpLocDefaultImage, relativePath }))
    }
  }, [dispatch, eqpLocDefaultImage, imgObj, type])
  const renderImage = () => {
    if (type === 'equipment' && eqpLocDefaultImage) {
      return (
        <img
          className={classes.img}
          src={byte64Url}
          alt=''
        />
      )
    }
    return (
      <img
        className={classes.img}
        src={type === 'equipment' ? equipmentImg : locationImg}
        alt=''
      />
    )
  }
  if (!EqpLocCode) {
    return null;
  }
  return (
    <div
      className={classNames(
        classes.noPadding,
        classes.fieldsetWrapper
      )}
    >
      <div className={classes.arrowUp}></div>
      <div className={classes.previewWrapper}>
        {renderImage()}
        <div className={classes.marginLeft}>
          <div className={classes.previewline1}>{type === 'equipment' ? 'Equipment' : 'Location'}</div>
          <div className={classes.previewline2}>{EqpLocDesc}</div>
          <div className={classes.previewline3}>{EqpLocCode}</div>
          {ParentCode ? (
            <div>
              <div>
                <i class='fa fa-arrow-down' aria-hidden='true'></i>
              </div>
              <div className={classes.previewline4}>
                Parent Name & Code
                            </div>
              <div className={classes.previewline3}>
                {ParentDesc} ({ParentCode})
                            </div>
            </div>
          ) : null}

        </div>
        {WorkGroupTeamLeadContactNo ? (
          <span className={classes.phone}>
            <a href={`tel:${WorkGroupTeamLeadContactNo}`}>
              <PhoneIcon />
            </a>
          </span>
        ) : null}

      </div>
    </div>
  )
}