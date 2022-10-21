import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import styles from "./AllSpots.module.css";
import styles from "../AllSpots/AllSpots.module.css";
import { getUserSpotsThunk } from "../../store/spots";
import { getAllSpots } from "../../store/spots";
import SingleSpot from "../SingleSpot";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";

const UserSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const sessionUser = useSelector((state) => state.session.user);
  // const { allSpots } = spots;
  const { allSpots } = spots;

  useEffect(() => {
    dispatch(getUserSpotsThunk());
    // dispatch(getAllSpots());
  }, [dispatch]);

  // if (Object.keys(allSpots).length === 0) {
  //   return null;
  // }

  const userId = sessionUser.id;
  let spotArr = Object.values(allSpots);
  let userSpots = spotArr.filter((spot) => spot.ownerId === +userId);

  let hasSpots = true;
  if (userSpots.length === 0) {
    hasSpots = false;
  }

  return (
    <>
      {hasSpots && (
        <div className={styles.container}>
          {Object.values(userSpots).map((spot) => (
            <div key={spot.id}>
              {/* {spot.address} */}
              <SingleSpot spot={spot}></SingleSpot>
            </div>
          ))}
        </div>
      )}
      {!hasSpots && (
        <div className={styles.message}>You currently have no spots</div>
      )}
    </>
  );
};

export default UserSpots;
