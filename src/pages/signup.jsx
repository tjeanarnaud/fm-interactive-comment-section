import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'

import './signup.css'
import styles from '../styles/form.module.css'

const SignUp = () => {
  const navigate = useNavigate()

  const usernameRef = useRef(null)
  const pictureRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  const signUpHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          // Signed in
          return updateProfileHandler(
            usernameRef.current.value,
            pictureRef.current.value
          )
        })
        .catch((error) => {
          // const errorCode = error.code
          // const errorMessage = error.message
          console.error(error)
        })
    } else {
      alert(`Password doesn't match!`)
    }
  }

  const updateProfileHandler = (username, picture) => {
    return updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: picture,
    })
      .then(() => {
        // Profile updated!
        alert('Profile created!')
        navigate('/', { replace: true })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="signup">
      <div className="signup__box">
        <form
          onSubmit={signUpHandler}
          className={styles.form}
          action="#"
          method="POST"
        >
          <h2 className={styles.form__title}>Sign up for an account</h2>

          <div>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <div className={styles.field}>
              <input
                id="name"
                type="text"
                ref={usernameRef}
                autoComplete="name"
                placeholder="John Doe"
                className={styles.field__input}
              />
            </div>
          </div>

          <div>
            <label htmlFor="picture" className={styles.label}>
              Picture URL
            </label>
            <div className={styles.field}>
              <input
                id="picture"
                type="text"
                ref={pictureRef}
                autoComplete="picture"
                placeholder="https://example.com/user/profile.jpg"
                className={styles.field__input}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className={styles.label}>
              Email address
            </label>
            <div className={styles.field}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                ref={emailRef}
                required
                className={styles.field__input}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className={styles.label}>
              Create password
            </label>
            <div className={styles.field}>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                ref={passwordRef}
                required
                className={styles.field__input}
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className={styles.label}>
              Confirm password
            </label>
            <div className={styles.field}>
              <input
                id="confirm-password"
                type="password"
                ref={confirmPasswordRef}
                required
                className={styles.field__input}
              />
            </div>
          </div>

          <div>
            <button type="submit" className={styles.button + ' btn btn--blue'}>
              Sign up
            </button>
          </div>

          <p className={styles.form__text}>
            Have an account?{' '}
            <Link className={styles.form__textLink} to="/signin">
              Sign in
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

export default SignUp
