
import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import EAMText from "../EAMText";
import IconButton from "../IconButton";
import UnMuteIcon from "../../assets/Icons/UnMuteIcon";
import MuteIcon from "../../assets/Icons/MuteIcon";

const useStyles = makeStyles({
  mic: {
    position: "relative",
    bottom: 39,
    right: 22,
    color: "#5C677D",
    float: 'right',
  },
  textField: {
    height: 'auto !important',
    '& > div': {
      padding: '0px !important',
    }
  }
});
export default function EAMTextarea(props) {
  const { id, value = "", onFieldChange } = props;
  const classes = useStyles();
  const {
    transcript,
    // listening,
    resetTranscript,
    // browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const triggerListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  const startListening = () => {
    resetTranscript();
    setIsListening(true);
    triggerListening();
  };
  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    onFieldChange(id, `${value} ${transcript}`);
  };
  return (
    <div>
      <EAMText
        {...props}
        multiline
        rows={4}
        variant='outlined'
        className={classes.textField}
      />
      {isListening ? (
        <IconButton
        className={classes.mic}
        onClick={stopListening}
        >
          <UnMuteIcon/>
        </IconButton>
      ): (
        <IconButton
        className={classes.mic}
        onClick={startListening}
        >
          <MuteIcon/>
        </IconButton>
      )}
    </div>
  );
}
