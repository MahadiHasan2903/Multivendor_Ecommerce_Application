const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const path = require("path");
const errorHandler = require("./middleware/Error.js");
const cloudinary = require("cloudinary");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://mh-store-multivendor-ecommerce.vercel.app",
    credentials: true,
  })
);

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "./uploads")));

const user = require("./controller/User");
const shop = require("./controller/Shop");
const product = require("./controller/Product");
const event = require("./controller/Event");
const coupon = require("./controller/CouponCode");
const payment = require("./controller/Payment");
const order = require("./controller/Order");
const conversation = require("./controller/Conversation");
const message = require("./controller/Message");
const withdraw = require("./controller/Withdraw");
const serviceProvider = require("./controller/serviceProvider");

app.use("/api/v1/user", user);
app.use("/api/v1/shop", shop);
app.use("/api/v1/product", product);
app.use("/api/v1/event", event);
app.use("/api/v1/coupon", coupon);
app.use("/api/v1/payment", payment);
app.use("/api/v1/order", order);
app.use("/api/v1/conversation", conversation);
app.use("/api/v1/message", message);
app.use("/api/v1/withdraw", withdraw);
app.use("/api/v1/service-provider", serviceProvider);

app.get("/", (req, res) => {
  res.send("Hello world from backend server!");
});

app.use(errorHandler);

// Server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_MODE} Mode on port ${port}`.bgCyan
      .white
  );
});
