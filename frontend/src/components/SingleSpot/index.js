import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./SingleSpot.module.css";

const SingleSpot = ({ spot }) => {
  let rating = spot.avgRating;
  if (!rating) {
    rating = "New";
  }

  return (
    <div className={styles.container}>
      <NavLink className={styles.link} key={spot.id} to={`/spots/${spot.id}`}>
        <div>
          <div>
            <div>
              <img
                className={styles.img}
                src={spot.previewImage}
                alt={"testimage"}
              />
            </div>
            <div className={styles.text}>
              <div>{`${spot.city}, ${spot.state}`}</div>
              <div>
                <i className="fas fa-solid fa-star fa-2xs" />
                {"  "}
                {rating}
              </div>
            </div>
          </div>
          <div className={styles.price}>{`$${spot.price} night`}</div>
        </div>
      </NavLink>
    </div>
  );
};

export default SingleSpot;
