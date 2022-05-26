const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review is required"],
  },
  stars: {
    type: Number,
    required: [true, "Rating is required"],
  },
  film: { type: mongoose.ObjectId, ref: "Film" },
  author: { type: mongoose.ObjectId, ref: "User" },
  likes: [{ type: mongoose.ObjectId, ref: "User" }],
});

const FilmSchema = new mongoose.Schema({
  filmName: {
    type: String,
  },
  category: {
    type: String,
  },
  filmRating: {
    type: String,
  },
  filmURL: {
    type: String,
  },
  actors: {
    type: String,
  },
  year: {
    type: Number,
  },
});

const Film = mongoose.model("Film", FilmSchema);
const Review = mongoose.model("Review", ReviewSchema);

module.exports = {
  Film,
  Review,
};
