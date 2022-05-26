import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@reach/router";
const FilmList = (props) => {
  const { user } = props;
  const [films, setFilms] = useState([]);
  const border = {
    borderBottom: "solid",
  };

  useEffect(() => {
    axios
      .get("/api/films")
      .then((res) => {
        setFilms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="list">
      <div>
        <h1>Welcome {user.firstName}</h1>
      </div>
      {films.map((film, index) => {
        return (
          <div key={index}>
            <div className="image">
              <img src={film.filmURL} alt="" width="200cm" height="200cm"></img>
            </div>
            <div className="info">
              <h1>{film.filmName}</h1>
              <p>{film.category}</p>
              <p>{film.filmRating}</p>
              <Link class="btn btn-primary" to={"/reviews/" + film._id + "/"}>
                Add Your Review
              </Link>{" "}
              <Link class="btn btn-warning" to={"/films/" + film._id}>
                Details
              </Link>
            </div>
            <p style={border}></p>
          </div>
        );
      })}
    </div>
  );
};
export default FilmList;
