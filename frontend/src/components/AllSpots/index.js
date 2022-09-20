import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AllSpots.css";
import { getAllSpots } from "../../store/spots";
import SingleSpot from "../SingleSpot";

const AllSpots = () => {
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <div>
      {Object.values(allSpots).map((spot) => (
        <div key={spot.id}>
          {spot.address}
          <SingleSpot spot={spot}></SingleSpot>
        </div>
      ))}
    </div>
  );
};

export default AllSpots;
