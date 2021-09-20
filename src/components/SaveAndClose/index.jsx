import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import ActionGroup from '../ActionGroup';
import { FORM_SAVE_STATUS } from '../../utils/constants';
export const CLOSE_AFTER_SAVE = true;
export default function SaveAndCloseButton({ disabled, isDirty, status, onClose, onSave}) {
  const inProgress = status === FORM_SAVE_STATUS.SAVING;

  return (
    <ActionGroup>
      <Button 
        ui='action raised' 
        enableToggle 
        disabled={disabled || !isDirty || inProgress}
        onClick={onSave}
        text={inProgress ? 'Saving...' : 'Save'} 
      />
      <Button
        variant="text"
        color="primary"
        data-test="cancel"
        disabled={inProgress}
        onClick={onClose}>
        Close
      </Button>
    </ActionGroup>
  );
}

SaveAndCloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  status: PropTypes.oneOf([undefined, 'success', 'inProgress', 'fail']),
  disabled: PropTypes.bool,
  isDirty: PropTypes.bool,
};

SaveAndCloseButton.defaultProps = {
  disabled: false,
  isDirty: false,
};

