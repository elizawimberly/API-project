import { csrfFetch } from "./csrf";

//TYPES
const GET_ALL_REVIEWS = "reviews/read";
const GET_USER_REVIEWS = "reviews/user/read";
const CREATE_REVIEW = "reviews/create";
const DELETE_REVIEW = "reviews/delete";

//ACTIONS
//GET ALL REVIEWS
const getSpotReviewsAction = (payload) => {
  return {
    type: GET_ALL_REVIEWS,
    payload,
  };
};

//GET USER REVIEWS
const getUserReviewsAction = (payload) => {
  return {
    type: GET_USER_REVIEWS,
    payload,
  };
};

//POST REVIEW
const postReviewAction = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

//DELETE REVIEW
const deleteReviewAction = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

//
//
//
//THUNKS
//
//GET ALL REVIEWS FOR SPOT
export const getAllReviewsThunk = (spotId) => async (dispatch) => {
  // const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  const res = await fetch(`/api/spots/${spotId}/reviews`);

  // if (res.ok) {
  //   const payload = await res.json();
  //   dispatch(getSpotReviewsAction(payload));
  // } else {
  //   dispatch(getSpotReviewsAction({ Reviews: [] }));
  // }

  if (res.ok) {
    const payload = await res.json();
    dispatch(getSpotReviewsAction(payload));
  }
};

//GET USER REVIEWS
export const getUserReviewsThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/current`);

  if (res.ok) {
    const payload = await res.json();
    dispatch(getUserReviewsAction(payload));
  }
};

//CREATE REVIEW
export const createReviewThunk = (data, id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(postReviewAction(review));
    return review;
  }
};

//DELETE REVIEW
export const deleteReviewThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteReviewAction(id));
  }
};

//ESTABLISH STATE
const initialState = { reviewsBySpot: {}, reviewsByUser: {} };

//
//REDUCER
const reviewsReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case GET_ALL_REVIEWS:
      newState.reviewsBySpot = {};
      console.log("from reducer newState", newState);
      action.payload.Reviews.forEach(
        (review) => (newState.reviewsBySpot[review.id] = review)
      );

      return newState;

    case GET_USER_REVIEWS:
      newState.reviewsByUser = {};
      action.payload.Reviews.forEach(
        (review) => (newState.reviewsByUser[review.id] = review)
      );

      return newState;

    case CREATE_REVIEW:
      newState.reviewsBySpot[action.review.id] = action.review;
      newState.reviewsByUser[action.review.id] = action.review;
      return newState;

    case DELETE_REVIEW:
      delete newState.reviewsBySpot[action.reviewId];
      delete newState.reviewsByUser[action.reviewId];
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
