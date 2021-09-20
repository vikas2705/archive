import React from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from 'clsx';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import FormLabel from "../Form/FormLabel";
import FormBoxControl from "../Form/FormBoxControl";

const useStyles = makeStyles({
  formGroup: {
    '& > div:first-child > div:first-child': {
      display: "flex",
      flexDirection: "row",
    },
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row",
  },
  radioLabel: {
    fontSize: 13,
    color: "#979DAC",
    fontWeight: '500',
    lineHeight: '19px',
    // fontFamily: 'Heebo',
  },
  selected: {
    color: "#33415C !important",
  },
});
export default function EAMRadioButtonGroup({ title, id, options = [], value, onFieldChange, onChangeResetFieldId =[], resetFieldValue = '' }) {
  const classes = useStyles();
  const handleChange = (event) => {
    const newValue = event.target.value;
    if (value !== newValue) {
      onChangeResetFieldId.forEach(fieldId => {
        onFieldChange(fieldId, resetFieldValue)
      })
    }
    onFieldChange(id, newValue)
  }
  return (
    <FormBoxControl
      hideBorder
      className={classes.wrapper}
    >
      <FormLabel>{title}</FormLabel>
      <RadioGroup
        className={classes.radioGroup}
        aria-label={id}
        name={id}
        value={value}
        onChange={handleChange}>
        {options.map(opt => (
          <FormControlLabel
            classes={{
              label: clsx(classes.radioLabel, {
                [classes.selected]: opt.value === value
              })
            }}
            key={opt.value}
            value={opt.value}
            control={<Radio color="primary" />}
            label={opt.label} />
        ))}
      </RadioGroup>
    </FormBoxControl>
  );
}