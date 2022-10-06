import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { getAllReviewsThunk } from "../../store/reviews";
import { deleteReviewThunk } from "../../store/reviews";
import "./ReviewBySpot.css";

const ReviewsBySpot = () => {
  const dispatch = useDispatch();

  const allReviews = useSelector((state) => state.reviews);
  const user = useSelector((state) => state.session.user);
  const userId = user.id;

  const spotReviews = allReviews.reviewsBySpot;

  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch, spotId]);

  const handleDelete = async (e) => {
    e.preventDefault();
    const reviewId = e.target.dataset.letter;
    dispatch(deleteReviewThunk(reviewId));

    // history.push(`/`);
  };

  if (Object.keys(spotReviews).length === 0) {
    return null;
  }

  return (
    <div className="review-info-outer">
      Here are the reviews
      <div>
        {Object.values(spotReviews).map((review) => (
          <div key={review.id}>
            <div className="review-info">
              {/* <div>
                {review.User.firstName} {review.User.lastName}
              </div> */}
              <div>{`review.userId: ${review.userId}`}</div>
              <div>{`review.spotId: ${review.sotId}`}</div>
              <div>{review.review}</div>
              <div>{review.stars}</div>
            </div>
            <div>
              {review.userId === userId && (
                <div>
                  {" "}
                  The reviewWriter is the current user
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
  );
};

export default ReviewsBySpot;
