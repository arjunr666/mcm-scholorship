const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const path = require("path");

const studentRoutes = require("./routes/Student");

const app = express();

const PORT = process.env.PORT || 3000;

//const dbURI = `mongodb+srv://${process.env.DBUser}:${process.env.DBPass}@mcm.jpgn2iz.mongodb.net/?retryWrites=true&w=majority`;
const dbURI = `mongodb+srv://${process.env.DBUser}:${process.env.DBPass}@mcm.jpgn2iz.mongodb.net/?retryWrites=true&w=majority`;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.static("src/public"));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(studentRoutes);

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`listening on http://localhost:${PORT}/`);
    });
  })
  .catch((err) => console.log(err));

//app.listen(PORT, () => { console.log(`listening on http://localhost:${PORT}/`);});

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
