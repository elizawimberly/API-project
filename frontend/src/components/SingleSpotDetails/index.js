import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import { getSpotById } from "../../store/spots";
import DeleteSpot from "../DeleteSpot";
import EditSpotForm from "../EditSpotForm";

const SingleSpotDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // const allSpots = useSelector((state) => state.spots.allSpots);

  const spots = useSelector((state) => state.spots);
  const user = useSelector((state) => state.session.user);
  const { singleSpot } = spots;

  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getSpotById(spotId));
  }, [dispatch, spotId]);

  if (Object.keys(singleSpot).length === 0) {
    console.log("singleSpot null");
    return null;
  }

  let ownerLoggedIn = false;

  console.log("singleSpot:", singleSpot);
  console.log("user:", user);

  if (singleSpot.ownerId === user.id) {
    ownerLoggedIn = true;
  }

  const handleDelete = (e) => {
    e.preventDefault();
    history.push(`/`);
  };

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
      {/* <div>{ownerLoggedIn && <DeleteSpot spot={singleSpot}></DeleteSpot>}</div> */}
      <div>
        {ownerLoggedIn && (
          <div onClick={handleDelete}>
            <DeleteSpot></DeleteSpot>
          </div>
        )}
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
