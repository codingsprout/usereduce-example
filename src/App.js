//import { useState } from 'react'
import { useReducer } from 'react';
import { login } from './auth';
import './app.css';

const appReducer = (state, action) => {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    case 'login': {
      return {
        ...state,
        isLoading: true, //these two were grabbed, refactored
        error: '', //from below after preventDefault()
      };
    }
    case 'success': {
      return {
        ...state,
        isLogged: true,
      };
    }

    case 'error': {
      return {
        ...state,
        error: 'Incorrect username or password',
        loading: 'false',
        username: '',
        password: '',
      };
    }

    case 'logout': {
      return {
        ...state,
        isLogged: false,
        username: '',
        password: '',
      };
    }
    default:
      break;
  }

  return state;
};

const initialState = {
  username: '',
  password: '',
  isLoading: false,
  error: '',
  isLogged: false,
};

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // const [username, setUserName] = useState('');
  // const [password, setPassword] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState('');
  // const [isLogged, setIsLogged] = useState(false);

  // the above turns into below
  const { username, password, isLoading, error, isLogged } = state;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // setError('');
    // setIsLoading(!isLoading);

    dispatch({ type: 'login' }); //replaced above two states

    try {
      console.log({ username, password });
      await login({ username, password });
      //  setIsLogged(!isLogged);

      dispatch({ type: 'success' });
    } catch (err) {
      // setError('Incorrect username or password');
      // setIsLoading(isLoading);
      // setUserName('');
      // setPassword('');

      dispatch({ type: 'error' });
    }
  };

  return (
    <div className='App'>
      <div className='login-container'>
        {isLogged ? (
          <>
            <h1>{username} has logged in</h1>
            {/* <button onClick={() => setIsLogged(!isLogged)}>Log Out</button> */}
            <button onClick={() => dispatch({ type: 'logout' })}>
              Log Out
            </button>
          </>
        ) : (
          <form onSubmit={onSubmitHandler} className='form'>
            {error && <p className='error'>{error}</p>}
            <p>Please Login</p>
            <input
              type='text'
              placeholder='username'
              value={username}
              // onChange={(e) => setUserName(e.target.value)}
              onChange={(e) =>
                dispatch({
                  type: 'field',
                  field: 'username',
                  value: e.target.value,
                })
              }
            />
            <input
              type='password'
              placeholder='password'
              autoComplete='new-password'
              value={password}
              // onChange={(e) => setPassword(e.target.value)}
              onChange={(e) =>
                dispatch({
                  type: 'field',
                  field: 'password',
                  value: e.target.value,
                })
              }
            />
            <button className='submit' type='submit' disabled={isLoading}>
              {isLoading ? 'Loading, please wait' : 'Log In'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
