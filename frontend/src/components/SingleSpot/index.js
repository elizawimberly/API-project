import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./SingleSpot.module.css";

const SingleSpot = ({ spot }) => {
  console.log("spot", spot);

  return (
    <div className={styles.container}>
      <NavLink key={spot.id} to={`/spots/${spot.id}`}>
        <div>
          <div>
            <div>
              <img
                className={styles.img}
                src={spot.previewImage}
                alt={"testimage"}
              />
            </div>
            <div>{`${spot.city}, ${spot.state}`}</div>
            <div>Average Rating: {spot.avgRating}</div>
          </div>
          <div>{`$${spot.price} night`}</div>
        </div>
      </NavLink>
    </div>
  );
};

export default SingleSpot;
