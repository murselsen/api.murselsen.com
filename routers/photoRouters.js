import express from "express";
import getPhotos from "../controllers/getPhotos.js";

const router = express.Router();

// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log("Time: ", Date.now());
    next();
};

router.use(timeLog);
router.use('/photo', express.static(path.join(__dirname, 'photo')));

router.get("/", (req, res) => {
    getPhotos().then((photos) => {
        res.json(photos);
    });
});

export default router;
