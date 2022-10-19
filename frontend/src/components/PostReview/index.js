import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { createReviewThunk } from "../../store/reviews";

const PostReviewForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector((state) => state.spots);
  const { singleSpot } = spots;

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");

  const updateReview = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      review,
      stars,
    };

    const newReview = await dispatch(createReviewThunk(payload, singleSpot.id));

    history.push(`/spots/${singleSpot.id}`);
  };

  return (
    <div>
      Add Your Review
      <section>
        <form onSubmit={handleSubmit}>
          {/* <label>
            Review
            <input>
              type="text" required value={review}
              onChange={updateReview}
            </>
          </label> */}
          <label>
            Review
            <input
              type="text"
              required
              value={review}
              onChange={updateReview}
            />
          </label>
          <label>
            Stars
            <input
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
