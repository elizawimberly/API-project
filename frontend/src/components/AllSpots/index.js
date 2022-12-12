import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AllSpots.module.css";
import { getAllSpots } from "../../store/spots";
import SingleSpot from "../SingleSpot";
import { NavLink } from "react-router-dom";

/******* COMPONENT *********/

const AllSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const { allSpots } = spots;

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  if (Object.keys(allSpots).length === 0) {
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        {Object.values(allSpots).map((spot) => (
          <div key={spot.id}>
            {/* {spot.address} */}
            <SingleSpot spot={spot}></SingleSpot>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllSpots;
