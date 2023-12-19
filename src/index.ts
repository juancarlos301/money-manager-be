import express from "express";
import routes from "./routes";
import cors from "cors";
import "./database";
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.options("*", cors());
app.use(
  cors({
    origin: process.env.ANGULAR_ENV,
  })
);
app.use("/", routes);

app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});
