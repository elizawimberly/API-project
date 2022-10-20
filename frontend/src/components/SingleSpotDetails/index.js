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

  const reviews = useSelector((state) => state.reviews.reviewsBySpot);
  const numReviews = Object.values(reviews).length;

  const { singleSpot } = spots;

  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getSpotById(spotId));
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch, spotId]);

  if (Object.keys(singleSpot).length === 0) {
    return null;
  }

  const handleDelete = async (e) => {
    // let response = await dispatch(deleteSpotThunk(spotId));
    // await dispatch(getAllSpots());
    // alert("You have successfully deleted your spot");

    // console.log(response);
    // if (response) {
    //   history.push(`/`);
    // }
    dispatch(deleteSpotThunk(spotId));
    alert("You have successfully deleted your spot");

    history.push("/");
  };

  let ownerLoggedIn = false;
  let validUser = true;

  //new
  if (!user) {
    user = { id: 0 };
    validUser = false;
  }

  if (user.id === singleSpot.ownerId) {
    ownerLoggedIn = true;
  }

  let rating = singleSpot.avgStarRating;
  if (!rating) {
    rating = "New";
  } else {
    rating = Number.parseFloat(rating).toFixed(1);
  }

  if (!singleSpot) {
    return null;
  }

  let hasAddedReview = false;
  Object.values(reviews).forEach((review) => {
    if (review.userId === user.id) {
      hasAddedReview = true;
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.spot_details}>
        <div className={styles.name}>{singleSpot.name}</div>
        <div className={styles.star}>
          <i className="fas fa-solid fa-star fa-2xs" />
          <div className={styles.rating}>{rating}</div>
          <div className={styles.location}>{`${numReviews}  Reviews`}</div>
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
          {/* <div
            className={styles.first_name}
          >{`Hosted by ${singleSpot.Owner.firstName}`}</div> */}
          <div className={styles.description}>{singleSpot.description}</div>
        </div>
      </div>

      <div className={styles.lower_container}>
        <div>
          {!ownerLoggedIn && validUser && !hasAddedReview && (
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
          <ReviewsBySpot
            reviews={reviews}
            numReviews={numReviews}
            rating={rating}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleSpotDetails;
