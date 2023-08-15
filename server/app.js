const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const homeRouter = require("./routes/movie");

const errorController = require("./controllers/error");

app.use(homeRouter);

app.use(errorController.get404);

app.listen(4000);
