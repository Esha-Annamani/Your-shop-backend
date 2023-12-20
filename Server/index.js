// To load environment variables from .env file
require("dotenv").config(); 

//To Load Database Models
require('./models/User');
require('./models/Product');
require('./models/Address');
require('./models/Order');
require('./models/Account');




const express = require("express");
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

//To load session regenerate middleware
const sessionRegeneration = require("./middlewares/SessionRegeneration")


//Session Created initially 
app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false, maxAge:  24* 60* 60000}, // Session expiration time in milliseconds (1 day)
    })
  );

//To extend session on expiry  
app.use(sessionRegeneration);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Package and url to connect to database
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

//To load routes
const userAuthorizationRoutes = require("./routes/UserAuthorizationRoutes.js");
const productRoutes = require("./routes/ProductRoutes.js");
const addressRoutes = require("./routes/AddressRoutes.js");
const orderRoutes = require("./routes/OrderRoutes.js");
const accountRoutes = require("./routes/AccountRoutes.js");



  

// Use the cors middleware to allow requests from specific origins.
app.use(
  cors({
    origin: "http://localhost:5000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // To pass cookies along with the request
  })
);


app.use("/your-shop/user", userAuthorizationRoutes);
app.use("/your-shop/product",productRoutes);
app.use("/your-shop/address",addressRoutes);
app.use("/your-shop/order",orderRoutes);
app.use("/your-shop/account",accountRoutes);




// Connect to MongoDB using mongoose
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


//Server connection
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
