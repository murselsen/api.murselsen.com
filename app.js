import express from "express";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";
import path from "path";

import {
  getTodos,
  getTags,
  getTodosByCategoryId,
  getTodosByTag,
} from "./controllers/index.js";

// Routers
import categoryRouter from "./routers/categoryRouters.js";

const app = express();

// Logları hem konsola hem de dosyaya yaz
const logStream = fs.createWriteStream(path.join(process.cwd(), "access.log"), {
  flags: "a",
});

app.use(morgan("combined", { stream: logStream })); // Dosyaya yaz
app.use(morgan("dev")); // Konsola yaz

app.use(cors());

const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.use("/categories", categoryRouter);

app.get("/", (req, res) => {
  res.json([
    "RestApi World! Welcome to the Server",
    "You can use the following endpoints",
    "GET /categories",
    "GET /todos",
    "GET /tags",
    "GET /todos/category/:categoryId",
    "GET /todos/tag/:tagTitle",
  ]);
});
app.get("/test", (req, res) => {
  res.json({ message: "Hello from the test endpoint!" });
});

app.get("/todos", (req, res) => {
  getTodos()
    .then((todoData) => {
      res.json(todoData);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/tags", (req, res) => {
  getTags().then((tagData) => {
    res.json(tagData);
  });
});

app.get("/todos/category/:categoryId", (req, res) => {
  getTodosByCategoryId(req.params.categoryId).then((todoData) => {
    res.json(todoData);
  });
});

app.get("/todos/tag/:tagTitle", (req, res) => {
  getTodosByTag(req.params.tagTitle).then((data) => {
    res.json(data);
  });
});
console.log("------- --START---------------------------------");
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
