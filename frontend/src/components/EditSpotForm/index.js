import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotById } from "../../store/spots";
import { useParams } from "react-router-dom";
import { updateSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";

const EditSpotForm = ({ spot }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const allSpots = useSelector((state) => state.spots.allSpots);

  const spots = useSelector((state) => state.spots);
  const { singleSpot } = spots;

  const { spotId } = useParams();

  // useEffect(() => {
  //   dispatch(getSpotById(spotId));
  // }, [dispatch, spotId]);

  console.log("singleSpot from edit spot form", singleSpot);
  // console.log(
  //   "singleSpot from edit spot form singleSpot.name",
  //   singleSpot.name
  // );

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  const [name, setName] = useState(singleSpot?.name);
  // console.log("checking name singleSpot.name:", singleSpot?.name);
  // console.log("checking name name:", name);

  const [address, setAddress] = useState(singleSpot?.address);
  const [city, setCity] = useState(singleSpot?.city);
  const [state, setState] = useState(singleSpot?.state);
  const [country, setCountry] = useState(singleSpot?.country);
  // const [lat, setLat] = useState(singleSpot?.lat);
  const [lat, setLat] = useState(30.55);

  // const [lng, setLng] = useState(singleSpot?.lng);
  const [lng, setLng] = useState(-150.5);

  const [description, setDescription] = useState(singleSpot?.description);
  const [price, setPrice] = useState(singleSpot?.price);

  const updateName = (e) => setName(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateLat = (e) => setLat(e.target.value);
  const updateLng = (e) => setLng(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  useEffect(() => {
    dispatch(getSpotById(spotId));
  }, [dispatch, spotId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };

    //await dispatch() make action here!!!
    const updatedSpot = await dispatch(updateSpot(payload, spotId));
    console.log("updatedSpot from editSpotForm", updatedSpot);
    history.push(`/spots/${spotId}`);
  };

  if (Object.keys(singleSpot).length === 0) {
    // console.log("singleSpot null");
    return null;
  }

  // console.log("current name from edit spot form name:", name);

  return (
    <div>
      Edit Spot Form
      <section>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              required
              value={name}
              onChange={updateName}
              placeholder={name}
            />
          </label>
          <label>
            Address
            <input
              type="text"
              required
              value={address}
              onChange={updateAddress}
            />
          </label>
          <label>
            City
            <input type="text" required value={city} onChange={updateCity} />
          </label>
          <label>
            State
            <input type="text" required value={state} onChange={updateState} />
          </label>
          <label>
            Country
            <input
              type="text"
              required
              value={country}
              onChange={updateCountry}
            />
          </label>
          {/* <label>
            Latitude
            <input type="number" required value={lat} onChange={updateLat} />
          </label>
          <label>
            Longitude
            <input type="number" required value={lng} onChange={updateLng} />
          </label> */}
          <label>
            Description
            <input
              type="text"
              required
              value={description}
              onChange={updateDescription}
            />
          </label>
          <label>
            Price
            <input
              type="number"
              required
              value={price}
              onChange={updatePrice}
            />
          </label>
          <button type="submit">Update Spot</button>
        </form>
      </section>
    </div>
  );
};

export default EditSpotForm;
