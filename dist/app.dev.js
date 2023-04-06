"use strict";

var express = require("express");

var app = express();
var port = 3000;
app.set("view engine", "pug");
app.use(express["static"](__dirname + '/public'));

var workingHoursMiddleware = function workingHoursMiddleware(req, res, next) {
  var date = new Date();
  var dayOfWeek = date.getDay(); // Sunday is 0, Monday is 1, etc.

  var hour = date.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

app.get("/", workingHoursMiddleware, function (req, res) {
  res.render("index", {
    title: "Home"
  });
});
app.get("/services", workingHoursMiddleware, function (req, res) {
  res.render("services", {
    title: "Our Services"
  });
});
app.get("/contact", workingHoursMiddleware, function (req, res) {
  res.render("contact", {
    title: "Contact Us"
  });
});
app.listen(port, function () {
  return console.log("server is runninng on http://localhost:".concat(port));
});