import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import { getSpotById } from "../../store/spots";
import DeleteSpot from "../DeleteSpot";
import EditSpotForm from "../EditSpotForm";
import { deleteSpotThunk } from "../../store/spots";
import ReviewsBySpot from "../ReviewsBySpot";
import ReviewsByUser from "../ReviewsByOwner";
// import "./SingleSpotDetails.css";
import styles from "./SingleSpotDetails.module.css";

const SingleSpotDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // const allSpots = useSelector((state) => state.spots.allSpots);

  const spots = useSelector((state) => state.spots);
  const user = useSelector((state) => state.session.user);
  const { singleSpot } = spots;

  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getSpotById(spotId));
  }, [dispatch, spotId]);

  if (Object.keys(singleSpot).length === 0) {
    return null;
  }

  let ownerLoggedIn = false;

  if (singleSpot.ownerId === user.id) {
    ownerLoggedIn = true;
  }

  const handleDelete = async (e) => {
    dispatch(deleteSpotThunk(spotId));

    // history.push(`/`);
  };

  // console.log("singleSpot.ownerId", singleSpot.ownerId);
  console.log("singleSpot:", singleSpot);

  let rating = singleSpot.avgStarRating;
  if (!rating) {
    rating = "New";
  }

  if (!singleSpot) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.spot_details}>
        <div className={styles.name}>{singleSpot.name}</div>
        <div className={styles.star}>
          <i className="fas fa-solid fa-star fa-2xs" />
          <div className={styles.rating}>{rating}</div>
          <div
            className={styles.location}
          >{`${singleSpot.city},  ${singleSpot.state}`}</div>
        </div>
        {/* you can remove the following conditionals once you have adding url functionality to create spot form */}
        {singleSpot.SpotImages && singleSpot.SpotImages[0] && (
          <div>
            <img
              className={styles.img}
              src={singleSpot.SpotImages[0].url}
              alt={"testimage"}
            />
          </div>
        )}
        {/* <div>
          <img
            className={styles.img}
            src={singleSpot.SpotImages[0].url}
            alt={"testimage"}
          />
        </div> */}
        <div className={styles.details}>
          <div
            className={styles.first_name}
          >{`Hosted by ${user.firstName}`}</div>
          <div className={styles.description}>{singleSpot.description}</div>
        </div>
      </div>

      <div className={styles.lower_container}>
        <div>
          {ownerLoggedIn && (
            // <div onClick={handleDelete}>
            //   <DeleteSpot></DeleteSpot>
            // </div>
            <div>
              <button onClick={handleDelete}>Delete This Spot</button>
            </div>
          )}
        </div>

        <div>
          <NavLink key={singleSpot.id} to={`/spots/${singleSpot.id}/edit`}>
            Edit Spot
          </NavLink>
        </div>

        <div>
          <NavLink key={singleSpot.id} to={`/spots/${singleSpot.id}/reviews`}>
            Add Your Review!
          </NavLink>
        </div>

        <div>
          <ReviewsBySpot />
        </div>
        <div>
          {ownerLoggedIn && (
            <div>
              <ReviewsByUser />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleSpotDetails;
