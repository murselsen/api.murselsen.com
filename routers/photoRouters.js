import express from "express";
import path from "path";
import getPhotos from "../controllers/getPhotos.js";


const router = express.Router();

// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log("Time: ", Date.now());
    next();
};

router.use(timeLog);


router.get("/", (req, res) => {
    getPhotos().then((photos) => {
        res.json(photos);
    });
});
router.get("/:photo/", (req, res) => {
    getPhotos().then((data) => {
        console.log(data.dbPhotos);
        data.dbPhotos.forEach((photo) => {
            if (photo.name === req.params.photo) {
                const photoPath = path.join(process.cwd(), photo.path);
                res.sendFile(photoPath, (err) => {
                    if (err) {
                        console.error(err);
                        res.status(err.status).end();
                    } else {
                        console.log("Sent:", photoPath);
                    }
                });
            }
        });

    });
});

export default router;
