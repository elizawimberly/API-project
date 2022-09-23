import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { getAllReviewsThunk } from "../../store/reviews";

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

  // let reviewWriterId = spotReviews["1"].User.id;
  // console.log("userId", userId);
  // let writerLoggedIn = false;

  // let ownerLoggedIn = false;

  // // if (singleSpot.ownerId === user.id) {
  // //   ownerLoggedIn = true;
  // // }

  if (Object.keys(spotReviews).length === 0) {
    return null;
  }

  return (
    <div>
      Here are the reviews
      <div>
        {Object.values(spotReviews).map((review) => (
          <>
            <div>
              {review.User.firstName} {review.User.lastName}
            </div>
            <div>{review.review}</div>
            <div>{review.stars}</div>
            <div>
              {review.userId === userId && (
                <div>
                  {" "}
                  The reviewWriter is the current user
                  <button>Delete My Review</button>
                </div>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ReviewsBySpot;
