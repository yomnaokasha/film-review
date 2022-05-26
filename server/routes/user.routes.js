const UserController = require("../controllers/user.controller");
const FilmController = require("../controllers/filmreview.controller");
const ReviewController = require("../controllers/filmreview.controller");
module.exports = (app) => {
  app.post("/api/register", UserController.registerUser);
  app.post("/api/login", UserController.login);
  app.post("/api/films/", FilmController.createNewFilm);
  app.get("/api/films", FilmController.findAllfilms);
  app.get("/api/films/:filmId", FilmController.findOneSinglefilm);
  app.get("/api/reviews/:filmId", ReviewController.findFilmReviews);
  app.get("/api/review/:id", ReviewController.findOneReview);
  app.put("/api/edit/reviews/:id", ReviewController.updateYourReview);
  app.post("/api/reviews/:filmId", ReviewController.createNewReview);
  app.delete("/api/reviews/:id", ReviewController.deleteYourReview);
  app.post("/api/likes/:reviewId", ReviewController.likeReview);
  app.delete("/api/likes/:reviewId", ReviewController.unlikeReview);
};
