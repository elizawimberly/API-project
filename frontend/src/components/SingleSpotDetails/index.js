import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import { getSpotById } from "../../store/spots";

const SingleSpotDetails = () => {
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state.spots.allSpots);

  // useEffect(() => {
  //   dispatch(getAllSpots());
  // }, [dispatch]);

  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getSpotById(spotId));
  }, [dispatch, spotId]);

  console.log("allSpots", allSpots);
  console.log("spotId", spotId);
  console.log("allspots[1]", allSpots["1"]);

  const targetSpot = allSpots[spotId];

  console.log("targetSpot", targetSpot);

  return <div>airbnb</div>;
};

export default SingleSpotDetails;
