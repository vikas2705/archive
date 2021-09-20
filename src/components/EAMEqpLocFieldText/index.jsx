import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../reducers';
import EAMText from '../EAMText';


const defaultValue = '-----';
export default function EAMEqpLocFieldText(props) {
  const { title, labelName, valueName, eqpLocCode, eqpLocFlag } = props;
  const value = useSelector(state => {
    if (!eqpLocCode) {
      return defaultValue;
    }
    const equipmentLocationsByCode = selectors.equipmentLocationsByCode(state, eqpLocCode, eqpLocFlag);
    const obj = equipmentLocationsByCode?.find(i => i.EqpLocCode === eqpLocCode);
    if (!obj?.[labelName]) {
      return defaultValue;
    }
    return `${obj[labelName] || ''} ${obj[valueName] ? `(${obj[valueName]})`: ''}`;
  })

  return (
    <EAMText
      id=""
      title={title}
      isReadOnly
      value={value}
    />
  )
}
