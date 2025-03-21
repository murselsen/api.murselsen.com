import express from "express";
import { getCategories } from "../controllers/categoryController.js";

const router = express.Router();

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};

router.use(timeLog);

router.get("/", (req, res) => {
  getCategories().then((categories) => {
    res.json(categories);
  });
});

export default router;
