import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import { getSpotById } from "../../store/spots";
import DeleteSpot from "../DeleteSpot";
import EditSpotForm from "../EditSpotForm";

const SingleSpotDetails = () => {
  const dispatch = useDispatch();
  // const allSpots = useSelector((state) => state.spots.allSpots);

  const spots = useSelector((state) => state.spots);
  const { singleSpot } = spots;

  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getSpotById(spotId));
  }, [dispatch, spotId]);

  // console.log("allSpots", allSpots);
  // console.log("spotId", spotId);
  // console.log("allspots[1]", allSpots["1"]);

  // const targetSpot = allSpots[spotId];

  // console.log("targetSpot", targetSpot);

  if (Object.keys(singleSpot).length === 0) {
    console.log("singleSpot null");
    return null;
  }

  // console.log("singleSpot", singleSpot);
  // console.log("singleSpot images", singleSpot.SpotImages[0].url);

  return (
    <div>
      <div>{singleSpot.description}</div>
      <div>{singleSpot.avgStarRating}</div>
      <div>{singleSpot.city}</div>
      <div>{singleSpot.state}</div>
      <div>{singleSpot.country}</div>
      <div>
        <img src={singleSpot.SpotImages[0].url} alt="spotPhoto" />
      </div>
      <div>
        <DeleteSpot spot={singleSpot}></DeleteSpot>
      </div>

      <div>
        <NavLink key={singleSpot.id} to={`/spots/${singleSpot.id}/edit`}>
          {/* <div>Edit This Spot</div> */}
          {/* <EditSpotForm spot={singleSpot}></EditSpotForm> */}
          Edit Spot
        </NavLink>
      </div>
    </div>
  );
};

export default SingleSpotDetails;
