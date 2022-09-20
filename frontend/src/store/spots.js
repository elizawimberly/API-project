//TYPES
const GET_ALL_SPOTS = "spots/read";
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

//THUNK ACTION CREATORS
export const getAllSpots = () => async (dispatch) => {
  const res = await fetch("/api/spots");

  if (res.ok) {
    const list = await res.json();
    dispatch(getAllSpotsAction(list));
  }
};

//ESTABLISH STATE
// const initialState = { spots: {} };
const initialState = { allSpots: {} };

const spotsReducer = (state = initialState, action) => {
  let newState;
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
    // case REMOVE_USER:
    //   newState = Object.assign({}, state);
    //   newState.user = null;
    //   return newState;
    default:
      return state;
  }
};

export default spotsReducer;
