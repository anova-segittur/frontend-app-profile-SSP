import React from 'react';
import PropTypes from 'prop-types';
import { Button, Label, FormGroup } from 'reactstrap';
import { injectIntl, intlShape } from 'react-intl';

import messages from './FormControls.messages';

import AsyncActionButton from './AsyncActionButton';
import VisibilitySelect from './VisibilitySelect';

function FormControls({
  formId, cancelHandler, changeHandler, visibility, saveState, intl,
}) {
  const visibilityId = `${formId}-visibility`;
  return (
    <React.Fragment>
      <FormGroup className="mb-4">
        <Label className="mb-1" size="sm" for={visibilityId}>
          {intl.formatMessage(messages['profile.formcontrols.who.can.see'])}
        </Label>
        <VisibilitySelect
          id={visibilityId}
          className="w-auto"
          type="select"
          name="visibility"
          value={visibility}
          onChange={changeHandler}
        />
      </FormGroup>
      <FormGroup>
        <AsyncActionButton
          type="submit"
          variant={saveState}
          labels={{
            default: intl.formatMessage(messages['profile.formcontrols.button.save']),
            pending: intl.formatMessage(messages['profile.formcontrols.button.saving']),
            complete: intl.formatMessage(messages['profile.formcontrols.button.saved']),
            error: intl.formatMessage(messages['profile.formcontrols.button.save.failed']),
          }}
        />
        <Button color="link" onClick={cancelHandler}>
          {intl.formatMessage(messages['profile.formcontrols.button.cancel'])}
        </Button>
      </FormGroup>
    </React.Fragment>
  );
}

export default injectIntl(FormControls);

FormControls.propTypes = {
  formId: PropTypes.string.isRequired,
  saveState: PropTypes.oneOf([null, 'pending', 'complete', 'error']),
  visibility: PropTypes.oneOf(['private', 'all_users']),
  cancelHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,

  // i18n
  intl: intlShape.isRequired,
};

FormControls.defaultProps = {
  visibility: 'private',
  saveState: null,
};