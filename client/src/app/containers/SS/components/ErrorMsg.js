import React from 'react';

function ErrorMsg({ getFromErrorMsg }) {
  return (
    <div data-testid="ErrorMsg">
      <div id="error-msg-div">Only Letter and Digits Allowed</div>
      <button id="error-msg-btn" data-testid="ErrorMsgButton" type="submit" onClick={() => { getFromErrorMsg(true); }}>OK</button>
    </div>
  );
}

export default ErrorMsg;
