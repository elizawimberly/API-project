import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { createReviewThunk } from "../../store/reviews";
import styles from "../AllSpots/AllSpots.module.css";

const PostReviewForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector((state) => state.spots);
  const { singleSpot } = spots;

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(false);

  const updateReview = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);

  useEffect(() => {
    const errors = [];
    if (review.length < 5)
      errors.push("Review must be at least 5 characters long");
    if (stars < 1 || stars > 5)
      errors.push("Please add a rating between 1 and 5");
    setErrors(errors);
  }, [review, stars]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(true);

    if (errors.length) {
      return;
    }

    const payload = {
      review,
      stars,
    };

    const newReview = await dispatch(createReviewThunk(payload, singleSpot.id));

    history.push(`/spots/${singleSpot.id}`);
  };

  return (
    <div>
      <div className={styles.title} id={styles.heading}>
        Add your review!
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
              placeholder="Tell us about your stay"
              type="text"
              required
              value={review}
              onChange={updateReview}
            />
          </label>
          <label>
            <input
              placeholder="Please add a rating between 1 and 5"
              type="number"
              required
              value={stars}
              onChange={updateStars}
            />
          </label>
          <button type="submit">Post Review</button>
        </form>
      </section>
    </div>
  );
};

export default PostReviewForm;
