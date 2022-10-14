// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(false);

  useEffect(() => {
    const errors = [];
    if (credential.length < 1)
      errors.push("Please enter your username or email");
    if (password.length < 5)
      errors.push("Please enter a password with at least 5 characters");
    setErrors(errors);
  }, [credential, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors([]);
    setSubmitStatus(true);
    if (errors.length) {
      return;
    }
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.welcome_container}>
        <h3>Welcome back</h3>
      </div>

      {submitStatus && (
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )}
      <label>
        {/* Username or Email */}
        <input
          // id={styles.input}
          placeholder="Username or Email"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        {/* Password */}
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
