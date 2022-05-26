import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useParams } from "@reach/router";
import { Link, navigate } from "@reach/router";
import "../App.css";
const ReviewForm = (props) => {
  const { filmId } = props;
  const { user } = props;
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const [film, setFilm] = useState({});

  useEffect(() => {
    axios
      .get("/api/films/" + filmId)
      .then((res) => {
        setFilm(res.data.film);
      })
      .catch((err) => console.log(err));
  }, [filmId]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/reviews/" + filmId, {
        filmId,
        review,
        stars,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/films");
      })
      .catch((err) => {
        setErrors(err.response.data.error.errors);
      });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="form-container">
        <div className="nav-bar">
          <h1>Welcome {user.firstName}</h1>
          <Link to="/films"> Back to Film List</Link>
        </div>
        <h2 className="title">Add your review</h2>
        <img
          className="image2"
          src={film.filmURL}
          alt=""
          width="200cm"
          height="200cm"
        ></img>
        <h1>{film.filmName} </h1>
        <div className="form">
          <div style={{ margin: "10px" }}>
            <p>
              <label> Your Review :</label>
              <br />
              <textarea
                row="20px"
                type="text"
                onChange={(e) => setReview(e.target.value)}
              />
              {errors.review ? <p>{errors.review.message}</p> : null}
            </p>
            <p>
              <label> Rating :</label>
              <br />
              <select
                className="custom-select"
                defaultValue={""}
                onChange={(e) => setStars(e.target.value)}
              >
                <option value="">-------------</option>
                <option value="1"> 1 star</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
                <option value="5">5 stars</option>
              </select>
              {errors.stars ? <p>{errors.stars.message}</p> : null}
            </p>
          </div>
          <input
            style={{ margin: "10px" }}
            class="btn btn-warning"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
