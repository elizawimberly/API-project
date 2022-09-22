import { csrfFetch } from "./csrf";

//TYPES
const GET_ALL_REVIEWS = "reviews/read";
const CREATE_REVIEW = "reviews/create";
const DELETE_REVIEW = "reviews/delete";

//ACTIONS
//GET REVIEWS
const getReviewsAction = (payload) => {
  return {
    type: GET_ALL_REVIEWS,
    payload,
  };
};

//POST REVIEW
const postReviewAction = (payload) => {
  return {
    type: CREATE_REVIEW,
    payload,
  };
};

//DELETE REVIEW

//ESTABLISH STATE
const initialState = { reviews: {} };

const reviewsReducer = (state = initialState, action) => {};

export default reviewsReducer;
