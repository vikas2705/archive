// import ClipLoader from "react-spinners/ClipLoader";
import BounceLoader from 'react-spinners/BounceLoader';
import GridLoader from 'react-spinners/GridLoader';
import MoonLoader from 'react-spinners/MoonLoader';
import BeatLoader from 'react-spinners/BeatLoader';


import { css } from "@emotion/react";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  color: red

`;
const color = "#1c96e7";
export default function Spinner({ speed = 1, className, type, size = 28 }) {
  const renderSpinner = () => {
    if (type === 'grid') {
      return (<GridLoader speedMultiplier={speed} loading css={override} size={size} color={color} />);
    }
    else if (type === 'moon') {
      return (<MoonLoader speedMultiplier={speed} loading css={override} size={size} color={color} />);
    }
    else if (type === 'beat') {
      return (<BeatLoader margin={2} speedMultiplier={speed} loading css={override} size={size} color={color} />);
    }

    else (<BounceLoader speedMultiplier={speed} loading css={override} size={size} color={color} />);
  }
  return (
    <span className={className}>
      {renderSpinner()}

    </span>
  )
}
