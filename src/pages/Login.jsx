import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';
import { signInEmailPassword } from '../config/firebase.config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { handleGoogleAuthentication } = useContext(AuthContext);

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const user = { email, password };

      const response = await login(user);
      await signInEmailPassword(response.data.authToken);

      navigate('/');
    } catch (error) {
      console.log('Error login in', error);
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className='LoginPage'>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type='email' name='email' value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={handlePassword}
        />

        <button type='submit'>Login</button>
      </form>
      <button onClick={handleGoogleAuthentication}>Login With Google</button>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}

      <p>Don&apos;t have an account yet?</p>
      <Link to={'/signup'}> Sign Up</Link>
    </div>
  );
};

export default Login;
