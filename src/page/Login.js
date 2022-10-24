import React, { useContext } from 'react';
import myContext from '../context/myContext';

function Login() {
  const { email, password, setEmail, setPassword } = useContext(myContext);

  const handleButton = () => {
    const regexEmail = /\S+[@]\w+[.]\w+/gm;
    const lengthPassword = 6;
    return !(regexEmail.test(email) && password.length > lengthPassword);
  };

  const handleClick = () => {
    const user = {
      email,
    };

    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <form>
      <label htmlFor="email-input">
        <input
          type="email"
          data-testid="email-input"
          id="email-input"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password-input">
        <input
          type="password"
          data-testid="password-input"
          id="password-input"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ handleButton() }
        onClick={ handleClick }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
