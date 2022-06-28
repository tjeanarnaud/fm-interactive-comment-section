import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'

import './signin.css'
import styles from '../styles/form.module.css'

const SignIn = () => {
  const navigate = useNavigate()

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const signInWithGoogleHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate('/', { replace: true })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const SignInHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        navigate('/', { replace: true })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="signin">
      <div className="signin__box">
        <form
          onSubmit={SignInHandler}
          className={styles.form}
          action="#"
          method="POST"
        >
          <h2 className={styles.form__title}>Sign in to your account</h2>
          <div>
            <label htmlFor="email" className={styles.label}>
              Email address
            </label>
            <div className={styles.field}>
              <input
                id="email"
                name="email"
                type="email"
                ref={emailRef}
                autoComplete="email"
                required
                className={styles.field__input}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="form__label">
              Password
            </label>
            <div className={styles.field}>
              <input
                id="password"
                name="password"
                type="password"
                ref={passwordRef}
                autoComplete="current-password"
                required
                className={styles.field__input}
              />
            </div>
          </div>

          <div className={styles.option}>
            <div className={styles.option__checkbox}>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={styles.checkbox__input}
              />
              <label htmlFor="remember-me" className={styles.checkbox__label}>
                Remember me
              </label>
            </div>

            <div className={styles.option__reset}>
              <a href="/" className={styles.reset__link}>
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" className={styles.button + ' btn btn--blue'}>
              Sign in
            </button>
          </div>

          <div className={styles.separator}>
            <div className={styles.separator__line}>
              <div className={styles.separator__border} />
            </div>
            <div className={styles.separator__text}>
              <span className={styles.separator__textContent}>
                Or continue with
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={styles.button + ' btn btn--google'}
              onClick={() => signInWithGoogleHandler()}
            >
              Sign in with Google
            </button>
          </div>

          <p className={styles.form__text}>
            No account?{' '}
            <Link className={styles.form__textLink} to="/signup">
              Sign up
            </Link>{' '}
            or return{' '}
            <Link className={styles.form__textLink} to="/">
              Home
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignIn
