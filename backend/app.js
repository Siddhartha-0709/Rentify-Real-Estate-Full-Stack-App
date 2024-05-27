import express from "express";
import registerRoute from "./routes/register.route.js";
import loginRoute from "./routes/login.route.js";
import sellerRoute from "./routes/seller.route.js";
import buyerRoute from "./routes/buyer.route.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  next();
});
app.use(express.static("public"));

app.use("/api/v1/register", registerRoute);
app.use("/api/v1/login", loginRoute);
app.use("/api/v1/seller", sellerRoute);
app.use("/api/v1/buyer", buyerRoute);

export default app;
