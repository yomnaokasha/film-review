import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "@reach/router";
import "../App.css";

const DisplayOne = (props) => {
  const { user, setParentFilm } = props;
  const [film, setFilm] = useState({});
  const [reviews, setReviews] = useState({});
  const { filmId } = useParams();

  useEffect(() => {
    axios
      .get("/api/films/" + filmId)
      .then((res) => {
        setFilm(res.data.film);
        setParentFilm(res.data.film);
        setReviews(res.data.reviews);
      })
      .catch((err) => console.log(err));
  }, [filmId]);

  const deleteReview = (reviewId) => {
    axios
      .delete("/api/reviews/" + reviewId)
      .then(() => {
        setReviews(reviews.filter((review) => review._id !== reviewId));
      })
      .catch((err) => console.log(err));
  };

  const likeReview = (reviewId) => {
    axios
      .post("/api/likes/" + reviewId)
      .then((res) => {
        setReviews(
          reviews.map((review) => {
            if (review._id === reviewId) {
              return res.data;
            }
            return review;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const unlikeReview = (reviewId) => {
    axios
      .delete("/api/likes/" + reviewId)
      .then((res) => {
        setReviews(
          reviews.map((review) => {
            if (review._id === reviewId) {
              return res.data;
            }
            return review;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="nav-bar">
        <h1>Welcome {user.firstName}</h1>
        <Link to="/films"> Back to film list</Link>
      </div>
      <div className="film-details">
        <div className="film-info">
          <img
            className="image2"
            src={film.filmURL}
            alt=""
            width="200cm"
            height="200cm"
          ></img>
          <h1>{film.filmName} </h1>
          <p>category: {film.category}</p>
          <p>Rating: {film.filmRating}</p>
          <p> actors : {film.actors}</p>
          <p> year : {film.year}</p>
        </div>
        <div className="reviews">
          <h2>Film Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => {
              return (
                <div key={review._id}>
                  Review: {review.review} <br />
                  Stars: {review.stars} <br />
                  Likes: {review.likes.length} <br />
                  {review.likes.includes(user._id) ? (
                    <button
                      style={{ margin: "10px" }}
                      onClick={() => unlikeReview(review._id)}
                    >
                      Unlike
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning"
                      onClick={() => likeReview(review._id)}
                    >
                      Like
                    </button>
                  )}
                  {review.author._id === user._id ? (
                    <button
                      style={{ margin: "10px" }}
                      className="btn btn-danger"
                      onClick={() => deleteReview(review._id)}
                    >
                      Delete
                    </button>
                  ) : null}
                  {review.author._id === user._id ? (
                    <Link
                      class="btn btn-primary"
                      to={"/edit/reviews/" + review._id}
                    >
                      Update Review{" "}
                    </Link>
                  ) : null}
                </div>
              );
            })
          ) : (
            <p> No Review for this film</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayOne;
