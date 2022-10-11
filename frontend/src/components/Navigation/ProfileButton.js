// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { NavLink, useHistory, Link } from "react-router-dom";
import styles from "./Navigation.module.css";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <div className={styles.profile_container}>
      <button className={styles.open_button} onClick={openMenu}>
        <i className="fas fa-bars" id={styles.icon} />
        <i className="fas fa-user-circle fa-2x " id={styles.icon} />
      </button>
      {showMenu && (
        // <ul className="profile-dropdown">
        //   <li>{user.username}</li>
        //   <li>{user.email}</li>
        //   <li>
        //     <button onClick={logout}>Log Out</button>
        //   </li>
        // </ul>
        <div className={styles.profile_dropdown}>
          <div className={styles.option}>Welcome, {user.username}</div>
          <div className={styles.option}>
            <NavLink to={`/spots/current`}>Your Spots</NavLink>
          </div>
          <div className={styles.option}>
            <NavLink to={"/reviews/current"}>Your Reviews</NavLink>
          </div>
          <div className={styles.option}>
            <button className={styles.close_button} onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
