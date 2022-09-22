import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AllSpots.css";
import { getAllSpots } from "../../store/spots";
import SingleSpot from "../SingleSpot";

const AllSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const { allSpots } = spots;

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  console.log("allspots componenet running");

  const test = Object.keys(allSpots);
  console.log(test, "test");

  if (Object.keys(allSpots).length === 0) {
    console.log("allspots null");
    return null;
  }

  return (
    <div>
      {Object.values(allSpots).map((spot) => (
        <div key={spot.id}>
          {/* {spot.address} */}
          <SingleSpot spot={spot}></SingleSpot>
        </div>
      ))}
    </div>
  );
};

export default AllSpots;
