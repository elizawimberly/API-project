import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotById } from "../../store/spots";
import { useParams } from "react-router-dom";
import { updateSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";
import { createSpot } from "../../store/spots";
import { createImageThunk } from "../../store/spots";
import * as sessionActions from "../../store/session";
import styles from "../AllSpots/AllSpots.module.css";

const CreateSpotForm = ({ spot }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(30.55);
  const [lng, setLng] = useState(-150.5);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(false);

  const updateName = (e) => setName(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateUrl = (e) => setUrl(e.target.value);

  function checkForNumbers(str) {
    let hasNum = false;
    for (let el of str) {
      if (!isNaN(el)) {
        hasNum = true;
      }
    }
    return hasNum;
  }

  useEffect(() => {
    const errors = [];
    if (name.length < 4) errors.push("Please enter a valid name");
    if (!checkForNumbers(address)) errors.push("Address must contain numbers");
    if (city.length < 2) errors.push("Please provide a valid city name");
    if (state.length < 2) errors.push("Please provide a valid state name");
    if (description.length < 5)
      errors.push(
        "Please provide a description of your place, at least a few words long"
      );
    if (!checkForNumbers(price)) errors.push("Price must contain numbers");
    if (!url.includes("https://"))
      errors.push("Please enter a valid https url address");
    setErrors(errors);
  }, [name, address, city, state, description, price, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(true);

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

    const newImage = {
      url,
      preview: true,
    };

    const newSpot = await dispatch(createSpot(payload, user.id));
    if (newSpot) {
      await dispatch(createImageThunk(newSpot.id, newImage));

      //new dispatch added here
      await dispatch(sessionActions.restoreUser());
      history.push(`/spots/${newSpot.id}`);
    }
  };

  return (
    <div>
      <div className={styles.title} id={styles.heading}>
        Tell us about your place!
      </div>
      <section>
        {submitStatus && (
          <ul className={styles.ul}>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <label>
            <input
              placeholder="Name of your new place"
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
          <label>
            <input
              placeholder="Add an image of your place"
              type="text"
              required
              value={url}
              onChange={updateUrl}
            />
          </label>
          <button type="submit">Start Hosting!</button>
        </form>
      </section>
    </div>
  );
};

export default CreateSpotForm;
