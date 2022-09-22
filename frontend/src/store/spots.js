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

const updateSpotAction = (payload) => {
  return {
    type: UPDATE_SPOT,
    payload,
  };
};

//THUNK ACTION CREATORS
export const getAllSpots = () => async (dispatch) => {
  const res = await fetch("/api/spots");

  if (res.ok) {
    const list = await res.json();
    dispatch(getAllSpotsAction(list));
  }
};

export const getSpotById = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    dispatch(getSpotByIdAction(spot));
  }
};

//UPDATE
export const updateSpot = (data, id) => async (dispatch) => {
  console.log("body from updateSpot thunk:", JSON.stringify(data));
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "PUT",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: JSON.stringify(data),
    // body: data,
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpotByIdAction(spot));
    return spot;
  }
};

//ESTABLISH STATE
// const initialState = { spots: {} };
const initialState = { allSpots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {
  // let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      // console.log(state);
      // const newState = { ...state, spots: { ...state.spots } };
      const newState = { ...state };
      // console.log("newState", newState);
      // newState = { ...state };
      action.payload.Spots.forEach(
        (spot) => (newState.allSpots[spot.id] = spot)
      );
      return newState;
    case GET_SPOT_BY_ID:
      const newStateObj = { ...state };
      newStateObj.singleSpot = { ...action.payload };
      return newStateObj;

    default:
      return state;
  }
};

export default spotsReducer;
