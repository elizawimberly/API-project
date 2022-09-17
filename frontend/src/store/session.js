import { csrfFetch } from "./csrf";

//
//
//
//
//TYPES
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

//
//
//
//
//ACTIONS
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

//
//
//
//
//THUNK ACTION CREATORS
export const login = (user) => async (dispatch) => {
  console.log("in login thunk");
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  console.log("data from response", data);
  dispatch(setUser(data));
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  console.log("data", data);
  dispatch(setUser(data));
  return response;
};

//
//
//
//
//ESTABLISH SATE
const initialState = { user: null };

//
//
//
//
//REDUCER
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
