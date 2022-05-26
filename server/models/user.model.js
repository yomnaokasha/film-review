const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    validate: {
      validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email",
    },
  },
  passWord: {
    type: String,
    required: [true, "passWord is required"],
    minlength: [6, "password must be at least 6 characters"],
  },
});
UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));
UserSchema.pre("validate", function (next) {
  if (this.passWord != this.confirmPassword) {
    this.invalidate("confirmPassword", "passwords must match");
  }
  next();
});
UserSchema.pre("save", function (next) {
  bcrypt.hash(this.passWord, 10).then((hash) => {
    this.passWord = hash;
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
