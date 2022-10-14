import { csrfFetch } from "./csrf";

//TYPES
const GET_ALL_SPOTS = "spots/read";
const GET_SPOT_BY_ID = "spots/id/read";
const CREATE_SPOT = "spots/create";
const UPDATE_SPOT = "spots/update";
const DELETE_SPOT = "spots/delete";

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
  const res = await csrfFetch(`/api/spots/${spotId}`);

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

//
//
//
//ESTABLISH STATE
// const initialState = { spots: {} };
const initialState = { allSpots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {
  // console.log("action from reducer:", action);
  const newState = { ...state };

  switch (action.type) {
    case DELETE_SPOT:
      delete newState[action.id];
      return newState;

    case GET_ALL_SPOTS:
      action.payload.Spots.forEach(
        (spot) => (newState.allSpots[spot.id] = spot)
      );
      return newState;

    case GET_SPOT_BY_ID:
      newState.singleSpot = { ...action.payload };
      newState.allSpots[action.payload.id] = { ...action.payload }; //????
      return newState;

    default:
      return state;
  }
};

export default spotsReducer;

//newState = { ...state, spots: { ...state.spots, [action.spotId]: spot } }

// const initialState = { allSpots: {}, singleSpot: {} };

// const spotsReducer = (state = initialState, action) => {
//   // console.log("action from reducer:", action);
//   const newState = { ...state };

//   switch (action.type) {
//     case DELETE_SPOT:
//       delete newState[action.id];
//       return newState;

//     case GET_ALL_SPOTS:
//       action.payload.Spots.forEach(
//         (spot) => (newState.allSpots[spot.id] = spot)
//       );
//       return newState;

//     case GET_SPOT_BY_ID:
//       newState.singleSpot = { ...action.payload };
//       newState.allSpots[action.payload.id] = { ...action.payload }; //????
//       return newState;

//     default:
//       return state;
//   }
// };

//REFACTORED STATE:

// const initialState = { allSpots: {}, singleSpot: {} };

// const spotsReducer = (state = initialState, action) => {
//   // console.log("action from reducer:", action);
//   const newState = { ...state };

//   switch (action.type) {
//     case DELETE_SPOT:
//       delete newState[action.id];
//       return newState;

//     case GET_ALL_SPOTS:
//       action.payload.Spots.forEach(
//         (spot) => (newState.allSpots[spot.id] = spot)
//       );
//       return newState;

//     case GET_SPOT_BY_ID:
//       let newStateCopy = { ...state };
//       console.log("HERE MY NEWSTATECOPY:", newStateCopy);

//       newStateCopy = {
//         ...state,
//         allSpots: { ...state.allSpots, [action.payload.id]: action.payload },
//       };
//       newStateCopy.singleSpot = { ...action.payload };
//       return newStateCopy;

//     default:
//       return state;
//   }
// };
