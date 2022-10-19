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
import SpotPrice from "./SpotPrice";
import styles from "./SingleSpotDetails.module.css";
import { getAllReviewsThunk } from "../../store/reviews";

const SingleSpotDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // const allSpots = useSelector((state) => state.spots.allSpots);

  const spots = useSelector((state) => state.spots);
  let user = useSelector((state) => state.session.user);

  //testing
  const reviews = useSelector((state) => state.reviews.reviewsBySpot);

  const { singleSpot } = spots;

  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getSpotById(spotId));
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch, spotId]);

  if (Object.keys(singleSpot).length === 0) {
    return null;
  }

  let ownerLoggedIn = false;
  let validUser = true;

  //new
  if (!user) {
    user = { id: 0 };
    validUser = false;
  }
  //old

  // if (singleSpot.ownerId === user.id) {
  //   ownerLoggedIn = true;
  // }

  const handleDelete = async (e) => {
    dispatch(deleteSpotThunk(spotId));

    // history.push(`/`);
  };

  if (user.id === singleSpot.ownerId) {
    ownerLoggedIn = true;
  }

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
        {ownerLoggedIn && (
          <div className={styles.button_container}>
            <div>
              <button className={styles.button} onClick={handleDelete}>
                Delete your place
              </button>
            </div>
            <div>
              <button className={styles.button}>
                <NavLink
                  key={singleSpot.id}
                  to={`/spots/${singleSpot.id}/edit`}
                  className={styles.link}
                >
                  Edit your place
                </NavLink>
              </button>
            </div>
          </div>
        )}
        {singleSpot.SpotImages && singleSpot.SpotImages[0] && (
          <div>
            <img
              className={styles.img}
              src={singleSpot.SpotImages[0].url}
              alt={"testimage"}
            />
          </div>
        )}
        <div className={styles.details}>
          <div
            className={styles.first_name}
          >{`Hosted by ${user.firstName}`}</div>
          <div className={styles.description}>{singleSpot.description}</div>
        </div>
      </div>

      <div className={styles.lower_container}>
        <div>
          {!ownerLoggedIn && validUser && (
            <div className={styles.button_container}>
              <div>
                <button className={styles.button}>
                  <NavLink
                    to={`/spots/${singleSpot.id}/reviews`}
                    className={styles.link}
                  >
                    Add your review
                  </NavLink>
                </button>
              </div>
            </div>
          )}
        </div>
        <SpotPrice spot={singleSpot} />

        <div>
          <ReviewsBySpot reviews={reviews} />
        </div>
      </div>
    </div>
  );
};

export default SingleSpotDetails;
