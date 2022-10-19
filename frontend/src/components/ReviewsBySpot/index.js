import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { getAllReviewsThunk } from "../../store/reviews";
import { deleteReviewThunk } from "../../store/reviews";
import { getSpotById } from "../../store/spots";
import styles from "./ReviewBySpot.module.css";

const ReviewsBySpot = ({ reviews, numReviews, rating }) => {
  const dispatch = useDispatch();

  const spotReviews = useSelector((state) => state.reviews.reviewsBySpot);
  const user = useSelector((state) => state.session.user);

  let userId;
  if (!user) {
    userId = 0;
  } else {
    userId = user.id;
  }

  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch, spotId]);

  const handleDelete = async (e) => {
    e.preventDefault();
    const reviewId = e.target.dataset.letter;
    dispatch(deleteReviewThunk(reviewId));
    dispatch(getAllReviewsThunk(spotId));
    dispatch(getSpotById(spotId));

    // history.push(`/`);
  };

  if (Object.keys(spotReviews).length === 0) {
    return null;
  }

  return (
    <div>
      <div className={styles.number}>
        <i className="fas fa-solid fa-star fa-2xs" />
        <div className={styles.rating}>{rating}</div>
        <div className={styles.rating}>{`(${numReviews}  Reviews)`}</div>
      </div>
      <div className={styles.outer}>
        {/* <div className={styles.number}>{`${numReviews}  Reviews`}</div> */}

        <div className={styles.container}>
          {Object.values(spotReviews).map((review) => (
            <div key={review.id}>
              <div className={styles.info} key={review.id}>
                {/* <div
                  className={styles.bold}
                >{`Review by ${review.User.firstName}`}</div> */}

                <div className={styles.light}>{review.review}</div>
                <div className={styles.star}>
                  <i className="fas fa-solid fa-star fa-2xs" />
                  <div className={styles.rating}>
                    {Number.parseFloat(review.stars).toFixed(1)}
                  </div>
                </div>
                {review.userId === userId && (
                  <div>
                    <button data-letter={review.id} onClick={handleDelete}>
                      Delete My Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsBySpot;
