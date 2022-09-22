// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots";
import SingleSpotDetails from "./components/SingleSpotDetails";
import EditSpotForm from "./components/EditSpotForm";
import CreateSpotForm from "./components/CreateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <AllSpots />
          </Route>
          {/* <Route exact path="/spots/:spotId">
            <SingleSpotDetails />
          </Route> */}
          <Route exact path="/spots/:spotId/edit">
            <EditSpotForm />
          </Route>
          <Route exact path="/spots/create">
            <CreateSpotForm></CreateSpotForm>
          </Route>
          <Route exact path="/spots/:spotId">
            <SingleSpotDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
