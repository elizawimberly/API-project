import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DeleteSpot = ({ spot }) => {
  const handleDelete = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete This Spot</button>
    </div>
  );
};

export default DeleteSpot;
