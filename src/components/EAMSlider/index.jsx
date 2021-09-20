import { withStyles } from "@material-ui/styles";
import React from "react";
import { Slider } from "@material-ui/core";
import FormBoxControl from "../Form/FormBoxControl";

// const useStyles = makeStyles({
// });

const ThumbComponent = (props)=> {
  return (
    <span {...props}>
      <span className="bar" style={{color: '#FFFFFF', fontSize: 12, fontWeight: 700,}}>
        {props['aria-valuenow']}
      </span>
    </span>
  );
}
const SliderWrapper = withStyles({
  root: {
    color: '#0073E6 !important',
    height: 6,
    padding: '15px 0',
  },
  thumb: {
    height: '28px !important',
    width: '28px !important',
    backgroundColor: '#0073E6',
    // boxShadow: iOSBoxShadow,
    marginTop: '-14px !important',
    marginLeft: '-14px !important',
    '&:focus, &:hover, &$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        // boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 12px)',
    top: -22,
    fontSize: 16,
    color: '#fb3636',
    height: 20,
    width: 20,
    '& *': {
      background: 'transparent',
      fontSize: 16,
      color: '#fb3636',
      height: 20,
      width: 20,
    },
  },
  track: {
    height: 6,
  },
  rail: {
    height: 6,
    opacity: 0.5,
    backgroundColor: '#F0F0F0',
  },
  mark: {
    backgroundColor: '#F0F0F0',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
  },
})(Slider);

function valuetext(value) {
  return `${value}%`;
}

export default function EAMSlider({ id, disabled, title, value, onFieldChange }) {
  // const classes = useStyles();
  const handleChange = (evt, newValue) => {
    onFieldChange(id, `${newValue}`)
  }
  return (
    <FormBoxControl
      title={title}
      hideBorder
    >
      <SliderWrapper
        ThumbComponent={ThumbComponent}
        key={value}
        disabled={disabled}
        defaultValue={value}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={1}
        onChangeCommitted={handleChange}
        valueLabelDisplay="auto"
      />
    </FormBoxControl>
  );
}

