import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@lib/firebase';
import React, { useState } from 'react'
import styles from './styles.module.scss'

export function SignUpForm({handleGoogleSignIn, toggleProcess}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  console.log(email, password);
  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value);
  };

  const handleSocialSignIn = (event) => {
    event.preventDefault();
    handleGoogleSignIn()
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  const { email, password } = event.target.elements;
  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then(( userCredential) => {
    console.log('user created');
    console.log(userCredential)

  })
  .catch((error) => {
    alert(error.message)
    console.error(error)
    }); 
    console.log(email.value);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h4>Login</h4>
        <div className={styles.card}>
          <div className={styles.form_collection}>
            <label className={styles.form_label}>
              Email
            </label>
            <input type='email' name='email' onChange={(event) => handleChangeEmail(event)} className={styles.form_input}/>
          </div>

          <div className={styles.form_collection}>
            <label className={styles.form_label}>
              password
            </label>
            <input type='password' name='password' onChange={(event) => handleChangePassword(event)} className={styles.form_input}/>
          </div>
          <button className={styles.form_submit} disabled={email =="" && password ==""}>Sign Up</button>
        
        
          <div className={styles.social_login}>
            <button onClick={handleSocialSignIn}>
              Google
            </button>

            <button onClick={toggleProcess}>
              Or Sign In
            </button>
          </div>
        </div>  
      </form>

      <br></br>
    </div>
  )
}

export function SignInForm({handleGoogleSignIn, toggleProcess}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  console.log(email, password);
  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value);
  };

  const handleSocialSignIn = (event) => {
    event.preventDefault();
    handleGoogleSignIn()
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then(( userCredential) => {
      const user = userCredential.user;
      console.log(user)
    })
    .catch((error) => {
      alert(error.message)
      console.error(error)
    }); 
    console.log(email.value);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
      <h4>Login</h4>
        <div className={styles.card}>
          <div className={styles.form_collection}>
            <label className={styles.form_label}>
              Email
            </label>
            <input type='email' name='email' onChange={(event) => handleChangeEmail(event)} className={styles.form_input} />
          </div>

          <div className={styles.form_collection}>
            <label className={styles.form_label}>
              password
            </label>
            <input type='password' name='password' onChange={(event) => handleChangePassword(event)} className={styles.form_input}/>
          </div>

          <div className={styles.pw_recover}>
            <h3>Forgot a password?</h3>
            <a>
              <h3>Remember?</h3>
            </a>
          </div>
          <button className={styles.form_submit} disabled={email =="" && password ==""}>Log In</button>
          <h3>Or log in with </h3>
          <hr></hr>

          <div className={styles.social_login}>
            <button onClick={handleSocialSignIn}>
              Google
            </button>
            
          
            <button onClick={toggleProcess}>
              Or Sign Up
            </button>
          </div>
        </div>
      </form>
      <br></br>
    </div>
  )
}
