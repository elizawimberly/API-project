import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotById } from "../../store/spots";
import { useParams } from "react-router-dom";
import { updateSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";
import styles from "../AllSpots/AllSpots.module.css";

const EditSpotForm = ({ spot }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const spots = useSelector((state) => state.spots);
  const { singleSpot } = spots;

  console.log("singleSpot", singleSpot);

  const { spotId } = useParams();

  // const [name, setName] = useState(singleSpot?.name);
  // const [address, setAddress] = useState(singleSpot?.address);
  // const [city, setCity] = useState(singleSpot?.city);
  // const [state, setState] = useState(singleSpot?.state);
  // const [country, setCountry] = useState(singleSpot?.country);
  // const [lat, setLat] = useState(30.55);
  // const [lng, setLng] = useState(-150.5);
  // const [description, setDescription] = useState(singleSpot?.description);
  // const [price, setPrice] = useState(singleSpot?.price);
  // const [errors, setErrors] = useState([]);
  // const [submitStatus, setSubmitStatus] = useState(false);

  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [lat, setLat] = useState(30.55);
  const [lng, setLng] = useState(-150.5);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [errors, setErrors] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(false);

  const updateName = (e) => setName(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateLat = (e) => setLat(e.target.value);
  const updateLng = (e) => setLng(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  // function checkForNumbers(str) {
  //   console.log("str", str);
  //   let hasNum = false;
  //   for (let el of str) {
  //     if (!isNaN(el)) {
  //       hasNum = true;
  //     }
  //   }
  //   return hasNum;
  // }

  useEffect(() => {
    const errors = [];
    if (name?.length < 1) errors.push("Please enter the name of your place");
    // if (!checkForNumbers(address)) errors.push("Address must contain numbers");
    if (city?.length < 2) errors.push("Please provide a valid city name");
    if (state?.length < 2) errors.push("Please provide a valid state name");
    if (description?.length < 5)
      errors.push(
        "Please provide a description of your place, at least a few words long"
      );
    // if (!checkForNumbers(price)) errors.push("Price must contain numbers");
    // setErrors(errors);
  }, [name, address, city, state, description, price]);

  //TEST CODE
  // let errors = [];

  // const checkErrors = () => {
  //   errors = [];
  //   if (name.length < 1) errors.push("Please enter the name of your place");
  //   if (!checkForNumbers(address)) errors.push("Address must contain numbers");
  //   if (city.length < 2) errors.push("Please provide a valid city name");
  //   if (state.length < 2) errors.push("Please provide a valid state name");
  //   if (description.length < 5)
  //     errors.push(
  //       "Please provide a description of your place, at least a few words long"
  //     );
  //   if (!checkForNumbers(price)) errors.push("Price must contain numbers");
  //   // setErrors(errors);
  // };

  useEffect(() => {
    console.log("HIT USE EFFECT SPOT EXISTS CONDITION");
    if (Object.keys(singleSpot).length !== 0) {
      console.log("singleSpot", singleSpot);
      if (name === null) setName(singleSpot.name);
      if (address === null) setAddress(singleSpot.address);
      if (city === null) setCity(singleSpot.city);
      if (state === null) setState(singleSpot.state);
      if (country === null) setCountry(singleSpot.country);
      if (description === null) setDescription(singleSpot.description);
      if (price === null) setPrice(singleSpot.price);
    }
  }, [singleSpot, name, address, city, state, country, description, price]);

  useEffect(() => {
    console.log("USE EFFECT RAN");
    dispatch(getSpotById(spotId));
  }, [dispatch, spotId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(true);

    // checkErrors();
    // console.log("errors", errors);

    if (errors.length) {
      return;
    }

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

    history.push(`/spots/${spotId}`);
  };

  if (Object.keys(singleSpot).length === 0) {
    console.log("HIT EMPTY CONDITION");
    return null;
  }

  return (
    <div>
      <div className={styles.title} id={styles.heading}>
        Update your place!
      </div>
      <section>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              placeholder="Name of your place"
              type="text"
              required
              value={name}
              onChange={updateName}
            />
          </label>
          <label>
            <input
              placeholder="Address"
              type="text"
              required
              value={address}
              onChange={updateAddress}
            />
          </label>
          <label>
            <input
              placeholder="City"
              type="text"
              required
              value={city}
              onChange={updateCity}
            />
          </label>
          <label>
            <input
              placeholder="State"
              type="text"
              required
              value={state}
              onChange={updateState}
            />
          </label>
          <label>
            <input
              placeholder="Country"
              type="text"
              required
              value={country}
              onChange={updateCountry}
            />
          </label>
          <label>
            <input
              placeholder="Describe your place"
              type="text"
              required
              value={description}
              onChange={updateDescription}
            />
          </label>
          <label>
            <input
              placeholder="Price per night"
              type="number"
              required
              value={price}
              onChange={updatePrice}
            />
          </label>
          <button type="submit">Update</button>
        </form>
      </section>
    </div>
  );
};

export default EditSpotForm;
