import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotById } from "../../store/spots";
import { useParams } from "react-router-dom";
import { updateSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";
import { createSpot } from "../../store/spots";
import { createImageThunk } from "../../store/spots";

const CreateSpotForm = ({ spot }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);

  // useEffect(() => {
  //   dispatch(getSpotById(spotId));
  // }, [dispatch, spotId]);

  const [name, setName] = useState("");
  // console.log("checking name singleSpot.name:", singleSpot?.name);
  // console.log("checking name name:", name);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(30.55);
  const [lng, setLng] = useState(-150.5);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");

  const updateName = (e) => setName(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateUrl = (e) => setUrl(e.target.value);

  // useEffect(() => {
  //   dispatch(getSpotById(spotId));
  // }, [dispatch, spotId]);

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

    const newImage = {
      url,
      preview: true,
    };

    //await dispatch() make action here!!!
    const newSpot = await dispatch(createSpot(payload, user.id));
    console.log("newSpot from CreateSpotForm", newSpot);
    if (newSpot) {
      //call dispatch here that will add image to a spot
      await dispatch(createImageThunk(newSpot.id, newImage));

      history.push(`/spots/${newSpot.id}`);
    }
  };

  return (
    <div>
      Create Spot Form
      <section>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" required value={name} onChange={updateName} />
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
          <label>
            Image Url
            <input type="text" required value={url} onChange={updateUrl} />
          </label>
          <button type="submit">Create Spot</button>
        </form>
      </section>
    </div>
  );
};

export default CreateSpotForm;
