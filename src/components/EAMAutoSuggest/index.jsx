import React, {useState} from 'react';
import { makeStyles } from "@material-ui/styles";
import Autosuggest from 'react-autosuggest';

const languages = [
    {
      name: 'C',
      year: 1972
    },
    {
      name: 'Elm',
      year: 2012
    },
];
const useStyles = makeStyles({
    fieldsetWrapper: {
        width: "130px",
        minWidth: "130px",
        padding: 5,
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
            fontSize: 13,
        },
        "&.date-picker .x-textfield .x-input-el": {
            padding: "6px 0px 8px 4px",
            fontSize: 13,
        },
        "& .x-textfield .x-body-wrap-el": {
            width: "150px",
        },
    },
    fieldsetContainer: {
        width: "95%",
        height: "50px",
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
});

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : languages.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};
const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
);
  
  export default function EAMAutoSuggest(props) {
    const {id, title, onFieldChange = () => {}} = props;
    const classes = useStyles();
    const [state, setState] = useState({
        value: props.value,
        suggestions: []
    })
    const {value, suggestions} = state;

    const onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: getSuggestions(value)
        });
      };

    const onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      };

    const handleChange = (event) => {
        onFieldChange(id, event.target.value)
    };
    const onChange = (event, { newValue }) => {
        setState({
          ...state,
          value: newValue,
        });
      };
    return (
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={{
                placeholder: 'Type a programming language',
                value,
                onChange: onChange
              }}
            />
    );
}
