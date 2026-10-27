const express = require("express");
const dotenv = require("dotenv").config();
const connect = require("./db.js");
const methodOverride = require("method-override");
const morgan = require("morgan");
const Car = require("./models/Car.js");
const Fruit = require("../../lectures/unit2/men-stack-crud-app-fruits/models/Fruit.js");

const app = express();

connect();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

// Create Routes
app.get("/cars/create-car", (req, res) => {
  res.render("cars/create-car.ejs");
});

// View Routes
app.get("/cars", async (req, res) => {
  const allCars = await Car.find();

  res.render("cars/cars-list.ejs", { cars: allCars });
});

app.get("/cars/:carId", async (req, res) => {
  const foundCar = await Car.findById(req.params.carId);

  res.render("cars/car-details.ejs", { car: foundCar });
});

app.post("/cars", async (req, res) => {
  if (req.body.isElectric === "on") req.body.isElectric = true;
  else req.body.isElectric = false;

  const newCar = await Car.create({
    name: req.body.name,
    model: req.body.model,
    isElectric: req.body.isElectric,
    postDate: req.body.postDate,
    features: req.body.features,
    image: req.body.image,
  });

  res.redirect("/cars");
});

// Update Routes
app.get("/cars/:carId/edit", async (req, res) => {
  const foundCar = await Car.findById(req.params.carId);

  res.render("cars/edit-car.ejs", { car: foundCar });
});

app.put("/cars/:carId", async (req, res) => {
  if (req.body.isElectric === "on") req.body.isElectric = true;
  else req.body.isElectric = false;

  const foundCar = await Car.findByIdAndUpdate(req.params.carId, {
    name: req.body.name,
    model: req.body.model,
    isElectric: req.body.isElectric,
    postDate: req.body.postDate,
    features: req.body.features,
    image: req.body.image,
  });
  res.redirect(`/cars/${req.params.carId}`);
});

// Delete Routes
app.delete("/cars/:carId/delete", async (req, res) => {
  const foundCar = await Car.findByIdAndDelete(req.params.carId);

  res.redirect("/cars");
});

app.listen(process.env.PORT, () => {
  console.log(`Listen on port ${process.env.PORT}`);
});
