import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SingleSpot = ({ spot }) => {
  console.log("spot from SingleSpot", spot);

  return (
    // <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
    <NavLink key={spot.id} to={`/spots/${spot.id}`}>
      <div>
        <div>{`${spot.city}, ${spot.state}`}</div>
        <div>{spot.avgRating}</div>
        <div>{spot.description}</div>
        <div>{`$${spot.price} night`}</div>
      </div>
    </NavLink>
  );
};

export default SingleSpot;
