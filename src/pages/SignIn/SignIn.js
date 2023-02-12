import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../store/actions/auth';
import SignInSwitch from '../../components/SignInSwitch/SignInSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faGithub,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-toastify';
import classes from './SignIn.module.scss';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const emailInputChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordInputChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const signInHandler = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    dispatch(signIn(payload, navigate, toast));
  };

  return (
    <div className={classes.background}>
      <form onSubmit={signInHandler} className={classes['form-container']}>
        <div className={classes['form-header']}>
          <h1 className={classes['form-header--title']}>SIGN IN</h1>
          <div className={classes['form-header--brands']}>
            <button type="button">
              <FontAwesomeIcon icon={faFacebook} size="xl" />
            </button>
            <button type="button">
              <FontAwesomeIcon icon={faGithub} size="xl" />
            </button>
            <button type="button">
              <FontAwesomeIcon icon={faGoogle} size="xl" />
            </button>
          </div>
        </div>
        <div className={classes['form-body']}>
          <div className={classes['form-body--group']}>
            <label htmlFor="email"></label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              autoFocus
              value={email}
              onChange={emailInputChangeHandler}
            />
          </div>
          <div className={classes['form-body--group']}>
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={passwordInputChangeHandler}
            />
          </div>
        </div>
        <div className={classes['form-footer']}>
          <div className={classes['form-footer--switch']}>
            <SignInSwitch />
          </div>
          <button type="submit" className={classes['form-footer--sign-in-btn']}>
            Sign In
          </button>
          <div>
            <span>Don't have account?</span>
            <button
              type="button"
              onClick={() => {
                navigate('/sign-up');
              }}
              className={classes['form-footer--sign-up-btn']}>
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
