import { csrfFetch } from "./csrf";

//TYPES
const GET_ALL_SPOTS = "spots/read";
const GET_SPOT_BY_ID = "spots/id/read";
const CREATE_SPOT = "spots/create";
const UPDATE_SPOT = "spots/update";
const DELETE_SPOT = "spots/delete";
const CREATE_SPOT_IMAGE = "spots/image/create";
const GET_USER_SPOTS = "spots/read/user";

//ACTIONS
const getAllSpotsAction = (payload) => {
  return {
    type: GET_ALL_SPOTS,
    payload,
  };
};

const getSpotByIdAction = (payload) => {
  return {
    type: GET_SPOT_BY_ID,
    payload,
  };
};

const deleteSpotByIdAction = (id) => {
  return {
    type: DELETE_SPOT,
    id,
  };
};

const createSpotAction = (payload) => {
  return {
    type: CREATE_SPOT,
    payload,
  };
};

const createSpotImageAction = (spotId, imageObj) => {
  return {
    type: CREATE_SPOT_IMAGE,
    spotId,
    imageObj,
  };
};

const getUserSpotsAction = (payload) => {
  return {
    type: GET_USER_SPOTS,
    payload,
  };
};

//THUNK ACTION CREATORS

//GET ALL
export const getAllSpots = () => async (dispatch) => {
  const res = await fetch("/api/spots");

  if (res.ok) {
    const list = await res.json();
    dispatch(getAllSpotsAction(list));
  }
};

//GET BY ID
export const getSpotById = (spotId) => async (dispatch) => {
  // const res = await csrfFetch(`/api/spots/${spotId}`);
  const res = await fetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    dispatch(getSpotByIdAction(spot));
  }
};

//DELETE
export const deleteSpotThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteSpotByIdAction(id));
  }
};

//UPDATE
export const updateSpot = (data, id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "PUT",

    body: JSON.stringify(data),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpotByIdAction(spot));
    return spot;
  }
};

//CREATE
export const createSpot = (data, id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",

    body: JSON.stringify(data),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpotByIdAction(spot));
    return spot;
  }
};

export const createImageThunk = (spotId, reqObj) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: JSON.stringify(reqObj),
  });

  if (response.ok) {
    let imageObj = await response.json();
    dispatch(createSpotImageAction(spotId, imageObj));
  }
};

export const getUserSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`);

  if (response.ok) {
    const spots = await response.json();
    dispatch(getUserSpotsAction(spots));
  }
};

//
//
//
//ESTABLISH STATE
// const initialState = { spots: {} };
const initialState = { allSpots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case DELETE_SPOT:
      let stateCopy = {
        allSpots: { ...newState.allSpots },
        singleSpot: { ...newState.singleSpot },
      };
      delete stateCopy.allSpots[action.id];
      // delete stateCopy.singleSpot;
      return stateCopy;

    case GET_ALL_SPOTS:
      action.payload.Spots.forEach(
        (spot) => (newState.allSpots[spot.id] = spot)
      );
      return newState;

    case GET_SPOT_BY_ID:
      newState.singleSpot = { ...action.payload };
      newState.allSpots[action.payload.id] = { ...action.payload }; //????
      return newState;

    case CREATE_SPOT_IMAGE:
      newState.singleSpot = {
        ...state.singleSpot,
        SpotImages: [action.imageObj.url],
      };
      return newState;

    //new
    case GET_USER_SPOTS:
      let userState = {
        allSpots: {},
        singleSpot: { ...newState.singleSpot },
      };
      action.payload.Spots.forEach(
        (spot) => (userState.allSpots[spot.id] = spot)
      );
      return userState;

    default:
      return state;
  }
};

export default spotsReducer;

//old update
