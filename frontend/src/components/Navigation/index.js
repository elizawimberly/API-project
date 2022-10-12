// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormPage/SignUpModal";
import * as sessionActions from "../../store/session";
// import "./Navigation.css";
import styles from "./Navigation.module.css";
import worldLogo from "./worldLogo.png";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const handleDemo = (e) => {
    e.preventDefault();
    return dispatch(
      sessionActions.login({
        credential: "Demo-lition",
        password: "password",
      })
    );
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <div className={styles.button_container}>
        <LoginFormModal />
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
        <SignupFormModal />
        <button className={styles.button} onClick={handleDemo}>
          Demo User
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.container_two}>
        <NavLink exact to="/">
          <img src={worldLogo} alt="world-logo" />
        </NavLink>
      </div>
      <div className={styles.button_container}>{isLoaded && sessionLinks}</div>
    </div>
    // <ul>
    //   <li>
    //     <NavLink exact to="/">
    //       Home
    //     </NavLink>
    //     {isLoaded && sessionLinks}
    //   </li>
    // </ul>
  );
}

export default Navigation;
