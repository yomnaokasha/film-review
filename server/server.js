const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");

require("dotenv").config();
require("./config/user.config");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

const FileStore = require("session-file-store")(session);

var fileStoreOptions = {};

app.use(cookieParser());

app.use(
  session({
    store: new FileStore(fileStoreOptions),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const protected = async (req, res, next) => {
  const token = req.cookies.usertoken;
  let decodedToken;
  try {
    decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    console.log("error decoding token");
    res.status(400).json(error);
  }
  req.session.userId = decodedToken.id;
  next();
};

app.use(protected);
require("./routes/user.routes")(app);
app.listen(process.env.PORT, () =>
  console.log("express is running on", process.env.PORT)
);
