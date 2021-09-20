import { makeStyles } from "@material-ui/styles";
import React, { useCallback } from "react";
import PropTypes from 'prop-types';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import classnames from "classnames";
import FormBoxControl from "../Form/FormBoxControl";

const useStyles = makeStyles({
  lessPaddingTop: {
    padding: "10px 12px 0px 12px",
  },
  fieldName: {
    fontSize: "12px",
    color: "#979DAC",
  },
  select: {
    '&:after': {
      borderBottom: '0px !important',
    }
  },
  fieldValue: {
    fontSize: "13px",
  },

  marginLeft: {
    marginLeft: 10,
  },
  formControl: {
    margin: 5,
    width: "100%",
    '& > div:first-child': {
      '& > div:first-child': {
        // whiteSpace: 'pre-wrap'
      }
    }
  },
});

const emptySet = [];
export default function EAMSelect({ id, title, value, shouldFormat, labelField, valueField, options = emptySet, onFieldChange, lessPaddingTop }) {
  const classes = useStyles();
  const handleChange = useCallback(event => {
    const { value } = event.target;
    if (typeof id === 'object') {
      const selectedItem = options.find(opt => opt[valueField] === value);
      onFieldChange(id.value, value)
      onFieldChange(id.label, selectedItem[labelField])
      return;
    }
    onFieldChange(id, value)
  }, [id, labelField, onFieldChange, options, valueField]);

  const renderValue = useCallback(() => {
    if (!value) {
      return 'Please Select';
    }
    const selectedItem = options.find(opt => opt[valueField]?.toLowerCase() === value.toLowerCase());
    if (!selectedItem) {
      return value;
    }
    if (!shouldFormat) {
      return selectedItem[labelField];
    } else {
      return `${selectedItem[labelField]} (${selectedItem[valueField]})`;
    }


  }, [labelField, options, shouldFormat, value, valueField])
  return (
    <>
      <FormBoxControl
        className={classnames({ [classes.lessPaddingTop]: lessPaddingTop, })}
        title={title}
      >
        <FormControl className={classes.formControl}>
          <Select
            id={id}
            value={value}
            onChange={handleChange}
            displayEmpty
            className={classes.select}
            native={false}
            renderValue={renderValue}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value='' disabled>
              Select option
                            </MenuItem>
            {options.map(opt => (
              <MenuItem key={opt[valueField]} value={opt[valueField]}>{opt[labelField]}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormBoxControl>
    </>
  );
}

EAMSelect.propTypes = {
  // id: PropTypes.isRequired,
  title: PropTypes.string,
  value: PropTypes.string,
  labelField: PropTypes.string.isRequired,
  valueField: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onFieldChange: PropTypes.func.isRequired,
};

EAMSelect.defaultProps = {
  labelField: 'label',
  valueField: 'value',
  value: ''
};
