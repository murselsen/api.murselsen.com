import express from "express";
import { getCategories } from "../controllers/vehicle/getCategories";
import { getVehicles } from "../controllers/vehicle/getVehicles";

const vehicleRouter = express.Router();

const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};

vehicleRouter.use(timeLog);

vehicleRouter.get("/categories", async (req, res) => {
  getCategories()
    .then((categories) => {
      res.json(categories);
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch vehicle categories" });
    });
});
vehicleRouter.get("/", async (req, res) => {
  getVehicles()
    .then((vehicles) => {
      res.json(vehicles);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch vehicles" });
      console.error("Error fetching vehicles:", error);
    });
});

export default vehicleRouter;
