import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate, useParams } from "@reach/router";
import "../App.css";
const Edit = (props) => {
  const { id } = useParams();
  const { user } = props;
  const { film } = props;
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios
      .get("/api/review/" + id)
      .then((res) => {
        setReview(res.data.review);
        setStars(res.data.stars);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const updateReview = (e) => {
    e.preventDefault();
    axios
      .put("/api/edit/reviews/" + id, {
        review,
        stars,
      })
      .then((res) => {
        console.log(res);
        navigate("/films");
      })
      .catch((err) => {
        setErrors(err.response.data.error.errors);
      });
  };
  return (
    <div>
      <div className="nav-bar">
        <h1>Welcome {user.firstName}</h1>
        <Link to="/films"> Back to Film List</Link>
      </div>
      <div className="edit-container">
        <h1 className="title">Update your Review</h1>
        <img
          className="image2"
          src={film.filmURL}
          alt=""
          width="200cm"
          height="200cm"
        ></img>
        <h1>{film.filmName} </h1>
        <div>
          <form onSubmit={updateReview}>
            <div className="edit">
              <p>
                <label> Review:</label>
                <br />
                <textarea
                  rows="5"
                  columns="50px"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                {errors.review ? <p>{errors.review.message}</p> : null}
              </p>
              <p>
                <label> Rating :</label>
                <br />
                <input
                  type="text"
                  value={stars}
                  onChange={(e) => setStars(e.target.value)}
                />
                {errors.stars ? <p>{errors.stars.message}</p> : null}
              </p>
              <div>
                <input
                  class="btn btn-warning"
                  type="submit"
                  value="Edit your Review"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Edit;
