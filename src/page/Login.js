import React from 'react';

function Login() {
  return (
    <div>
      <label htmlFor="email-input">
        <input type="email" data-testid="email-input" id="email-input" />
      </label>
      <label htmlFor="password-input">
        <input type="password" data-testid="password-input" id="password-input" />
      </label>
      <button type="button" data-testid="login-submit-btn">Enter</button>
    </div>
  );
}

export default Login;
