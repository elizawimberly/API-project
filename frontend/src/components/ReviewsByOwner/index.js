import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { getUserReviewsThunk } from "../../store/reviews";

const ReviewsByUser = () => {
  const dispatch = useDispatch();

  const allReviews = useSelector((state) => state.reviews);
  const userReviews = allReviews.reviewsByUser;

  // const { spotId } = useParams();

  useEffect(() => {
    dispatch(getUserReviewsThunk());
  }, [dispatch]);

  if (Object.keys(userReviews).length === 0) {
    return null;
  }

  return (
    <div>
      Here are the User Reviews
      <div>
        {Object.values(userReviews).map((review) => (
          <>
            <div>
              {review.User.firstName} {review.User.lastName}
            </div>
            <div>{review.review}</div>
            <div>{review.stars}</div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ReviewsByUser;
