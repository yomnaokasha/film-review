import "./App.css";
import { Router } from "@reach/router";
import { useState } from "react";
import ReviewForm from "./componants/form";
import Edit from "./componants/editreview";
import FilmList from "./componants/allfilms";
import Login from "./componants/login";
import Register from "./componants/register";
import DisplayOne from "./componants/onefilm";

function App() {
  const [user, setUser] = useState();
  const [film, setFilm] = useState();
  return (
    <div className="App">
      <Router>
        <Register path="/register" setUser={setUser} />
        <Login path="/login" setUser={setUser} />
        <FilmList path="/films" user={user} />
        <ReviewForm path="/reviews/:filmId" user={user} />
        <DisplayOne path="/films/:filmId" user={user} setParentFilm={setFilm} />
        <Edit path="/edit/reviews/:id" film={film} user={user} />
      </Router>
    </div>
  );
}

export default App;
