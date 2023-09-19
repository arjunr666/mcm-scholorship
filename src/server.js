const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const path = require("path");

const studentRoutes = require("./routes/Student");
const adminRoutes = require("./routes/Admin");
const advisorRoutes = require("./routes/Advisor");
const hodRoutes = require("./routes/Hod");
const coordinatorRoutes = require("./routes/Coordinator");

const app = express();

const PORT = process.env.PORT || 3000;

const dbURI = `mongodb+srv://${process.env.DBUser}:${process.env.DBPass}@mcm.jpgn2iz.mongodb.net/?retryWrites=true&w=majority`;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.static("src/public"));

app.use(express.urlencoded({ extended: true }));
app.use(
  studentRoutes,
  adminRoutes,
  advisorRoutes,
  hodRoutes,
  coordinatorRoutes
);

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`listening on http://localhost:${PORT}/`);
    });
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/403", (req, res) => {
  res.render("403", { title: "Forbidden" });
});

app.get("/404", (req, res) => {
  res.render("404", { title: "Not Found" });
});

app.get("/500", (req, res) => {
  res.render("500", { title: "Internal Server Error" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
