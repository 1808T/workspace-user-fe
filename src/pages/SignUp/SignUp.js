import { useEffect, useMemo, useState } from 'react';
import classes from './SignUp.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faGithub,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { signUp } from '../../store/actions/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignUp() {
  const USERNAME_REGEX = useMemo(() => {
    return /^[a-zA-Z0-9]{3,32}$/;
  }, []);

  const EMAIL_REGEX = useMemo(() => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  }, []);

  const PASSWORD_REGEX = useMemo(() => {
    return /^[a-zA-Z0-9]{6,32}$/;
  }, []);

  const FULLNAME_REGEX = useMemo(() => {
    return /^[a-zA-Z0-9]{3,32}$/;
  }, []);

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [repeatPassword, setRepeatPassword] = useState('');
  const [validRepeatPassword, setValidRepeatPassword] = useState(false);
  const [repeatPasswordFocus, setRepeatPasswordFocus] = useState(false);

  const [fullName, setFullName] = useState('');
  const [validFullName, setValidFullName] = useState(false);
  const [fullNameFocus, setFullNameFocus] = useState(false);

  const [checkbox, setCheckbox] = useState(false);
  const navigate = useNavigate();

  const checkboxChangeHandler = (e) => {
    setCheckbox(e.target.checked);
  };

  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    setValidUsername(result);
  }, [USERNAME_REGEX, username]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [EMAIL_REGEX, email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const isMatch = password === repeatPassword;
    setValidRepeatPassword(isMatch);
  }, [PASSWORD_REGEX, password, repeatPassword]);

  useEffect(() => {
    const result = FULLNAME_REGEX.test(fullName);
    setValidFullName(result);
  }, [FULLNAME_REGEX, fullName]);

  const signUpHandler = (e) => {
    e.preventDefault();
    const payload = { username, email, password, repeatPassword, fullName };
    signUp(payload, navigate, toast);
  };

  return (
    <div className={classes.container}>
      <div className={classes['background-container']}>
        <div className={classes['background']}></div>
      </div>
      <div className={classes['form-container']}>
        <form onSubmit={signUpHandler} className={classes.form}>
          <h1 className={classes['form--title']}>SIGN UP</h1>
          <div className={classes['form--brands']}>
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
          <div className={classes['form--group']}>
            <label htmlFor="username">
              <span
                className={
                  validUsername ? classes['valid'] : classes['offscreen']
                }>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validUsername || !username
                    ? classes['offscreen']
                    : classes['invalid']
                }>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
              autoComplete="off"
              aria-invalid={validUsername ? 'false' : 'true'}
              aria-describedby="username-note"
              onFocus={() => setUsernameFocus(true)}
              onBlur={() => setUsernameFocus(false)}
            />
            <p
              id="username-note"
              className={
                usernameFocus && username && !validUsername
                  ? classes['instruction']
                  : classes['offscreen']
              }>
              <FontAwesomeIcon icon={faInfoCircle} />
              From <strong>3 to 32 characters</strong>.
              <br />
              Must begin with a letter or a number.
              <br />
              Only letters & numbers are allowed.
            </p>
          </div>
          <div className={classes['form--group']}>
            <label htmlFor="email">
              <span
                className={
                  validEmail ? classes['valid'] : classes['offscreen']
                }>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validEmail || !email
                    ? classes['offscreen']
                    : classes['invalid']
                }>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby="email-note"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id="email-note"
              className={
                emailFocus && email && !validEmail
                  ? classes['instruction']
                  : classes['offscreen']
              }>
              <FontAwesomeIcon icon={faInfoCircle} />
              Please enter a valid email.
            </p>
          </div>
          <div className={classes['form--group']}>
            <label htmlFor="password">
              <span
                className={
                  validPassword ? classes['valid'] : classes['offscreen']
                }>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validPassword || !password
                    ? classes['offscreen']
                    : classes['invalid']
                }>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby="password-note"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p
              id="password-note"
              className={
                passwordFocus && password && !validPassword
                  ? classes['instruction']
                  : classes['offscreen']
              }>
              <FontAwesomeIcon icon={faInfoCircle} />
              Password must be at least 6 characters long.
            </p>
          </div>
          <div className={classes['form--group']}>
            <label htmlFor="repeatPassword">
              <span
                className={
                  validRepeatPassword && repeatPassword !== ''
                    ? classes['valid']
                    : classes['offscreen']
                }>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validRepeatPassword || !repeatPassword
                    ? classes['offscreen']
                    : classes['invalid']
                }>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Re-enter your password"
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
              required
              autoComplete="off"
              aria-invalid={validRepeatPassword ? 'false' : 'true'}
              aria-describedby="repeat-password-note"
              onFocus={() => setRepeatPasswordFocus(true)}
              onBlur={() => setRepeatPasswordFocus(false)}
            />
            <p
              id="repeat-password-note"
              className={
                repeatPasswordFocus && repeatPassword && !validRepeatPassword
                  ? classes['instruction']
                  : classes['offscreen']
              }>
              <FontAwesomeIcon icon={faInfoCircle} />
              Passwords do not match. Please re-enter.
            </p>
          </div>
          <div className={classes['form--group']}>
            <label htmlFor="password">
              <span
                className={
                  validFullName ? classes['valid'] : classes['offscreen']
                }>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validFullName || !fullName
                    ? classes['offscreen']
                    : classes['invalid']
                }>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="off"
              aria-invalid={validUsername ? 'false' : 'true'}
              aria-describedby="full-name-note"
              onFocus={() => setFullNameFocus(true)}
              onBlur={() => setFullNameFocus(false)}
            />
            <p
              id="full-name-note"
              className={
                fullNameFocus && fullName && !validFullName
                  ? classes['instruction']
                  : classes['offscreen']
              }>
              <FontAwesomeIcon icon={faInfoCircle} />
              From <strong>3 to 32 characters</strong>.
              <br />
              Must begin with a letter or a number.
            </p>
          </div>
          <div className={classes['form--group']}>
            <input
              type="checkbox"
              id="term-of-use"
              className={classes['form--checkbox']}
              value={checkbox}
              onChange={checkboxChangeHandler}
            />
            <label htmlFor="term-of-use">
              I have read and agree to the terms of service.
            </label>
          </div>
          <button
            type="submit"
            className={classes['form--btn']}
            disabled={
              !checkbox ||
              validUsername === false ||
              validEmail === false ||
              validPassword === false ||
              validRepeatPassword === false ||
              validFullName === false
            }>
            Sign Up
          </button>
          <p>
            Already have account?
            <button
              type="button"
              className={classes['form--link']}
              onClick={() => {
                navigate('/sign-in');
              }}>
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
