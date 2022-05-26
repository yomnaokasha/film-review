const { Film, Review } = require("../models/film.model");
const { protected } = require("./user.controller");
// to find all information about the film.
module.exports.findAllfilms = async (req, res) => {
  try {
    const films = await Film.find();
    res.json(films);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};
module.exports.createNewFilm = async (req, res) => {
  try {
    const newlyCreatedFilm = await Film.create(req.body);
    res.json(newlyCreatedFilm);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

module.exports.findOneSinglefilm = async (req, res) => {
  try {
    const film = await Film.findOne({ _id: req.params.filmId });
    const reviews = await Review.find({ film: req.params.filmId }).populate(
      "author"
    );
    res.json({ film, reviews });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};
// to find all information about reviews for this film.
module.exports.findOneReview = async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

module.exports.findFilmReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ film: req.params.filmId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

module.exports.createNewReview = async (req, res) => {
  if (req.session.userId == null) {
    res.status(500).json({ message: "User must be logged in" });
    return;
  }
  try {
    const review = await Review.create({
      ...req.body,
      film: req.params.filmId,
      author: req.session.userId,
    });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

module.exports.updateYourReview = async (req, res) => {
  if (req.session.userId == null) {
    res.status(500).json({ message: "User must be logged in" });
    return;
  }
  try {
    const updatedReview = await Review.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

module.exports.deleteYourReview = async (req, res) => {
  if (req.session.userId == null) {
    res.status(500).json({ message: "User must be logged in" });
    return;
  }
  try {
    const result = await Review.deleteOne({ _id: req.params.id });
    res.json({ result: result });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

module.exports.likeReview = async (req, res) => {
  try {
    if (req.session.userId == null) {
      res.status(500).json({ message: "User must be logged in" });
      return;
    }
    const review = await Review.findOne({ _id: req.params.reviewId }).populate(
      "author"
    );
    review.likes.push(req.session.userId);
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

module.exports.unlikeReview = async (req, res) => {
  try {
    if (req.session.userId == null) {
      res.status(500).json({ message: "User must be logged in" });
      return;
    }
    const review = await Review.findOne({ _id: req.params.reviewId }).populate(
      "author"
    );
    review.likes = review.likes.filter((like) => {
      return !like.equals(req.session.userId);
    });
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};
