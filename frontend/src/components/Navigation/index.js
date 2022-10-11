// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormPage/SignUpModal";
// import "./Navigation.css";
import styles from "./Navigation.module.css";
import worldLogo from "./worldLogo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className={styles.container}>
      <div id="navigation-two">
        <NavLink exact to="/">
          <img src={worldLogo} />
        </NavLink>
      </div>
      <div id="navigation-three">{isLoaded && sessionLinks}</div>
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
