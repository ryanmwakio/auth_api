var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var cors = require("cors");

var indexRoutes = require("./routes/index");
var authRoutes = require("./routes/auth");
var usersRoutes = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//setting up to allow all cors and origin
app.use(function (req, res, next) {
  cors({
    origin: "*",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
    //access control allow origin
    exposedHeaders: ["x-auth-token"],
  });
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//body parser
app.use(express.json());

app.use(indexRoutes);
app.use(authRoutes);
app.use(usersRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    statusMessage: "Error",
    successful: false,
    statusCode: err.status || 500,
    errorMessage: err.message,
    error: err.stack,
  });
});

module.exports = app;
