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
const postReviewAction = (spotId) => {
  return {
    type: CREATE_REVIEW,
    spotId,
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
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

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

//ESTABLISH STATE
const initialState = { reviewsBySpot: {}, reviewsByUser: {} };

//
//REDUCER
const reviewsReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case GET_ALL_REVIEWS:
      newState.reviewsBySpot = {};
      action.payload.Reviews.forEach(
        (review) => (newState.reviewsBySpot[review.id] = review)
      );
      // newState.spot = newState.newSpot;
      return newState;

    case GET_USER_REVIEWS:
      newState.reviewsByUser = {};
      action.payload.Reviews.forEach(
        (review) => (newState.reviewsByUser[review.id] = review)
      );
      // newState.spot = newState.newSpot;
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
