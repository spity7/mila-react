require("dotenv").config();
require("express-async-errors");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();

// connectDB
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

//routers
const authRouter = require("./routes/auth");
const propertiesRouter = require("./routes/properties");
const contactUsRouter = require("./routes/contactUs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust Proxy", 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/properties", propertiesRouter);
app.use("/contact-us", contactUsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
