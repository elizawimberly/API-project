import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import styles from "./SignupForm.module.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(false);

  // if (sessionUser) return <Redirect to="/" />;

  useEffect(() => {
    const errors = [];
    if (email.length < 1) errors.push("Please enter your email");
    if (!email.includes("@")) errors.push("Please enter a valid email address");
    if (username.length < 1) errors.push("Please enter a username");
    if (username.length < 5)
      errors.push("Username must be at least 5 characters long");
    if (firstName.length < 1) errors.push("Please enter your first name");
    if (lastName.length < 1) errors.push("Please enter your last name");
    if (password.length < 1) errors.push("Please enter a password");
    if (password.length < 5)
      errors.push("Please enter a password with at least 5 characters");
    if (confirmPassword.length < 1) errors.push("Please confirm your password");
    setErrors(errors);
  }, [email, username, firstName, lastName, password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus(true);

    if (errors.length) {
      return;
    }

    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  if (sessionUser) return <Redirect to="/" />;

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.welcome_container}>
        <h3>Join the World BnB Community!</h3>
      </div>
      {submitStatus && (
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )}
      {/* <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul> */}
      <label>
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          placeholder="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          placeholder="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormPage;
